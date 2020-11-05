$(document).ready(function () {
    function searchCity(cityName) { 
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    var apiKey = "90402012a3055ae78bcb2ccf9f7f648a";
    
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (repsonse) {
        console.log(queryURL);
        console.log(response);
        //added some HTML to show weaather in city
var currentWeather = repsonse.weather[0].main
var cityNameEl = $("<h2>").text(repsonse.name);
var showDate = cityNameEl.append("" + currentDate);
var tempEl = $("<p>").text("Tempratur: " + repsonse.main.temp);
var humidEl = $("<p>").text("Humidity: " + repsonse.main.humidity);
var windSpeedEl = $("<p>").text("Wind Speed: " + repsonse.wind.speed)

if (currentWeather === "Sun") {
    var currentIcon = $("<img>").attr("src", " https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/01d.png")
    currentIcon.attr("style", "height: 50px; width: 60px");
    }else if(currentWeather === "Rain"){
        var currentIcon = $("<img>").attr("src", " https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/10d.png")
    currentIcon.attr("style", "height: 50px; width: 60px");
    }
        // event handler
        $(".chooseCity").on("click", function (event) {
            event.preventDefault();
            var cityInput = $("#cityInput").val().trim();
            var textCon = $(this).siblings("#cityInput").val();
            var storageArr = [];
            storageArr.push(textCon);
            localStorage.setItem("cityName", JSON.stringify(storageArr));
            searchCity(cityInput);

            // getWeather(cityName)
            
            
        });
        function load


    });
    
   }
});
