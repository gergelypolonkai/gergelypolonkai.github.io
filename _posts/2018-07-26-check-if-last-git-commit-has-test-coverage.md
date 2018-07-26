---
layout:    post
title:     "Check if the last Git commit has test coverage"
date:      2018-07-26 12:49:52
tags:      [python,development,testing]
published: true
author:
    name: Gergely Polonkai
    email: gergely@polonkai.eu
---

I use Python at work and for private projects.  I also aim to write tests for my code, especially
recently.  And as I usually don’t start from 100% code coverage (TDD is not my game), I at least
want to know if the code I just wrote have full coverage.

The trick is to collect all the lines that changed, and all the lines that has no coverage.  Then
compare the two, and you have the uncovered lines that changed!

### Getting the list of changed lines

Recently, I bumped into
[this article](https://adam.younglogic.com/2018/07/testing-patch-has-test/).  It is a great awk
script that lists the lines that changed in the latest commit.  I have really no problem with awk,
but I’m pretty sure it can be done in Python, as that is my main language nowadays.

```python
def get_changed_lines():
    """Get the line numbers that changed in the last commit
    """

    git_output = subprocess.check_output('git show', shell=True).decode('utf-8')

    current_file = None
    lines = {}
    left = 0
    right = 0

    for line in git_output.split('\n'):
        match = re.match(r'^@@ -([0-9]+),[0-9]+ [+]([0-9]+),[0-9]+ @@', line)

        if match:
            left = int(match.groups()[0])
            right = int(match.groups()[1])

            continue

        if re.match(r'^\+\+\+', line):
            current_file = line[6:]

            continue

        if re.match(r'^-', line):
            left += 1

            continue

        if re.match(r'^[+]', line):
            # Save this line number as changed
            lines.setdefault(current_file, [])
            lines[current_file].append(right)
            right += 1

            continue

        left += 1
        right += 1

    return lines
```

OK, not as short as the awk script, but works just fine.

### Getting the uncovered lines

Coverage.py can list the uncovered lines with `coverage report --show-missing`.  For Calendar.social, this looks something like this:

```
Name                                     Stmts   Miss  Cover   Missing
----------------------------------------------------------------------
calsocial/__init__.py                      173     62    64%   44, 138-148, 200, 239-253, 261-280, 288-295, 308-309, 324-346, 354-363
calsocial/__main__.py                        3      3     0%   4-9
calsocial/account.py                       108     51    53%   85-97, 105-112, 125, 130-137, 148-160, 169-175, 184-200, 209-212, 221-234
calsocial/app_state.py                      10      0   100%
calsocial/cache.py                          73     11    85%   65-70, 98, 113, 124, 137, 156-159
calsocial/calendar_system/__init__.py       10      3    70%   32, 41, 48
calsocial/calendar_system/gregorian.py      77      0   100%
calsocial/config_development.py             11     11     0%   4-17
calsocial/config_testing.py                 12      0   100%
calsocial/forms.py                         198     83    58%   49, 59, 90, 136-146, 153, 161-169, 188-195, 198-206, 209-212, 228-232, 238-244, 252-253, 263-267, 273-277, 317-336, 339-342, 352-354, 362-374, 401-413
calsocial/models.py                        372     92    75%   49-51, 103-106, 177, 180-188, 191-200, 203, 242-248, 257-268, 289, 307, 349, 352-359, 378, 392, 404-409, 416, 444, 447, 492-496, 503, 510, 516, 522, 525, 528, 535-537, 545-551, 572, 606-617, 620, 652, 655, 660, 700, 746-748, 762-767, 774-783, 899, 929, 932
calsocial/security.py                       15      3    80%   36, 56-58
calsocial/utils.py                          42      5    88%   45-48, 52-53
----------------------------------------------------------------------
TOTAL                                     1104    324    71%
```

All we have to do is converting these ranges into a list of numbers, and compare it with the
result of the previous function:

```python
def get_uncovered_lines(changed_lines):
    """Get the full list of lines that has not been covered by tests
    """

    column_widths = []
    uncovered_lines = {}

    for line in sys.stdin:
        line = line.strip()

        if line.startswith('---'):
            continue

        if line.startswith('Name '):
            match = re.match(r'^(Name +)(Stmts +)(Miss +)(Cover +)Missing$', line)
            assert match

            column_widths = [len(col) for col in match.groups()]

            continue

        name = [
            line[sum(column_widths[0:idx]):sum(column_widths[0:idx]) + width].strip()
            for idx, width in enumerate(column_widths)][0]
        missing = line[sum(column_widths):].strip()

        for value in missing.split(', '):
            if not value:
                continue

            try:
                number = int(value)
            except ValueError:
                first, last = value.split('-')
                lines = range(int(first), int(last) + 1)
            else:
                lines = range(number, number + 1)

            for lineno in lines:
                if name in changed_lines and lineno not in changed_lines[name]:
                    uncovered_lines.setdefault(name, [])
                    uncovered_lines[name].append(lineno)

    return uncovered_lines
```

At the end we have a dictionary that has filenames as keys, and a list of changed but uncovered
lines.

### Converting back to ranges

To make the final result more readable, let’s convert them back to a nice `from_line-to_line`
range list first:

```python
def line_numbers_to_ranges():
    """List the lines that has not been covered
    """

    changed_lines = get_changed_lines()
    uncovered_lines = get_uncovered_lines(changed_lines)

    line_list = []

    for filename, lines in uncovered_lines.items():
        lines = sorted(lines)
        last_value = None

        ranges = []

        for lineno in lines:
            if last_value and last_value + 1 == lineno:
                ranges[-1].append(lineno)
            else:
                ranges.append([lineno])

            last_value = lineno

        range_list = []

        for range_ in ranges:
            first = range_.pop(0)

            if range_:
                range_list.append(f'{first}-{range_[-1]}')
            else:
                range_list.append(str(first))

        line_list.append((filename, ', '.join(range_list)))

    return line_list
```

### Printing the result

Now all that is left is to print the result on the screen in a format digestable by a human being:

```python
def tabular_print(uncovered_lines):
    """Print the list of uncovered lines on the screen in a tabbed format
    """

    max_filename_len = max(len(data[0]) for data in uncovered_lines)

    for filename, lines in uncovered_lines:
        print(filename.ljust(max_filename_len + 2) + lines)
```

And we are done.

### Conclusion

This task never seemed hard to accomplish, but somehow I never put enough energy into it to make
it happen.  Kudos to Adam Young doing some legwork for me!
