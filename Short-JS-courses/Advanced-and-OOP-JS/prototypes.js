function Flight(airline, flightNumber) {
    this.airline = airline;
    this.flightNumber = flightNumber;
};

//Flight.prototype.display = function() {
//    console.log(this.airline, this.flightNumber);
//};

Flight.prototype = {
    constructor: Flight, //MUST set the original constructor!!!
    display: function() {
        console.log(this.airline, this.flightNumber);
    },
    STD: 1220,
    STA: 1440,
    displayTimes: function() {
        console.log(this.flightNumber, this.STD, this.STA);
    }
}


var flight1 = new Flight("American Airlines", "AA123");
var flight2 = new Flight("SouthWest", "SW465");

console.log(flight1 instanceof Flight);
console.log(flight1.constructor === Flight);

flight2.STD = 1350;
flight2.STA = 2000;

flight1.display();
flight2.display();
flight1.displayTimes();
flight2.displayTimes();


/****************************************************/
//Adding methods to built-in prototypes, like String:
String.prototype.display = function() {
    console.log(this);
};

"Peter".display();