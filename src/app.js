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

function showTemp(response) {
  console.log(response);
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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}
function callLocateMe(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(locateMe);
}
function searchCity(city) {
  let apiKey = "b20f16c775f1a540c9b26a281882d55c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
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
  let temp = celcius.innerHTML;
  temp = Number(temp);
  celcius.innerHTML = "23";
}
function convertToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector("#current-temp");
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

searchCity("Denver");
