$(document).ready(function () {
    moment().format("L");
  
    function citySearch(cityName) {
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    var apiKey = "90402012a3055ae78bcb2ccf9f7f648a";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (repsonse) {
      console.log(queryURL);
      console.log(response);
      $("#current").empty();
      var currentDate = moment().format("L");

      //added some HTML to show weaather in city
      var currentWeather = repsonse.weather[0].main;
      var cityNameEl = $("<h2>").text(repsonse.name);
      var showDate = cityNameEl.append("" + currentDate);
      var tempEl = $("<p>").text("Temprature: " + repsonse.main.temp);
      var humidEl = $("<p>").text("Humidity: " + repsonse.main.humidity);
      var windSpeedEl = $("<p>").text("Wind Speed: " + repsonse.wind.speed);

      if (currentWeather === "Clear Sky") {
        var currentIcon = $("<img>").attr(
          "src",
          " https://openweathermap.org/img/wn/01d@2x.png"
        );
        currentIcon.attr("style", "height: 50px; width: 60px");
      } else if (currentWeather === "Rain") {
        var currentIcon = $("<img>").attr(
          "src",
          " https://openweathermap.org/img/wn/10d@2x.png"
        );
        currentIcon.attr("style", "height: 50px; width: 50px");
      } else if (currentWeather === "Shower Rain") {
        var currentIcon = $("<img>").attr(
          "src",
          " https://openweathermap.org/img/wn/09d@2x.png"
        );
        currentIcon.attr("style", "height: 50px; width: 50px");
      } else if (currentWeather === "thunderstorm") {
        var currentIcon = $("<img>").attr(
          "src",
          " https://openweathermap.org/img/wn/11d@2x.png"
        );
        currentIcon.attr("style", "height: 50px; width: 50px");
      } else if (currentWeather === "snow") {
        var currentIcon = $("<img>").attr(
          "src",
          " https://openweathermap.org/img/wn/13d@2x.png"
        );
        currentIcon.attr("style", "height: 50px; width: 50px");
      } else if (currentWeather === "few clouds") {
        var currentIcon = $("<img>").attr(
          "src",
          " https://openweathermap.org/img/wn/02d@2x.png"
        );
        currentIcon.attr("style", "height: 50px; width: 50px");
      } else if (currentWeather === "mist") {
        var currentIcon = $("<img>").attr(
          "src",
          " https://openweathermap.org/img/wn/50d@2x.png"
        );
        currentIcon.attr("style", "height: 50px; width: 60px");
      } else if (currentWeather === "overcast") {
        var currentIcon = $("<img>").attr(
          "src",
          " https://openweathermap.org/img/wn/04d@2x.png"
        );
        currentIcon.attr("style", "height: 50px; width: 50px");
      }
      //New div for current weather
      var newDiv = $("<div>");
      newDiv.append(showDate, currentIcon, tempEl, humidEl, windSpeedEl);
      $("#current").html(newDiv);

      //create UV call
      var lon = repsonse.coord.lon;
      var lat = repsonse.coord.lat;
      var queryURLUv =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey;
      $ajax({
        url: queryURLUv,
        method: "Get",
      }).then(function (response) {
        $("#uvl").empty();
        var uvlResults = repsonse.value;
        var uvlEl = $("<p>").text("UV Index:" + uvlResults);
        $("#uvl").html(uvlEl);
      });
    });
var queryURLForcast = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
$ajax({
    url: queryURLForcast,
    method: "GET",
}).then(function(response){
    $("#fiveDay").empty();
    var fiveDayResult = repsonse.list;
})

    // event handler
    // $(".chooseCity").on("click", function (event) {
    //     event.preventDefault();
    //     var cityInput = $("#cityInput").val().trim();
    //     var textCon = $(this).siblings("#cityInput").val();
    //     var storageArr = [];
    //     storageArr.push(textCon);
    //     localStorage.setItem("cityName", JSON.stringify(storageArr));
    //     searchCity(cityInput);

    // getWeather(cityName)

    // });
    searchCity();
  }
});
