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

    function parseDay(d) {
        if(Math.floor((d/10)%10) == 1) /* force 12th not 12nd */
            return d+"th";
        
        switch (d%10) {
        case 1: return d+"st";
        case 2: return d+"nd";
        case 3: return d+"rd";
        default: return d+"th";;
        }
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
                             date.getHours() + ":" + date.getMinutes() + ", " + parseDay(date.getDate()) + " of " + parseMonth(date.getMonth())
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
    
    /* roughly "YYYY-MM-DD HH:MM:SS"" */
    function dateBuilder(dateTimeString) {
        
        var dateTimeComponents = dateTimeString.split(" ");
        
        var dateComponent = dateTimeComponents[0];
        
        var timeComponent = dateTimeComponents[1];
        
        var dateComponents = dateComponent.split("-");
        
        var timeComponents = timeComponent.split(":");
        
        var year = dateComponents[0];
        var month = dateComponents[1];
        var day = dateComponents[2];
        
        var hour = timeComponents[0];
        var minute = timeComponents[1];
        var second = timeComponents[2];
        
        // Hard-code zero milliseconds
        return new Date(year, month, day, hour, minute, second, 0);
    };

    pub.setup = function () {

        // just encode as key-value pair since we have no interfaces etc
        var examSchedule = {
            "cosc344": "2015-09-17 09:30:00",
            "cosc346": "2015-09-19 09:30:00",
            "cosc244": "2015-09-27 14:30:00",
            "cosc348": "2015-09-29 09:30:00",
            "cosc242": "2015-09-29 09:30:00",
            "cosc345": "2015-09-31 09:30:00",
            "comp212": "2015-10-03 09:30:00",
            "comp160": "2015-10-06 09:30:00"
        };

        for (var exam in examSchedule) {

            var examDateTimeString = examSchedule[exam];

            var examDateTimeObject = dateBuilder(examDateTimeString);

            setupTimer(examDateTimeObject, exam);
        }
    }
    return pub;

}());

$(document).ready(timer.setup);
