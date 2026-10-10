// Weatherly: look up a place and add a card with its current weather.
// Uses Open-Meteo's free geocoding and forecast APIs, which need no API key.

// WMO weather codes -> [description, icon name]
var WEATHER = {
    0: ["Clear", "clear"],
    1: ["Mainly clear", "partly-cloudy"],
    2: ["Partly cloudy", "partly-cloudy"],
    3: ["Overcast", "cloudy"],
    45: ["Fog", "fog"],
    48: ["Freezing fog", "fog"],
    51: ["Light drizzle", "rain"],
    53: ["Drizzle", "rain"],
    55: ["Heavy drizzle", "rain"],
    56: ["Freezing drizzle", "sleet"],
    57: ["Freezing drizzle", "sleet"],
    61: ["Light rain", "rain"],
    63: ["Rain", "rain"],
    65: ["Heavy rain", "rain"],
    66: ["Freezing rain", "sleet"],
    67: ["Freezing rain", "sleet"],
    71: ["Light snow", "snow"],
    73: ["Snow", "snow"],
    75: ["Heavy snow", "snow"],
    77: ["Snow grains", "snow"],
    80: ["Rain showers", "rain"],
    81: ["Rain showers", "rain"],
    82: ["Violent rain showers", "rain"],
    85: ["Snow showers", "snow"],
    86: ["Heavy snow showers", "snow"],
    95: ["Thunderstorm", "rain"],
    96: ["Thunderstorm with hail", "sleet"],
    99: ["Thunderstorm with hail", "sleet"]
};

function iconFor(name, isDay) {
    if (name === "clear" || name === "partly-cloudy") name += isDay ? "-day" : "-night";
    return "icons/SVG/" + name + ".svg";
}

function getJSON(url) {
    return fetch(url).then(function (response) {
        if (!response.ok) throw new Error("Request failed (" + response.status + ")");
        return response.json();
    });
}

function findPlace(text) {
    var url = "https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + encodeURIComponent(text);
    return getJSON(url).then(function (data) {
        if (!data.results || !data.results.length) throw new Error("No place found for \"" + text + "\".");
        return data.results[0];
    });
}

function getWeather(place) {
    var url = "https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude +
        "&longitude=" + place.longitude +
        "&current=temperature_2m,weather_code,is_day" +
        "&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max" +
        "&temperature_unit=fahrenheit&timezone=auto&forecast_days=1";
    return getJSON(url);
}

function placeName(place) {
    return [place.name, place.admin1, place.country_code].filter(Boolean).join(", ");
}

function addCard(place, data) {
    var card = document.getElementById("card-template").content.cloneNode(true);
    var weather = WEATHER[data.current.weather_code] || ["Unknown", "cloudy"];

    var root = card.querySelector(".card");

    card.querySelector(".place").textContent = placeName(place);
    card.querySelector(".icon").src = iconFor(weather[1], data.current.is_day);
    card.querySelector(".summary").textContent = weather[0];
    card.querySelector(".temp").textContent = Math.round(data.current.temperature_2m) + "°F";
    card.querySelector(".high").textContent = Math.round(data.daily.temperature_2m_max[0]) + "°";
    card.querySelector(".low").textContent = Math.round(data.daily.temperature_2m_min[0]) + "°";
    card.querySelector(".precip").textContent = data.daily.precipitation_probability_max[0] + "%";
    card.querySelector(".time").textContent = "Local time " + data.current.time.replace("T", " ");
    card.querySelector(".close-card").addEventListener("click", function () {
        root.remove();
    });

    document.getElementById("cards").appendChild(root);
}

document.getElementById("search").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("place");
    var message = document.getElementById("message");
    message.textContent = "Loading...";

    findPlace(input.value.trim())
        .then(function (place) {
            return getWeather(place).then(function (data) { addCard(place, data); });
        })
        .then(function () {
            message.textContent = "";
            input.value = "";
        })
        .catch(function (err) { message.textContent = err.message; });
});
