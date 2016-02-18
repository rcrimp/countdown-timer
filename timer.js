var timer = (function () {
    var pub = {};

    var second = 1000; /* 1000 milliseconds */
    var minute = 60 * second;
    var hour = 60 * minute;
    var day = 24 * hour;
    
    function parseMonth(month) {
        
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        // out-of-bounds check
        if (month < 0 || month > 11) {
            
            // maintain legacy results for legacy consumers of this function
            return "INVALID MONTH!";
        }
        
        return months[month];
    }

    function getDayWithOrdinalIndicator(day) {
        
        // 11, 12, and 13 are exceptions.
        if (11 <= day % 100 && day % 100 <= 13) {
            return day + "th";
        }

        // avoid conditional to save CPU cycles
        return day + ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][day % 10];
    }
    
    function updateTimer(date, name) {
        /* diff = time remaining in milliseconds */
        var diff = date.getTime() - (new Date()).getTime();
        if (diff < 0)
            $("#"+name).html("<h3>" + name + "</h3><p>expired</p>");
        else {
            var days = Math.floor(diff / day);
            diff -= days*day;
            var hours = Math.floor(diff / hour);
            diff -= hours*hour
            var minutes = Math.floor(diff / minute);
            diff -= minutes*minute;
            var seconds = Math.floor(diff / second);

            $("#"+name).html("<h3>" + name + "</h3><p>" + 
                             date.getHours() + ":" + date.getMinutes() + ", " + getDayWithOrdinalIndicator(date.getDate()) + " of " + parseMonth(date.getMonth())
                             + "</p><p>" +
                             days + " days " + hours + " hours " + minutes + " mins " + seconds + " sec"
                             + "</p>");
        }
    }

    function setupTimer(date, name) {
        updateTimer(date, name);
        setInterval(function () {
            updateTimer(date, name)
        }, 1000);
    }
    
    pub.setup = function () {

        // just encode as key-value pair since we have no interfaces etc
        var examSchedule = {
            "cosc344": "2015-10-17T09:30:00",
            "cosc346": "2015-10-19T09:30:00",
            "cosc244": "2015-10-27T14:30:00",
            "cosc348": "2015-10-29T09:30:00",
            "cosc242": "2015-10-29T09:30:00",
            "cosc345": "2015-10-31T09:30:00",
            "comp212": "2015-11-03T09:30:00",
            "comp160": "2015-11-06T09:30:00"
        };

        for (var exam in examSchedule) {

            var examDateTimeString = examSchedule[exam];

            var examDateTimeObject = new Date(examDateTimeString);

            setupTimer(examDateTimeObject, exam);
        }
    }
    return pub;

}());

$(document).ready(timer.setup);
