// Maply: look up a place and add a card with a map centred on it.
// Place search uses Open-Meteo's free geocoding API; maps are OpenStreetMap tiles via Leaflet. No API keys.

function findPlace(text) {
    var url = "https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + encodeURIComponent(text);
    return fetch(url)
        .then(function (response) {
            if (!response.ok) throw new Error("Request failed (" + response.status + ")");
            return response.json();
        })
        .then(function (data) {
            if (!data.results || !data.results.length) throw new Error("No place found for \"" + text + "\".");
            return data.results[0];
        });
}

function addCard(place) {
    var card = document.getElementById("card-template").content.cloneNode(true);
    var name = [place.name, place.admin1, place.country].filter(Boolean).join(", ");
    var column = card.firstElementChild;

    card.querySelector(".place").textContent = name;
    card.querySelector(".close-card").addEventListener("click", function () {
        column.remove();
    });
    document.getElementById("cards").appendChild(card);

    // Leaflet needs the element on the page before it can draw the map.
    var map = L.map(column.querySelector(".map")).setView([place.latitude, place.longitude], 10);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    L.marker([place.latitude, place.longitude]).addTo(map).bindPopup(name);
}

document.getElementById("search").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("place");
    var message = document.getElementById("message");
    message.textContent = "Loading...";

    findPlace(input.value.trim())
        .then(function (place) {
            addCard(place);
            message.textContent = "";
            input.value = "";
        })
        .catch(function (err) { message.textContent = err.message; });
});
