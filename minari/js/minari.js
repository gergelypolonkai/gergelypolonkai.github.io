var dayNames = new Array(
    'Mirdu',
    'Hëmi',
    'Drak',
    'Þodon',
    'Charm',
    'Ro’unn'
);

var monthNames = new Array(
    'Mebel',
    'Dirann',
    'Ma’uþ',
    'Gerub',
    'Þrei',
    'Dimoc',
    'Xentor',
    'Meðïr',
    'Draþ',
    'Quaden',
    'Ridïmel',
    'Rodom'
);

/*
 * Add the getDOY() method to Date; it returns the day of year.
 */
Date.prototype.getDOY = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);

    return Math.ceil((this - onejan) / 86400000);
}

Date.prototype.getMinariDate = function() {
    var year, thisYear;

    var today = new Date(this);
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    today.setDate(today.getDate() + 11);

    var leapCheck = new Date(today.getFullYear(), 1, 29);
    var minariLeap = (leapCheck.getDate() == 29);

    var doy = this.getDOY();

    var minariYear = today.getFullYear() - 1873;
    var minariMonth = 0;
    var minariDay = 0;
    var minariDOY = 0;
    var minariWeekday = 0;
    var minariSpecialDay = -1;

    switch (doy) {
        case 0:
            minariMonth = 0;
            minariDay = 0;
            minariSpecialDay = 0;

            break;
        case 91:
            minariMonth = 0;
            minariDay = 0;
            minariSpecialDay = 1;

            break
        case 182:
            minariMonth = 0;
            minariDay = 0;
            minariSpecialDay = 2;

            break;
        case 183:
            if (minariLeap) {
                minariMonth = 0;
                minariDay = 0;
                minariSpecialDay = 3;
            }

            break;

        case 273:
            if (!minariLeap) {
                minariMonth = 0;
                minariDay = 0;
                minariSpecialDay = 4;
            }

            break;

        case 274:
            if (minariLeap) {
                minariMonth = 0;
                minariDay = 0;
                minariSpecialDay = 4;
            }

            break;

        case 364:
            if (!minariLeap) {
                minariMonth = 0;
                minariDay = 0;
                minariSpecialDay = 5;
            }

            break;

        case 365:
            if (minariLeap) {
                minariMonth = 0;
                minariDay = 0;
                minariSpecialDay = 5;
            }

            break;
    }

    if (minariSpecialDay == -1) {
        var decr = 0;
        minariDOY = doy;

        if (minariDOY > 0) decr++;
        if (minariDOY > 91) decr++;
        if (minariDOY > 182) decr++;

        if ((minariDOY > 183) && minariLeap) decr++;
        if ((minariDOY > 273) && !minariLeap) decr++;
        if ((minariDOY > 274) && minariLeap) decr++;

        minariDOY -= decr - 1;
        minariMonth = Math.ceil(minariDOY / 30);
        minariDay = minariDOY % 30;

        if (minariDay == 0) minariDay = 30;

        minariWeekday = minariDay % 6;
    }

    return {
        year: minariYear,
        month: minariMonth,
        day: minariDay,
        special: minariSpecialDay
    }
}

function setYear(newYear) {
    year = newYear;

    document.title = year + ' – ' + base_title;
    $('#year').html(year);

    $(todayId).removeClass('today');

    if (year == thisYear) {
        thisDay = new Date();
        thisDay.setDate(thisDay.getDate() + 11);
        checkLeap = new Date(thisDay.getFullYear(), 2, 29);
        isLeap = (checkLeap.getDate() == 29);
        thisDay.setFullYear(thisDay.getFullYear() - 1873);
        month = 0;
        dayNum = thisDay.getDOY();

        switch (dayNum) {
        case 0:
            day = 1;
            break;
        case 91:
            day = 2;
            break;
        case 182:
            day = 3;
            break;
        case 183:
            if (isLeap) {
                day = 3;
                break;
            }
        case 273:
            if (!isLeap) {
                break;
            }
        case 274:
            if (isLeap) {
                day = 4;
                break;
            }
        case 364:
            if (!isLeap) {
                day = 5;
                break;
            }
        case 365:
            if (isLeap) {
                day = 5;
                break;
            }
        default:
            if (isLeap) {
                if (dayNum > 274) {
                    dayNum -= 3;
                } else if (dayNum > 183) {
                    dayNum -= 2;
                } else if (dayNum > 182) {
                    dayNum -= 1;
                }
            } else {
                if (dayNum > 273) {
                    dayNum -= 2;
                } else if (dayNum > 182) {
                    dayNum -= 1;
                }
            }

            if (dayNum > 91) {
                dayNum -= 1;
            }

            if (dayNum > 0) {
                dayNum -= 1;
            }

            month = Math.ceil(dayNum / 30);
            day = dayNum - ((month - 1) * 30) + 1;

            break;
        }

        todayId = '#day-' + month + '-' + day;

        if (year == thisYear) {
            $(todayId).addClass('today');
        }
    }
}

function genMonthTable(div) {
    var month_table = $('<table>').addClass('month');
    var month_header = $('<thead>');

    month_num = $(div).attr('data-month');
    month_name = monthNames[month_num - 1];
    month_header
        .append(
            $('<tr>')
                .addClass('monthname')
                .append(
                    $('<td colspan="6">')
                        .html(month_name)));

    daylist = $('<tr>')
        .addClass('daynames');

    for (i = 0; i < 6; i++) {
        daylist.append($('<td>').html(dayNames[i]));
    }

    month_header.append(daylist);
    month_table.append(month_header);

    month_body = $('<tbody>');

    for (week = 0; week < 5; week++) {
        row = $('<tr>');

        for (day = 0; day < 6; day++) {
            real_day = week * 6 + day + 1;
            row.append(
                $('<td>')
                    .attr('id', 'day-' + month_num + '-' + real_day)
                    .attr('data-month', month_num)
                    .attr('data-day', real_day)
                    .addClass('day')
                    .html(real_day));
        }

        month_body.append(row);
    }

    month_table.append(month_body);
    $(div).html(month_table);
}

function getPopoverContent() {
    list = $(this).attr('id').split('-');
    return getDayTooltip(Number(list[1]), Number(list[2]));
}

function getDayTooltip(month, day) {
    // set dayOneDate to the first day of the correct Gregorian year)
    var dayOneDate = new Date(year + 1873, 0, 1);
    // …now substract 11 days to get the Gregorian date of the current Minari
    // year’s first day. dayOneDate now points to the current Minari year’s
    // first day (Hëdur)
    dayOneDate.setDate(dayOneDate.getDate() - 11);

    // Now let’s check if this Gregorian year is a leap year. We use the same
    // leap year rules as the Gregorian calendar
    var leapYear = (new Date(year + 1873, 1, 29).getDate() == 29);

    // Temporary set leapMorkh to false. We will set it to true later, if needed
    var leapMorkh = false;

    // The day of year we are pointing at
    var dayNum = 0;

    if (month == 0) {
        switch (day) {
            case 1:
                dayNum = 1;

                break;

            case 2:
                dayNum = 92;

                break;

            case 3:
                dayNum = 183;

                if (leapYear) {
                    leapMorkh = true;
                }

                break;

            case 4:
                dayNum = (leapYear) ? 275 : 274;

                break;

            case 5:
                dayNum = (leapYear) ? 366 : 365;

                break;
        }
    } else {
        // Initial value of dayNum. We will increase it soon, depending of the
        // holidays past this year
        dayNum = (month - 1) * 30 + day;

        switch (month) {
            case 1:
            case 2:
            case 3:
                // We have only Hëdur passed, let’s add 1
                dayNum += 1;

                break;
            case 4:
            case 5:
            case 6:
                // We have Hëdur and Rideyy passed, let’s add 2
                dayNum += 2;

                break;
            case 7:
            case 8:
            case 9:
                // We have Hëdur, Rideyy and Morkh passed, let’s add 3. If this
                // is a leap year, Morkh is two days long, so let’s add 4
                // instead.
                dayNum += (leapYear) ? 4 : 3;

                break;
            case 10:
            case 11:
            case 12:
                // We have Hëdur, Rideyy, Morkh and Khmerd passed, let’s add 4.
                // If this is a leap year, Morkh is two days long, so let’s add
                // 5 instead.
                dayNum += (leapYear) ? 5 : 4;

                break;
        }
    }

    dayOneDate.setDate(dayOneDate.getDate() + dayNum - 1);

    return dayOneDate.toLocaleDateString('hu-HU') + ((leapMorkh) ? '<br>(Két napos ünnep)' : '');
}

function yearClick(e) {
    e.stopPropagation();
    inputActive = true;
    $('.year').html('<input type="text" id="yearBox" value="' + year + '" />');
    $('#yearBox').focus();
    $('#yearBox').click(function(e) {
        e.stopPropagation();
    });

    $('#yearBox').keydown(function(e) {
        if (e.which == 13) {
            e.preventDefault();

            if (!isNaN($('#yearBox').val())) {
                newYear = Number($('#yearBox').val())
                $('.year').html('<span id="year">...</span>');
                setYear(newYear);
                $('#year').click(yearClick);
            }
        }

        if (e.which == 27) {
            inputActive = false;
            $('.year').html('<span id="year">' + year + '</span>');
            $('#year').click(yearClick);
        }
    });
}
