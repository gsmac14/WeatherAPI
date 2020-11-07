$(document).ready(function () {
  moment().format("L");

  function citySearch(cityName) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=d9776c23489e86b8af3aee508f8e7c15";
    // var apiKey = "d9776c23489e86b8af3aee508f8e7c15";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(queryURL);
      console.log(response);
      $("#current").empty();
      var currentDate = moment().format("L");

      //added some HTML to show weaather in city
      var currentWeather = response.weather[0].main;
      var cityNameEl = $("<h2>").text(response.name);
      var showDate = cityNameEl.append("" + currentDate);
      var tempEl = $("<p>").text("Temprature: " + response.main.temp);
      var humidEl = $("<p>").text("Humidity: " + response.main.humidity);
      var windSpeedEl = $("<p>").text("Wind Speed: " + response.wind.speed);
      var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response[0].icon + ".png");
      // console.log(currentWeather);
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
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      var queryURLUv =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=d9776c23489e86b8af3aee508f8e7c15";
      $.ajax({
        url: queryURLUv,
        method: "Get",
      }).then(function (response) {
        $("#uvl").empty();
        var uvlResults = response.value;
        var uvlEl = $("<p>").text("UV Index:" + uvlResults);
        $("#uvl").html(uvlEl);
      });
    });
    
    // 5day forecast
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&cnt=5&appid=d9776c23489e86b8af3aee508f8e7c15";
    $.ajax({
      url: queryURLforcast,
      method: "GET",
    }).then(function (response) {
      console.log(response)
      $("#fiveDay").empty();
      var results = response.list;
      for (i = 0; i < results.length; i++) {
        var date = results[i].dt_txt;
        var setDate = date.substr(0, 10);
        var temp = results[i].main.temp;
        var hum = results[i].main.humidity;
        var fiveForcast = $("<div>");
        fiveForcast.addClass("card shadow-lg text-white bg-primary mx-auto mb-10 p-2")

        //add text to tags
        $(".temp").text("Temp: " + temp);
        $(".humidity").text("Humidity " + hum);
        $(".setD").text(setDate);

        var weather = results[i].weather[0].main;
        if (weather === "Clear Sky") {
          var icon = $("<img>").attr(
            "src",
            " https://openweathermap.org/img/wn/01d@2x.png"
          );
          icon.attr("style", "height: 50px; width: 60px");
        } else if (weather === "Rain") {
          var icon = $("<img>").attr(
            "src",
            " https://openweathermap.org/img/wn/10d@2x.png"
          );
          icon.attr("style", "height: 50px; width: 50px");
        } else if (weather === "Shower Rain") {
          var icon = $("<img>").attr(
            "src",
            " https://openweathermap.org/img/wn/09d@2x.png"
          );
          icon.attr("style", "height: 50px; width: 50px");
        } else if (weather === "thunderstorm") {
          var icon = $("<img>").attr(
            "src",
            " https://openweathermap.org/img/wn/11d@2x.png"
          );
          icon.attr("style", "height: 50px; width: 50px");
        } else if (weather === "snow") {
          var icon = $("<img>").attr(
            "src",
            " https://openweathermap.org/img/wn/13d@2x.png"
          );
          icon.attr("style", "height: 50px; width: 50px");
        } else if (weather === "few clouds") {
          var icon = $("<img>").attr(
            "src",
            " https://openweathermap.org/img/wn/02d@2x.png"
          );
          icon.attr("style", "height: 50px; width: 50px");
        } else if (weather === "mist") {
          var icon = $("<img>").attr(
            "src",
            " https://openweathermap.org/img/wn/50d@2x.png"
          );
          icon.attr("style", "height: 50px; width: 60px");
        } else if (weather === "overcast") {
          var icon = $("<img>").attr(
            "src",
            " https://openweathermap.org/img/wn/04d@2x.png"
          );
          icon.attr("style", "height: 50px; width: 50px");
        }
        $("#fiveDay").append(fiveForcast);
      }
    });
  }
  // event handler
 pageLoad();
  $(".chooseCity").on("click", function (event) {
    event.preventDefault();
    var cityInput = $("#cityInput").val().trim();
    var textCon = $(this).siblings("#cityInput").val();
    var storageArr = [];
    storageArr.push(textCon);
    localStorage.setItem("cityName", JSON.stringify(storageArr));
    citySearch(cityInput);
   pageLoad();
  });

  function pageLoad() {
    var recentSearch = JSON.parse(localStorage.getItem("cityName"));
    // var psearch = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' id='historyBtn' style='width: 12rem;>");
var psearch = $("<button>")
    // var searchBut = $("#historyBtn").text(recentSearch)
    // $(".btn border").append(searchBut)
    psearch.append(recentSearch);
    $("#recentSearch").prepend(psearch);
  }
  $("#recentSearch").on("click", ".btn", function (event) {
    event.preventDefault();
    citySearch($(this).text());
   
  });
});
