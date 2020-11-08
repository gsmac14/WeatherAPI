$(document).ready(function () {
  moment().format("L");

  function citySearch(cityName) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=d9776c23489e86b8af3aee508f8e7c15"

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
  
      $("#current").empty();
      var currentDate = moment().format("L");

      //added some HTML to show weaather in city
      var currentWeather = response.weather[0].main;
      var cityNameEl = $("<h2>").text(response.name);
      var showDate = cityNameEl.append("" + currentDate);
      var tempEl = $("<p>").text("Temprature: " + response.main.temp);
      var humidEl = $("<p>").text("Humidity: " + response.main.humidity);
      var windSpeedEl = $("<p>").text("Wind Speed: " + response.wind.speed);
      var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
      console.log(img);

      

      //New div for current weather
      var newDiv = $("<div>");
      var uvlEl;
      newDiv.append(showDate, img, tempEl, humidEl, windSpeedEl);
      $("#current").html(newDiv);

      //create UV call
      var lon = response.coord.lon;
      var lat = response.coord.lat;
      var queryURLUv =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=d9776c23489e86b8af3aee508f8e7c15";
      $.ajax({
        url: queryURLUv,
        method: "GET",
      }).then(function (response) {
        $("#uvl").empty();
        var uvlResults = response.value;
        uvlEl = $("<p>").text("UV Index:" + uvlResults);

        newDiv.append(uvlEl);

    
      });
    });
    
    // 5day forecast
    var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=d9776c23489e86b8af3aee508f8e7c15";
    $.ajax({
      url: queryURLforcast,
      method: "GET",
    }).then(function (response) {
    
      $("#fiveDay").empty();
     
      for (var i = 0; i < response.list.length; i+= 8) {
        console.log(response.list[i]);
  
          var fiveForcast = $("<div>").addClass("card");
          $("#fiveDay").append(fiveForcast);
          var dayContent = $("<div>").addClass("card-body");
          fiveForcast.append(dayContent)

        var date = response.list[i].dt_txt;
        var setDate = date.substr(0, 10);
        var temp = response.list[i].main.temp;
        var hum = response.list[i].main.humidity;
        var fiveH = $("<h5>").text(setDate).addClass("card-title setD");
        var fiveP = $("<p>").text(("Temp: " + temp)).addClass("card-text temp");
        var fiveP2 = $("<p>").text("Humidity " + hum).addClass("card-text humidity");
        
        
        fiveForcast.addClass("card shadow-lg text-white bg-primary mx-auto mb-10 p-2");
      
        dayContent.append(fiveH);
        dayContent.append(fiveP);
        dayContent.append(fiveP2);
       
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
    var li = $("<li>");
    var psearch = $("<button>")
   
    var ul = $("<ul>").attr("style","list-style: none;");
    var clearBtn = $("<button>")
    $("#recentSearch").prepend(ul.append((li.append(psearch.append(recentSearch)))));
  }
  $("#recentSearch").on("click", "button", function (event) {
    event.preventDefault();
    console.log($(event.target).text());
    citySearch($(event.target).text());
    
  });
});
