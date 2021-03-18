/// OPEN WEATHER API ///

// Details for Open Weather Map API

let apiKey = "1fa9ff4126d95b8db54f3897a208e91c";
let apiUrlCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?";
let apiUrlForecast ="https://api.openweathermap.org/data/2.5/forecast?q=";
let units = "metric";

// API call using user
function searchCity(city) {
  let apiCurrentWeatherSearchString = `${apiUrlCurrentWeather}q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiCurrentWeatherSearchString ).then(displayWeather);

  let apiHourlySearchString = `${apiUrlForecast}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiHourlySearchString).then(displayHourlyForecast);

  let apiDailySearchString = `${apiUrlForecast}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiDailySearchString).then(displayDailyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city-input");
  searchCity(cityInput.value);
  console.log(searchCity.value);
}

let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", handleSubmit);

let searchCityButton = document.querySelector("#search-city-button");
searchCityButton.addEventListener("click", handleSubmit);

/// GEOLOCATION ///

// Get current location and API call using Geolocation 

function searchLocation(position) {
  let coordinates = `lat=${latitude}&lon=${longitude}`;
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiSearchString = `${apiUrlCurrentWeather}${coordinates}&appid=${apiKey}&units=${units}`;
  
  axios.get(apiSearchString).then(displayWeather);
}

function getGeolocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let geolocationButton = document.querySelector("#geolocation-button");
geolocationButton.addEventListener("click", getGeolocation);

/// TOP CITIES /// 

// Toronto
function searchToronto(event) {
  event.preventDefault();
  searchCity("Toronto");
  let cityCountryElement = document.querySelector("#city-and-country");
  cityCountryElement.innerHTML = "Toronto";
}
let torontoButton = document.querySelector("#toronto-button");
torontoButton.addEventListener("click", searchToronto);

// London
function searchLondon(event) {
  event.preventDefault();
   searchCity("London");
  let cityCountryElement = document.querySelector("#city-and-country");
  cityCountryElement.innerHTML = "London";
}
let londonButton = document.querySelector("#london-button");
londonButton.addEventListener("click", searchLondon);

// Paris
function searchParis(event) {
  event.preventDefault();
  searchCity("Paris");
  let cityCountryElement = document.querySelector("#city-and-country");
  cityCountryElement.innerHTML = "Paris";
}
let parisButton = document.querySelector("#paris-button");
parisButton.addEventListener("click", searchParis);

// Tokyo
function searchTokyo(event) {
  event.preventDefault();
   searchCity("Tokyo");
  let cityCountryElement = document.querySelector("#city-and-country");
  cityCountryElement.innerHTML = "Tokyo";
}
let tokyoButton = document.querySelector("#tokyo-button");
tokyoButton.addEventListener("click", searchTokyo);

// Sydney
function searchSydney(event) {
  event.preventDefault();
   searchCity("Sydney");
  let cityCountryElement = document.querySelector("#city-and-country");
  cityCountryElement.innerHTML = "Sydney";
}
let sydneyButton = document.querySelector("#sydney-button");
sydneyButton.addEventListener("click", searchSydney);

////////////////////////////////////////////////////////////////////////////////

// Format date and timezone
function formatDate(date, timezone) {
  let localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = timezone * 1000;
  let targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;

  let now = new Date(targetTimestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];
  let dayIndex = now.getDate();
  let year = now.getFullYear();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentTime = `${hours}:${minutes}`;
  let dateTimeElement = document.querySelector("#current-date-and-time");
  dateTimeElement.innerHTML = `${day}, ${dayIndex} ${month} ${year} &nbsp;|&nbsp; Local time: ${currentTime}`;

  let formattedDate = `${day}, ${dayIndex} ${month} ${year} &nbsp;|&nbsp; Local time: ${currentTime}`;

  return formattedDate;
}


function getIcon(icon){
  let iconElement ="";
  if(icon === "01d") {
    iconElement = "images/01d.png";
  } else if (icon === "01n") {
    iconElement = "images/01n.png";
  } else if (icon === "02d") {
    iconElement = "images/02d.png";
  } else if (icon === "02n") {
    iconElement = "images/02n.png";
  } else if (icon === "03d") {
    iconElement = "images/03d.png";
  } else if (icon === "03n") {
    iconElement = "images/03n.png";
  } else if (icon === "04d") {
    iconElement = "images/04d.png";
  } else if (icon === "04n") {
    iconElement = "images/04n.png";
  } else if (icon === "09d") {
    iconElement = "images/09d.png";
  } else if (icon === "09n") {
    iconElement = "images/09n.png"; 
  } else if (icon === "10d") {
    iconElement = "images/10d.png";
  } else if (icon === "10n") {
    iconElement = "images/10n.png";
  } else if (icon === "11d") {
    iconElement = "images/11d.png";
  } else if (icon === "11n") {
    iconElement = "images/11n.png";
  } else if (icon === "13d") {
    iconElement = "images/13d.png";
    } else if (icon === "13n") {
    iconElement = "images/13n.png";
  } else if (icon === "50d") {
    iconElement = "images/50d.png";
  } else if (icon === "50n") {
    iconElement = "images/50n.png";
  }
  return iconElement;
}

// Display city, country and current weather (input or geolocation)
function displayWeather(response) {

  // City, country, local time
  document.querySelector("#city-and-country").innerHTML = response.data.name + ", " + response.data.sys.country;
  document.querySelector("#current-date-and-time").innerHTML = formatDate(new Date(), response.data.timezone);

  // Current weather icon, description and current temperature (including maximum and minimum temperatures)
  document.querySelector("#current-weather-icon").setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  document.querySelector("#current-weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#current-temperature").innerHTML = `${Math.round(celsiusTemperature) + "°"}`;
  document.querySelector("#maximum-temperature").innerHTML = " " + Math.round(response.data.main.temp_max) + "°";
  document.querySelector("#minimum-temperature").innerHTML = " " + Math.round(response.data.main.temp_min) + "°";

  celsiusTemperature = response.data.main.temp;
  celsiusMinTemperature = response.data.main.temp_min;
  celsiusMaxTemperature = response.data.main.temp_max;

  // Additional weather details
  document.querySelector("#real-feel").innerHTML =   " " + Math.round(response.data.main.feels_like) + "°";
  celsiusTemperatureFeelsLike = response.data.main.feels_like;
  
  document.querySelector("#humidity").innerHTML = " " + response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML = " " + Math.round(response.data.wind.speed) + " km/h";

  console.log(response.data);
}

// Display 3 Hour Weather Forecast 
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayHourlyForecast(response) {
  let hourlyForecastElement = document.querySelector("#hourly-forecast");
  hourlyForecastElement.innerHTML = null;
  let hourlyForecast = null;

  for (let index = 0; index <= 4; index++) {
    hourlyForecast = response.data.list[index];
    let localTimestamp = hourlyForecast.dt + response.data.city.timezone;

    hourlyForecastElement.innerHTML += `
    <div class="col hour-box">
    <bold>${formatHours(localTimestamp * 1000)}</bold>
    <div class="col hour-weather-icon" id="hour-weather-icon">
    <img class="hour-weather-icon" src="images/${hourlyForecast.weather[0].icon}.png" width="24" height="24"/></div>
    <div class="col hour-temperature">${Math.round(hourlyForecast.main.temp)}°</div>
    </div>`;
  }
}

// Display 5 Day Outlook 
function getNameOfWeekDay(timestamp) {
  let date = new Date (timestamp);
  let weekDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  let weekDay = weekDays [date.getDay()];
  return `${weekDay}`;
 }

 function fetchForecast(latitude, longitude) {
  let weatherDataValues = `exclude=current,minutely,hourly,alerts`
  let coordinates = `lat=${latitude}&lon=${longitude}`
  let apiSearchString = `${apiUrlForecast}${coordinates}&${weatherDataValues}&appid=${apiKey}&units=${units}`;

  axios.get(apiSearchString).then(displayDailyForecast);
}

function displayDailyForecast(response) {
  let dailyForecastElement = document.querySelector("#daily-forecast");
  dailyForecastElement.innerHTML = null;
  let dailyForecast = null;

  for (let index = 6; index <= 39; index+= 8) {
    dailyForecast = response.data.list[index];

    dailyForecastElement.innerHTML += `
    <div class="col day-forecast">
    ${getNameOfWeekDay (dailyForecast.dt * 1000)}
    <div class="weather-icon-forecast">
    <img src="images/${dailyForecast.weather[0].icon}.png" width="24" height="24"/>
    </div>
    <div class="temperature-forecast">
    ${Math.round(dailyForecast.main.temp)}°
    </div></div>`;
  }
}

/// CONVERT TEMPERATURES ///

// Convert to Celsius 
function convertToCelsius(event) {
  event.preventDefault();
  
  convertHourlyForecast("celsius");
  convertDailyForecast ("celsius");
  
  document.querySelector("#current-temperature").innerHTML = Math.round(celsiusTemperature) + "°";
  document.querySelector ("#real-feel").innerHTML = Math.round (celsiusTemperatureFeelsLike)+"°";
  document.querySelector ("#minimum-temperature").innerHTML = Math.round (celsiusMinTemperature) + "°" ;
  document.querySelector ("#maximum-temperature").innerHTML = Math.round (celsiusMaxTemperature) + "°";

  celsiusLink.removeEventListener("click", convertToCelsius);
  fahrenheitLink.addEventListener("click", convertToFahrenheit);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

// Convert to Fahrenheit 
function convertToFahrenheit(event) {
  event.preventDefault();

  convertHourlyForecast("fahrenheit");
  convertDailyForecast("fahrenheit");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature)+"°";

  let fahrenheitTemperatureFeelsLike = (celsiusTemperatureFeelsLike * 9)/5+32;
  document.querySelector ("#real-feel").innerHTML = Math.round (fahrenheitTemperatureFeelsLike)+ "°";

  let fahrenheitMinTemperature = (celsiusMinTemperature * 9) / 5 + 32;
  document.querySelector ("#minimum-temperature").innerHTML = Math.round (fahrenheitMinTemperature) + "°";

  let fahrenheitMaxTemperature = (celsiusMaxTemperature * 9) / 5 + 32;
  document.querySelector ("#maximum-temperature").innerHTML = Math.round (fahrenheitMaxTemperature) + "°";

  celsiusLink.addEventListener("click", convertToCelsius);
  fahrenheitLink.removeEventListener("click", convertToFahrenheit);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = null;
let celsiusTemperatureFeelsLike = null;
let celsiusMinTemperature = null;
let celsiusMaxTemperature = null;

function convertHourlyForecast (unit) {
  if (unit === "celsius") {

  document.querySelectorAll ("#hour-temperature-forecast").forEach(function (temperature) {
  let currentTemperature = temperature.innerHTML;
  temperature.innerHTML = Math.round (currentTemperature * (5 / 9) - 32);
   });
  } else {
  document.querySelectorAll("#hour-temperature-forecast").forEach (function (temperature) {
  let currentTemperature = temperature.innerHTML;
  temperature.innerHTML = Math.round(currentTemperature * (9 / 5) + 32);
    });
  }
}

function convertDailyForecast (unit) {
  if (unit === "celsius") {
  document.querySelectorAll ("#day-temperature-forecast").forEach (function (temperature) {
    let currentTemperature = temperature.innerHTML;
    temperature.innerHTML = Math.round (currentTemperature * (5 / 9) - 32);
    });
  } else {
  document.querySelectorAll("#day-temperature-forecast").forEach(function (temperature) {
    let currentTemperature = temperature.innerHTML;
   temperature.innerHTML = Math.round(currentTemperature * (9 / 5) + 32);
    });
  }
}

// Default city //
searchCity("Vienna");