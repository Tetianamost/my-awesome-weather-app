function formatDate(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[now.getDay()];
  let amPM = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
  return `${currentDay} ${amPM}`;
}
function showForecast() {
  let forecast = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
              <div class="weather-forecast-date">${day}</div>
                <img  src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="42"/>
                 <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max">19°</span><span class="weather-forecast-temp-min"> 24°</span>
  </div>
  </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#country").innerHTML = response.data.sys.country;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  celciusTemp = response.data.main.temp;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
}
function locateMe(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "b20f16c775f1a540c9b26a281882d55c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function callLocateMe(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateMe);
}
function searchCity(city) {
  let apiKey = "b20f16c775f1a540c9b26a281882d55c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function searchLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
function convertToCelcius(event) {
  event.preventDefault();
  let celcius = document.querySelector("#current-temp");
  cLink.classList.add("active");
  fLink.classList.remove("active");
  let temp = celcius.innerHTML;
  temp = Number(temp);
  celcius.innerHTML = Math.round(celciusTemp);
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temp");
  cLink.classList.remove("active");
  fLink.classList.add("active");
  let temp = fahrenheit.innerHTML;
  temp = Number(temp);
  fahrenheit.innerHTML = Math.round((celciusTemp * 9) / 5 + 32);
}

let celciusTemp = null;

let searchCityButton = document.querySelector("#search-city");
searchCityButton.addEventListener("submit", searchLocation);

let myCityButton = document.querySelector("#current-city");
myCityButton.addEventListener("click", callLocateMe);
let currentDate = document.querySelector("#current-date");
let now = new Date();
currentDate.innerHTML = formatDate(now);
let form = document.querySelector("#search-form", "#search");
form.addEventListener("submit", searchLocation);

let cLink = document.querySelector("#c-temp");
cLink.addEventListener("click", convertToCelcius);

let fLink = document.querySelector("#f-temp");
fLink.addEventListener("click", convertToFahrenheit);

showForecast();

searchCity("Denver");
