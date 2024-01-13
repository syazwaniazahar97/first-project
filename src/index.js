function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");

  icon.innerHTML = ` <img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "d0467fbo9ta722bfa7472f01103930b8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function submitForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast(response) {
      console.log(response.data);

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index >0 && index<6) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <div>
              <img src="${
                day.condition.icon_url
              }" class="weather-forecast-icon" />
              </div>
              <div class="weather-forecast-temperatures"> 
                <div class="weather-forecast-temperature-max">
                  <strong>${Math.round(day.temperature.maximum)}°</strong>
                </div> 
                <div class="weather-forecast-temperature-min">
                ${Math.round(day.temperature.minimum)}°
              </div>
              </div>
            </div>
            `;}
  });

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(city) {
  let apiKey = "d0467fbo9ta722bfa7472f01103930b8";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    return days[date.getDay()];
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", submitForm);

searchCity("Paris");
