// Current date and time according to timezone //

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
  dateTimeElement.innerHTML = `${day}, ${dayIndex} ${month} ${year} &nbsp;|&nbsp; ${currentTime}`;

  let formattedDate = `${day}, ${dayIndex} ${month} ${year} &nbsp;|&nbsp; ${currentTime}`;

  return formattedDate;
}

/// OPEN WEATHER API ///

function displayWeather(response) {
  // Name of city and country; date and time
  let cityCountryElement = document.querySelector("#city-and-country");
  let dateTimeElement = document.querySelector("#current-date-and-time");

  // Current weather icon, description and current temperature (including maximum and minimum temperatures)
  let weatherIconElement = document.querySelector("#current-weather-icon");
  let currentWeatherDescriptionElement = document.querySelector(
    "#current-weather-description"
  );
  let currentTemperatureElement = document.querySelector(
    "#current-temperature"
  );

  let maximumTemperatureElement = document.querySelector(
    "#maximum-temperature"
  );
  let minimumTemperatureElement = document.querySelector(
    "#minimum-temperature"
  );

  // Additional weather details
  let realFeelElement = document.querySelector("#real-feel");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  cityCountryElement.innerHTML =
    response.data.name + ", " + response.data.sys.country;
  dateTimeElement.innerHTML = formatDate(new Date(), response.data.timezone);
  weatherIconElement.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}.png`
  );
  celsiusTemperature = response.data.main.temp;
  currentTemperatureElement.innerHTML = `${
    Math.round(celsiusTemperature) + "°"
  }`;
  maximumTemperatureElement.innerHTML =
    " " + Math.round(response.data.main.temp_max) + "°";
  minimumTemperatureElement.innerHTML =
    " " + Math.round(response.data.main.temp_min) + "°";
  currentWeatherDescriptionElement.innerHTML =
    response.data.weather[0].description;
  realFeelElement.innerHTML =
    " " + Math.round(response.data.main.feels_like) + "°";
  humidityElement.innerHTML = " " + response.data.main.humidity + "%";
  windElement.innerHTML = " " + Math.round(response.data.wind.speed) + " km/hr";

  console.log(response.data);
}

// Display 3-hourly Weather Forecast //

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
 <img class="hour-weather-icon" src="images/${
   hourlyForecast.weather[0].icon
 }.png" width="25" height="25"/></div>
 <div class="col hour-temperature">${Math.round(
   hourlyForecast.main.temp
 )}°</div></div>`;
  }
}

// Display 5-day Outlook //

function formatDayForecast(timestamp) {
  let forecastDay = new Date(timestamp);
  let weekDays = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];
  let weekDay = weekDays[forecastDay.getDay()];
  return `${weekDay}`;
}

function displayDailyForecast(response) {
  let dailyForecastElement = document.querySelector("#daily-forecast");
  dailyForecastElement.innerHTML = null;
  let dailyForecast = null;
  console.log(response.data);

  for (let index = 0; index < 5; index++) {
    dailyForecast = response.data.list[index * 8];

    dailyForecastElement.innerHTML += `
<div class="col day-forecast">
${formatDayForecast(dailyForecast.dt * 1000)}
<div class="weather-icon-forecast">
<img src="images/${dailyForecast.weather[0].icon}.png" width="25" height="25"/>
</div>
<div class="temperature-forecast">
${Math.round(dailyForecast.main.temp)}°
</div></div>`;
  }
}

/// GEOLOCATION ///

function searchLocation(position) {
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiKey = "1fa9ff4126d95b8db54f3897a208e91c";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Change city with search engine //

function searchCity(city) {
  let apiEndpointForecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=";
  let apiKey = "1fa9ff4126d95b8db54f3897a208e91c";
  let units = "metric";
  let apiUrlCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlCurrentWeather).then(displayWeather);

  let apiUrlHourlyForecast = `${apiEndpointForecast}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlHourlyForecast).then(displayHourlyForecast);

  let apiUrlDailyForecast = `${apiEndpointForecast}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlDailyForecast).then(displayDailyForecast);
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

// TOP CITIES 

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

// Default city //
searchCity("Vienna");

/// CONVERT TEMPERATURES ///

// Convert to Fahrenheit //

function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = null;

/// Convert to Celsius //

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);
