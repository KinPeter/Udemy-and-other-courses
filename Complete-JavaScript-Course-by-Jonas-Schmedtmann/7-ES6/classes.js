// CLASSES

// ES5
var Person5 = function(name, year, job) {
    this.name = name;
    this.year = year;
    this.job = job;
}
Person5.prototype.calcAge = function() {
    var age = new Date().getFullYear() - this.year;
    console.log(age);
}

var john5 = new Person5('John', 1990, 'teacher');


// ES6
class Person6 {
    constructor (name, year, job) {
        this.name = name;
        this.year = year;
        this.job = job;
    }
    
    calcAge() {
        var age = new Date().getFullYear() - this.year;
        console.log(age);
    }
}

const john6 = new Person6('John', 1990, 'teacher');

john6.calcAge();









