function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature =response.data.temperature.current;
    temperatureElement.innerHTML = Math.round(temperature);
    let cityElement = document.querySelector("#city");
    
    cityElement.innerHTML=response.data.city;
}

function searchCity(city) {
    let apiKey = "d0467fbo9ta722bfa7472f01103930b8";
    let apiUrl =
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
    }

function submitForm(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",submitForm);

searchCity("Paris");