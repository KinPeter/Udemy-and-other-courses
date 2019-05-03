const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for.',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


var encodedAddress = encodeURIComponent(argv.address);
const googleAPIKey = 'AIzaSyCAZh0jwHIeOj4wzP825G14zryzeulHFYM';
const weatherAPIKey = '8209e55696776d2d1f564219b9e6b177';
var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${googleAPIKey}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.')
    }
    console.log(response.data.results[0].formatted_address);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/${weatherAPIKey}/${lat},${lng}`;
   
    return axios.get(weatherUrl);
//returning a new axios request so it gets a new "then" method to fetch and show the weather
}).then((response) => {
    var temp = response.data.currently.temperature;
    var aTemp = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temp}. It feels like ${aTemp}.`);

}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(error.message);
    }
});