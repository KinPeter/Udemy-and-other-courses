const request = require('request'); //NPM request package
const apiKey = 'AIzaSyCAZh0jwHIeOj4wzP825G14zryzeulHFYM';

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    
    request({
        //options
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`,
        json: true
    
    }, (error, response, body) => {
        //callback function
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address');
        } else if (body.status === 'OK') {
            callback(undefined, {
                adr: body.results[0].formatted_address,
                lat: body.results[0].geometry.location.lat,
                lng: body.results[0].geometry.location.lng
            });
        };
    });
}

var printAddress = (location) => {
    console.log(`Address:   ${location.adr}`);
    console.log(`Latitude:  ${location.lat}`);
    console.log(`Longitude: ${location.lng}`);
    console.log(`-----`);
}

module.exports = {
    geocodeAddress,
    printAddress
}