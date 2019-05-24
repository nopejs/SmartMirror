var variableW = setInterval(function() {
    weather();
}, 180000);

function weather(){
    // get API-Data
    var weatherURL = 'https://api.apixu.com/v1/forecast.json?days=6&key=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&q=LATITUDE,LONGITUDE';
    var weatherRequest = new XMLHttpRequest();
    weatherRequest.open('GET', weatherURL);
    weatherRequest.responseType = 'json';
    weatherRequest.send();

    // process data
    weatherRequest.onload = function() {
        var weatherData = weatherRequest.response;
        var cur_temp  = weatherData['current']['temp_c'];
        //var condition = weatherData['current']['condition']['text'];
        var cond_code = weatherData['current']['condition']['code'];
        var isDay = weatherData['current']['is_day'];

        if(cur_temp < 10 && cur_temp >= 0){
          var cur_temp = '0' + cur_temp;
        }
        document.getElementById("currCond").className = condCodeToIcon(cond_code, isDay);
        var cur_temp_HTML = document.getElementById("curTemp");
        cur_temp_HTML.innerHTML = cur_temp;

        // empty forecasts-table before filling it with new data
        document.getElementById("forecasts").innerHTML = '';
        
        var daycount = -1;
        weatherData.forecast.forecastday.forEach(element => {
          if(daycount != -1){
            var date = new Date();
            $("#forecasts").append('<tr><td id="forecast" style="font-weight: normal;">' + day(date.getDay() + daycount) + '</td><td id="forecast"><i id="' + element["day"]["condition"]["code"] + '" class="' + condCodeToIcon(element["day"]["condition"]["code"], 1) + '" style="font-size: 0.8em;"></i></td><td id="forecast">' + Math.round(element["day"]["mintemp_c"]) + '<i class="wi wi-celsius"></i></td><td id="forecast">' + Math.round(element["day"]["maxtemp_c"]) + '<i class="wi wi-celsius"></i></td></tr>');
          }
          daycount++;
        });

    }

    var sunriseURL = 'https://api.sunrise-sunset.org/json?lat=LATITUDE&lng=LONGITUDE&formatted=0';
    var sunriseRequest = new XMLHttpRequest();
    sunriseRequest.open('GET', sunriseURL);
    sunriseRequest.responseType = 'json';
    sunriseRequest.send();

    sunriseRequest.onload = function() {
        var sunriseData = sunriseRequest.response;
        var sunrise  = sunriseData['results']['sunrise'];
        var sunset   = sunriseData['results']['sunset'];

        var sunrise = new Date(Date.parse(sunrise)+720000);
        var sunset  = new Date(Date.parse(sunset)+720000);

        if(sunrise.getHours() < 10){
          var riseHour = '0' + sunrise.getHours();
        }
        else{
          var riseHour   = sunrise.getHours();
        }
        if(sunrise.getMinutes() < 10){
          var riseMinute = '0' + sunrise.getMinutes();
        }
        else{
          var riseMinute = sunrise.getMinutes();
        }
        if(sunset.getHours() < 10){
          var setHour = '0' + sunset.getHours();
        }
        else{
          var setHour   = sunset.getHours();
        }
        if(sunset.getMinutes() < 10){
          var setMinute = '0' + sunset.getMinutes();
        }
        else{
          var setMinute = sunset.getMinutes();
        }

        var sunriseFormatted = riseHour + ':' + riseMinute;
        var sunsetFormatted  = setHour + ':' + setMinute;
    
        var sunriseHTML = document.getElementById("sunrise");
        var sunsetHTML  = document.getElementById("sunset");

        sunriseHTML.innerHTML = sunriseFormatted;
        sunsetHTML.innerHTML = sunsetFormatted;
    }
}

function condCodeToIcon(condCode, isDay){
  // DAY ICONS
  var dCodes = [];
  // sun
  dCodes[1000] = "wi wi-day-sunny";
  // clouds
  dCodes[1003] = "wi wi-day-cloudy";
  dCodes[1006] = "wi wi-cloud";
  dCodes[1009] = "wi wi-cloudy";
  // fog
  dCodes[1030] = "wi wi-day-fog";
  dCodes[1135] = "wi wi-fog";
  // rain
  dCodes[1063] = "wi wi-day-rain";
  dCodes[1087] = "wi wi-day-lightning";
  dCodes[1150] = "wi wi-day-lightning";
  dCodes[1153] = "wi wi-day-rain-mix";
  dCodes[1168] = "wi wi-day-hail";
  dCodes[1171] = "wi wi-day-hail";
  dCodes[1180] = "wi wi-day-rain-mix";
  dCodes[1183] = "wi wi-day-rain-mix";
  dCodes[1186] = "wi wi-day-rain-mix";
  dCodes[1189] = "wi wi-day-rain-mix";
  dCodes[1192] = "wi wi-day-rain-mix";
  dCodes[1193] = "wi wi-day-rain";
  dCodes[1195] = "wi wi-day-rain";
  dCodes[1197] = "wi wi-day-hail";
  dCodes[1201] = "wi wi-day-hail";
  dCodes[1240] = "wi wi-day-showers";
  dCodes[1243] = "wi wi-day-showers";
  dCodes[1246] = "wi wi-day-rain";
  dCodes[1273] = "wi wi-day-thunderstorm";
  dCodes[1276] = "wi wi-day-thunderstorm";
  // snow
  dCodes[1066] = "wi wi-day-snow";
  dCodes[1072] = "wi wi-day-snow-wi wind";
  dCodes[1147] = "wi wi-day-haze";
  dCodes[1114] = "wi wi-day-snow-wi wind";
  dCodes[1117] = "wi wi-day-snow-thunderstorm";
  dCodes[1210] = "wi wi-day-snow";
  dCodes[1213] = "wi wi-day-snow";
  dCodes[1216] = "wi wi-day-snow";
  dCodes[1219] = "wi wi-day-snow-wi wind";
  dCodes[1222] = "wi wi-day-snow-wi wind";
  dCodes[1225] = "wi wi-day-snow-wi wind";
  dCodes[1237] = "wi wi-day-rain-mix";
  dCodes[1204] = "wi wi-day-sleet";
  dCodes[1069] = "wi wi-day-sleet";
  dCodes[1207] = "wi wi-day-sleet";
  dCodes[1249] = "wi wi-day-sleet";
  dCodes[1252] = "wi wi-day-sleet";
  dCodes[1255] = "wi wi-day-snow";
  dCodes[1258] = "wi wi-day-snow-wi wind";
  dCodes[1261] = "wi wi-day-sleet";
  dCodes[1264] = "wi wi-day-sleet";
  dCodes[1279] = "wi wi-day-snow-thunderstorm";
  dCodes[1282] = "wi wi-day-snow-thunderstorm";


  // NIGHT ICONS
  var nCodes = [];
  // sun
  nCodes[1000] = "wi wi-night-clear";
  // clouds
  nCodes[1003] = "wi wi-night-cloudy";
  nCodes[1006] = "wi wi-cloud";
  nCodes[1009] = "wi wi-cloudy";
  // fog
  nCodes[1030] = "wi wi-night-fog";
  nCodes[1135] = "wi wi-fog";
  // rain
  nCodes[1063] = "wi wi-night-rain";
  nCodes[1087] = "wi wi-night-lightning";
  nCodes[1150] = "wi wi-night-lightning";
  nCodes[1153] = "wi wi-night-rain-mix";
  nCodes[1168] = "wi wi-night-hail";
  nCodes[1171] = "wi wi-night-hail";
  nCodes[1180] = "wi wi-night-rain-mix";
  nCodes[1183] = "wi wi-night-rain-mix";
  nCodes[1186] = "wi wi-night-rain-mix";
  nCodes[1189] = "wi wi-night-rain-mix";
  nCodes[1192] = "wi wi-night-rain-mix";
  nCodes[1193] = "wi wi-night-rain";
  nCodes[1195] = "wi wi-night-rain";
  nCodes[1197] = "wi wi-night-hail";
  nCodes[1201] = "wi wi-night-hail";
  nCodes[1240] = "wi wi-night-showers";
  nCodes[1243] = "wi wi-night-showers";
  nCodes[1246] = "wi wi-night-rain";
  nCodes[1273] = "wi wi-night-thunderstorm";
  nCodes[1276] = "wi wi-night-thunderstorm";
  // snow
  nCodes[1066] = "wi wi-night-snow";
  nCodes[1072] = "wi wi-night-snow-wi wind";
  nCodes[1147] = "wi wi-night-haze";
  nCodes[1114] = "wi wi-night-snow-wi wind";
  nCodes[1117] = "wi wi-night-snow-thunderstorm";
  nCodes[1210] = "wi wi-night-snow";
  nCodes[1213] = "wi wi-night-snow";
  nCodes[1216] = "wi wi-night-snow";
  nCodes[1219] = "wi wi-night-snow-wi wind";
  nCodes[1222] = "wi wi-night-snow-wi wind";
  nCodes[1225] = "wi wi-night-snow-wi wind";
  nCodes[1237] = "wi wi-night-rain-mix";
  nCodes[1204] = "wi wi-night-sleet";
  nCodes[1069] = "wi wi-night-sleet";
  nCodes[1207] = "wi wi-night-sleet";
  nCodes[1249] = "wi wi-night-sleet";
  nCodes[1252] = "wi wi-night-sleet";
  nCodes[1255] = "wi wi-night-snow";
  nCodes[1258] = "wi wi-night-snow-wi wind";
  nCodes[1261] = "wi wi-night-sleet";
  nCodes[1264] = "wi wi-night-sleet";
  nCodes[1279] = "wi wi-night-snow-thunderstorm";
  nCodes[1282] = "wi wi-night-snow-thunderstorm";

  if(isDay == 1){
    return dCodes[condCode];
  }
  else if(isDay == 0){
    return nCodes[condCode];
  }
}

function day(day) {
  if(day > 6){
    day -= 7;
  }

  var weekdays = new Array(7);
  weekdays[0] = "Mo";
  weekdays[1] = "Di";
  weekdays[2] = "Mi";
  weekdays[3] = "Do";
  weekdays[4] = "Fr";
  weekdays[5] = "Sa";
  weekdays[6] = "So";
  
  return weekdays[day];
}
