var moment = require('moment');

//functions to generate the messages as an object with the required parameters
var generateMessage = (from, text) => {
    return {
        from,
        text,
        sentAt: moment().valueOf()
    };
};

var generateLocationMessage = (from, lat, lng) => {
    //https://www.google.com/maps?q=47.5115717,19.067491
    return {
        from,
        url: `https://www.google.com/maps?q=${lat},${lng}`,
        sentAt: moment().valueOf()
    };
};

module.exports = {
    generateMessage,
    generateLocationMessage
};