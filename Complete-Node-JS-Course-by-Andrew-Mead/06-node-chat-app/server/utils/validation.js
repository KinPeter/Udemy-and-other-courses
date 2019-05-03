//function to validate the Name and Room name given on join page
var isRealString = (string) => {
    return typeof string === 'string' && string.trim().length > 0;
    //returns true if the string is really a string and if it's not just spaces
};

module.exports = {isRealString};