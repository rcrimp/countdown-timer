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
        var str = d.toString();
        if(str[str.length-2] == 1) /* force 12th not 12nd */
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
          /*setupTimer(new Date("9:30  6  June 2014"), "comp112");
          setupTimer(new Date("9:30  18 June 2014"), "comp150");
          setupTimer(new Date("14:30 7  June 2014"), "cosc241");
          setupTimer(new Date("9:30  4  June 2014"), "cosc243");
          setupTimer(new Date("9:30  9  June 2014"), "cosc341");
          setupTimer(new Date("9:30  10 June 2014"), "cosc342");
          setupTimer(new Date("14:30 13 June 2014"), "cosc343");
          setupTimer(new Date("14:30 5  June 2014"), "tele301");
          setupTimer(new Date("14:30 18 June 2014"), "math272");
          setupTimer(new Date("14:30 6  June 2014"), "math160");
          */

        /* this date constructor is compatable with ios safari, but less readable :( */ 
        setupTimer(new Date(2014, 5, 6, 9, 30, 0, 0), "comp112");
        setupTimer(new Date(2014, 5, 18, 9, 30, 0, 0), "comp150");
        setupTimer(new Date(2014, 5, 7, 14, 30, 0, 0), "cosc241");
        setupTimer(new Date(2014, 5, 4, 9, 30, 0, 0), "cosc243");
        setupTimer(new Date(2014, 5, 9, 9, 30, 0, 0), "cosc341");
        setupTimer(new Date(2014, 5, 10, 9, 30, 0, 0), "cosc342");
        setupTimer(new Date(2014, 5, 13, 14, 30, 0, 0), "cosc343");
        setupTimer(new Date(2014, 5, 5, 14, 30, 0, 0), "tele301");
        setupTimer(new Date(2014, 5, 18, 14, 30, 0, 0), "math272");
        setupTimer(new Date(2014, 5, 6, 14, 30, 0, 0), "math160");

        setupTimer(new Date(2014, 5, 12, 9, 30, 0, 0), "math201");
        setupTimer(new Date(2014, 5, 6, 14, 30, 0, 0), "math203");
    }
    return pub;

}());

$(document).ready(timer.setup);
