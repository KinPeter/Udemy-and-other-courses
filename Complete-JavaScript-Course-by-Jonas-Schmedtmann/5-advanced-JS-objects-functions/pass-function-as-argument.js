// Passing function as argument

var years = [1990, 1965, 1937, 2005, 1998];

// Generic main function to loop through arrays -- 'fn' argument is the callback function
function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

// Callback functions that we can pass to the main function
function calculateAge(elem) {
    return 2019 - elem;
}

function isFullAge(elem) {
    return elem >= 18;
}

function maxHeartRate(elem) {
    if (elem >= 18 && elem <= 81) {
        return Math.round(206.9 - (0.67 * elem));
    } else {
        return -1 ;
    }
}

// Now we can pass the array and the callback function that we want to use:
var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(rates);