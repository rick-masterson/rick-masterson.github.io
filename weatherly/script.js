function getCords_Complete(result) {

    var latitude = result.results[0].geometry.location.lat;

    var longitude = result.results[0].geometry.location.lng;

    var location = result.results[0].formatted_address;


    var apiKey = 'fbda44b20ab6e3da8fb2bc01102a50a7';

    var url = 'https://api.forecast.io/forecast/';

    var data;





    $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {


        current = data.currently.summary;
        temp = parseInt(data.currently.temperature) + "&#176; F";
        precipitation = parseInt(data.daily.data["0"].precipProbability * 100) + "%";
        mintemp = parseInt(data.daily.data[0].temperatureMin) + "&#176; F";
        maxtemp = parseInt(data.daily.data[0].temperatureMax) + "&#176; F";
        maxWeek1 = parseInt(data.daily.data[1].temperatureMax) + "&#176;";
        maxWeek2 = parseInt(data.daily.data[2].temperatureMax) + "&#176;";
        maxWeek3 = parseInt(data.daily.data[3].temperatureMax) + "&#176;";
        maxWeek4 = parseInt(data.daily.data[4].temperatureMax) + "&#176;";
        maxWeek5 = parseInt(data.daily.data[5].temperatureMax) + "&#176;";
        maxWeek6 = parseInt(data.daily.data[6].temperatureMax) + "&#176;";

        console.log(data.currently.summary);
        icon = data.currently.icon;


        $('#weather').append(
            '<h2><center>' +
            location + '</center></h2> <hr /><BR><BR><BR><BR><BR><BR>' + '<div class="row">' + '<font size="45"><center>' + temp + "</font></center><br><BR><BR><hr />" + '<h3><center>      High:     ' + maxtemp + '      Low:    ' + mintemp + '</h3></center><br><br><hr />' + '<center><h3>Chance of Precipitation:    ' + precipitation + '</h3></center><br><hr />'
        )

        console.log(data)


    });

}

function getCords(city, state, postalCode) {



    var address = "";

    if (postalCode.length != 0) {

        address = postalCode.trim();

    } else if (city.length != 0 && state != 0) {

        address = city.trim() + ", " + state;

    } else {

        return;

    }

    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAQsMF6GQMAD_JlBLibE1ZprVVwxK0kfac";

    var request = {

        url: googleUrl,

        success: getCords_Complete

    };

    $.ajax(request);

}

function getWeather_Click() {

    var pcode = $("#postalCode").val();

    getCords("", "", pcode);

}



$(function() {

    $("#getWeather").on("click", getWeather_Click)

});