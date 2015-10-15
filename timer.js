var timer = (function () {
    var pub = {};

    var second = 1000; /* 1000 milliseconds */
    var minute = 60 * second;
    var hour = 60 * minute;
    var day = 24 * hour;
    
    function parseMonth(m) {
        switch (m+1) {
	case(1):  return "January";
	case(2):  return "February";
	case(3):  return "March";
	case(4):  return "April";
	case(5):  return "May";
	case(6):  return "June";
	case(7):  return "July";
	case(8):  return "August";
	case(9):  return "September";
	case(10): return "October";
	case(11): return "November";
	case(12): return "December";
	default:  return "INVALID MONTH!";
        }
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

    pub.setup = function () {
       /* year, month, day, hour, minute, second, ms */
       setupTimer(new Date(2015, 9, 17, 9, 30,  0, 0), "cosc344");
       setupTimer(new Date(2015, 9, 19, 9, 30,  0, 0), "cosc346");
       setupTimer(new Date(2015, 9, 27, 14, 30,  0, 0), "cosc244");
       setupTimer(new Date(2015, 9, 29, 9, 30,  0, 0), "cosc348");
       setupTimer(new Date(2015, 9, 29, 9, 30,  0, 0), "cosc242");
       setupTimer(new Date(2015, 9, 31, 9, 30,  0, 0), "cosc345");
       setupTimer(new Date(2015, 10, 3, 9, 30,  0, 0), "comp212");
       setupTimer(new Date(2015, 10, 6, 9, 30,  0, 0), "comp160");
        }
    return pub;

}());

$(document).ready(timer.setup);
