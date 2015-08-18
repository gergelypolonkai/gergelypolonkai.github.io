var max_points = 0;
var points = 0;

function append_point_values() {
    $('li[data-points]').each(function() {
        points = $(this).attr('data-points');
        $(this).append(' [' + points + ' points of FAIL]');
    });
}

function calc_max_points() {
    $('ul:not(.choose-one) > li[data-points]').each(function() {
        points = $(this).attr('data-points');
        max_points += +points;
    });

    $('li:has(ul.choose-one)').each(function() {
        var this_max = NaN;
        $(this).children('ul.choose-one').children('li').each(function() {
            points = +$(this).attr('data-points');

            if (isNaN(this_max) || points > this_max) {
                this_max = points;
            }
        });

        max_points += this_max;
    });
}

function update_points() {
    var points = 0;

    $('.active').each(function() {
        points += +$(this).attr('data-points');
    });

    if (max_points == 0) {
        percent = 0;
    } else {
        percent = points / max_points * 100;
    }

    $('#failmeter').attr('aria-valuenow', percent).css('width', percent + '%');
    $('#points').html(points + '/' + max_points);

    if (percent == 0) {
        failtext = 'Perfect! All signs point to succes!';
    } else if (percent < 1.6) {
        failtext = 'You are probably doing okay, but you could be better.';
    } else if (percent < 3.8) {
        failtext = 'Babies cry when your code is downloaded.';
    } else if (percent < 5.7) {
        failtext = 'Kittens die when your code is downloaded.';
    } else if (percent < 8.2) {
        failtext = 'HONK HONK. THE FAILBOAT HAS ARRIVED!';
    } else {
        failtext = 'So much fail, your code should have its own reality show.';
    }

    $('#failtext').html(failtext);
}
