// REST PARAMETERS

/*// ES5
function isFullAge5() {
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments);  
    argsArr.forEach(function(current) {
        console.log((2019 - current) >= 18);
    })   
}
//isFullAge5(1990, 2005, 1965);
//isFullAge5(1990, 2005, 1965, 2016, 1987);


// ES6 - rest parameter '...varName'
function isFullAge6(...years) {
    //console.log(years);
    years.forEach(current => console.log((2019 - current) >= 18));
}
//isFullAge6(1990, 2005, 1965);
//isFullAge6(1990, 2005, 1965, 2016, 1987);
*/


// ES5
function isFullAge5(limit) {
    //console.log(arguments);
    var argsArr = Array.prototype.slice.call(arguments, 1);  
    argsArr.forEach(function(current) {
        console.log((2019 - current) >= limit);
    })   
}
isFullAge5(18, 1990, 2005, 1965);
//isFullAge5(1990, 2005, 1965, 2016, 1987);


// ES6 - rest parameter '...varName'
function isFullAge6(limit, ...years) {
    //console.log(years);
    years.forEach(current => console.log((2019 - current) >= limit));
}
isFullAge6(18, 1990, 2005, 1965);
//isFullAge6(1990, 2005, 1965, 2016, 1987);