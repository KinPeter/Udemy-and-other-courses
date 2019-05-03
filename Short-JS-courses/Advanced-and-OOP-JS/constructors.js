function Flight(airline, flightNumber) {
    this.airline = airline;
    this.flightNumber = flightNumber;
    this.display = function(){
        console.log(this.airline, this.flightNumber);
    };
};

var flight1 = new Flight("American Airlines", "AA123");
var flight2 = new Flight("SouthWest", "SW465");

console.log(flight1 instanceof Flight);
console.log(flight1.constructor === Flight);

flight1.display();
flight2.display();




function Laptop(manufacturer, memory, capacity) {
    this.manufacturer = manufacturer;
    this.memory = memory;
    this.capacity = capacity;
    this.display = function(){
        console.log(this.manufacturer, this.memory, this.capacity);
    };
};

var laptop1 = new Laptop("ASUS", "8GB", "500GB");
var laptop2 = new Laptop("Dell", "16GB", "1TB");

laptop1.display();
laptop2.display();


