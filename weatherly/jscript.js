$(function() {
    $("#submit").on("click", getWeather_Click);


});



function getWeather_Click() {
    var pcode = $('#zip').val()
    getCords('', '', pcode)
    console.log
}



function getCords_Complete(result) {
    var latitude = result.results[0].geometry.location.lat
    var longitude = result.results[0].geometry.location.lng
    var local = result.results[0].formatted_address

    function generateCard(data) {
        var weatherInfo = {
            time: new Date(data.currently.time * 1000),
            temp: Math.round(data.currently.temperature) + "&#176; F",
            clouds: (data.currently.summary),
            precip: ' Chance of precipitation  ' + Math.round(data.currently.precipProbability * 100) + '%',
            high: Math.round(data.daily.data[0].temperatureMax) + "  &#176; F",
            low: Math.round(data.daily.data[0].temperatureMin) + "  &#176; F"

        }
        console.log(weatherInfo)
        templateGen(weatherInfo)
    }



    function templateGen(weatherInfo) {
        var template = $('#templateDiv').html()
        template = template.replace('@@LOCAL@@', local)
        template = template.replace('@@TIME@@', 'Current Time' + weatherInfo.time.toLocaleString())
        template = template.replace('@@TEMP@@', weatherInfo.temp)
        template = template.replace('@@CLOUDS@@', weatherInfo.clouds)
        template = template.replace('@@MAX@@', weatherInfo.low)
        template = template.replace('@@MIN@@', weatherInfo.high)
        template = template.replace('@@PRECIP@@', weatherInfo.precip)

        post(template)
    }

    function post(template) {
        $('#card').append(template)

    }

    var darkSky = {
        url: "https://api.darksky.net/forecast/fbda44b20ab6e3da8fb2bc01102a50a7/" + latitude + "," + longitude,
        dataType: "jsonp",
        success: generateCard
    };
    $.ajax(darkSky);
    console.log

}



function getCords(city, state, zipCode) {
    var address = ''
    if (zipCode.length != 0) {
        address = zipCode.trim()
    } else if (city.length != 0 && state != 0) {
        address = city.trim() + ',' + state
    } else {
        return; // They didn't give anything valid, so exit
    }

    var googleUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&key=AIzaSyAQsMF6GQMAD_JlBLibE1ZprVVwxK0kfac'

    var request = {
        url: googleUrl,

        success: getCords_Complete

    }

    $.ajax(request)
}
