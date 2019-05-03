const request = require('request'); //NPM request package
const weatherAPIKey = '8209e55696776d2d1f564219b9e6b177';

var fetchWeather = (location, callback) => {

    request({
        //options
        url: `https://api.darksky.net/forecast/${weatherAPIKey}/${location.lat},${location.lng}`,
        json: true

    }, (error, response, body) => {
        //callback function
        if (error) {
            callback('Unable to connect to Weather servers.');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather.');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                summary: body.currently.summary,
                temp: body.currently.temperature,
                windSpeed: body.currently.windSpeed,
                windBearing: body.currently.windBearing
            });
        };
    });
}

var FtoC = (f) => {
    return (f - 32) * 5/9;
}

var printWeather = (weather) => {
    console.log(`The weather is ${weather.summary}.`);
    console.log(`The temperature is ${Math.round(FtoC(weather.temp))} degrees Celsius with a wind of ${Math.round(weather.windSpeed)} m/s from ${360-weather.windBearing} degrees.`);
    console.log('-----');
}
module.exports = {
    fetchWeather,
    printWeather
}