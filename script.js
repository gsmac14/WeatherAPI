$(document).ready(function () {
  moment().format("L");

  function citySearch(cityName) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=d9776c23489e86b8af3aee508f8e7c15";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $("#current").empty();
      var currentDate = moment().format("L");

      //added some HTML to show weather in city
      var cityNameEl = $("<h2>").text(response.name);
      var showDate = cityNameEl.append("  " + currentDate);
      var tempEl = $("<p>").text("Temprature: " + response.main.temp);
      var humidEl = $("<p>").text("Humidity: " + response.main.humidity);
      var windSpeedEl = $("<p>").text("Wind Speed: " + response.wind.speed);
      var img = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
      );
      console.log(img);

      //New div for current weather
      var newDiv = $("<div>");
      newDiv.append(showDate, img, tempEl, humidEl, windSpeedEl);
      $("#current").html(newDiv);

      //create UV call
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      var queryURLUv =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=d9776c23489e86b8af3aee508f8e7c15";
      $.ajax({
        url: queryURLUv,
        method: "GET",
      }).then(function (uvresponse) {
        $("#uvi").empty();
        var uvResults = uvresponse.value;
        uvEl = $("<p>").text("UV Index:" + uvResults);

        newDiv.append(uvEl);
        //if statement to change uv index color when index increases past a certain point
        if (uvResults <= 2.9) {
          uvEl.attr("style", "background-color:green" );
          }
        if (uvResults  >= 3 && uvResults <= 5.9 ) {
            uvEl.attr("style", "background-color:yellow" );
          } 
        if (uvResults  >= 6 && uvResults <= 7.9 ) {
            uvEl.attr("style", "background-color:orange" );
           } 
        if(uvResults >= 8)  {
            uvEl.attr("style", "background-color:red" );
           } 
      });
    });



    // generate 5day forecast
    var queryURLforcast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=imperial&appid=d9776c23489e86b8af3aee508f8e7c15";
    $.ajax({
      url: queryURLforcast,
      method: "GET",
    }).then(function (response) {
      $("#fiveDay").empty();

      for (var i = 0; i < response.list.length; i += 8) {
        console.log(response.list[i]);

        var fiveForcast = $("<div>").addClass("card");
        $("#fiveDay").append(fiveForcast);
        var dayContent = $("<div>").addClass("card-body");
        fiveForcast.append(dayContent);
        // var img = $("<img>").attr( "src", "http://openweathermap.org/img/w/" + response.list.weather[2].icon + ".png");

        var date = response.list[i].dt_txt;
        var setDate = date.substr(0, 10);
        
        var temp = response.list[i].main.temp;
        var hum = response.list[i].main.humidity;
        var fiveH = $("<h5>").text(setDate).addClass("card-title setD");
        var fiveP = $("<p>").text("Temp: " + temp).addClass("card-text temp");
        var fiveP2 = $("<p>").text("Humidity " + hum).addClass("card-text humidity");
        fiveForcast.addClass(
          "card shadow-lg text-white bg-primary mx-1 mb-5 p-2"
        );

        dayContent.append(fiveH);
        // dayContent.append(img);
        dayContent.append(fiveP);
        dayContent.append(fiveP2);

        $("#fiveDay").append(fiveForcast);
      }
    });
  }
  // event handlers to search city and also load/store previous search
  load();
  $(".chooseCity").on("click", function (event) {
    event.preventDefault();
    var cityEntered = $("#cityInput").val().trim();
    var textCon = $(this).siblings("#cityInput").val();
    var arr = [];
    arr.push(textCon);
    localStorage.setItem("cityName", JSON.stringify(arr));
    citySearch(cityEntered);
    load();
  });

  function load() {
    var recentSearch = JSON.parse(localStorage.getItem("cityName"));
    var li = $("<li>");
    var previousSearch = $("<button>").attr("style", "background-color: white");
    var ul = $("<ul>").attr("style", "list-style: none;");
    $("#recentSearch").prepend(
      ul.append(li.append(previousSearch.append(recentSearch)))
    );
  }
  $("#recentSearch").on("click", "button", function (event) {
    event.preventDefault();
    console.log($(event.target).text());
    citySearch($(event.target).text());
  });
});
