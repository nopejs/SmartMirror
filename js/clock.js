var variableC = setInterval(function() {
  timer();
}, 1000);

function timer() {
    var d = new Date();
  
    var hour   = d.getHours();
    var minute = d.getMinutes();
    var second = d.getSeconds();
  
    var date   = d.getDate();
    var month = d.getMonth();
    var year   = d.getFullYear();
  
    if(date < 10){
        var date = "0" + date;
    }
    var months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    
    if(hour < 10){
        var hour = "0" + hour;
    }  
    if(minute < 10){
        var minute = "0" + minute;
    }
    if(second < 10){
      var second = "0" + second;
    }
  
    document.getElementById("hours").innerHTML   = hour;
    document.getElementById("minutes").innerHTML = minute;
    document.getElementById("seconds").innerHTML = second;
  
    document.getElementById("date").innerHTML  = date;
    document.getElementById("month").innerHTML = months[month];
    document.getElementById("year").innerHTML  = year;

}
