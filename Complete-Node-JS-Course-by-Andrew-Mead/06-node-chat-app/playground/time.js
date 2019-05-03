//1970.01.01. 00:00:00 UTC
//timestamps are in miliseconds relative to this time
var moment = require('moment');

// var date = moment(); //current point in time

// console.log(date.format('MMM Do, YYYY'));

// date.add(1, 'year').subtract(9, 'month');
// console.log(date.format('MMM Do, YYYY'));

var createdAt = 12345678;
var date = moment(createdAt);
console.log(date);
