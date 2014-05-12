var timer = (function () {
    var pub = {};

    var second = 1000;
    var minute = 60 * second;
    var hour = 60 * minute;
    var day = 24 * hour;
    
    function updateTimer(date, name) {
        var diff = date.getTime() - (new Date()).getTime();
        if (diff < 0)
            $("#"+name).html(expired);
        else {
            var days = Math.floor(diff / day);
            diff -= days*day;
            var hours = Math.floor(diff / hour);
            diff -= hours*hour
            var minutes = Math.floor(diff / minute);
            diff -= minutes*minute;
            var seconds = Math.floor(diff / second);

            $("#"+name).html("<h3>" + name + "</h3><p>" + days + " days " + hours + " hours " + minutes + " mins " + seconds + " sec</p>");
        }
    }

    function setupTimer(date, name) {
        updateTimer(date, name);
        setInterval(function () {
            updateTimer(date, name)
        }, 1000);
    }

    pub.setup = function () {
        setupTimer(new Date("9:30 6 June 2014"), "comp112");
        setupTimer(new Date("9:30 18 June 2014"), "comp150");

        setupTimer(new Date("14:30 7 June 2014"), "cosc241");
        setupTimer(new Date("9:30 4 June 2014"), "cosc243");

        setupTimer(new Date("9:30 9 June 2014"), "cosc341");
        setupTimer(new Date("9:30 10 June 2014"), "cosc342");
        setupTimer(new Date("14:30 13 June 2014"), "cosc343");
        setupTimer(new Date("14:30 5 June 2014"), "tele301");
        
        setupTimer(new Date("14:30 18 June 2014"), "math272");
        setupTimer(new Date("14:30 6 June 2014"), "math160");
    }
    return pub;

}());

$(document).ready(timer.setup);
