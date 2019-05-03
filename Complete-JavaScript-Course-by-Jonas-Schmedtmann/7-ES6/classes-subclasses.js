// CLASSES and SUBCLASSES

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

var Athlete5 = function(name, year, job, olympics, medals) {
    Person5.call(this, name, year, job);
    this.olympics = olympics;
    this.medals = medals;
}

Athlete5.prototype = Object.create(Person5.prototype);

var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
var john5 = new Person5('John', 1990, 'teacher');
//johnAthlete5.calcAge();

Athlete5.prototype.wonMedal = function() {
    this.medals++;
    console.log(this.medals);
}

//johnAthlete5.wonMedal();






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

class Athlete6 extends Person6 { /// subclass of Person6
    constructor (name, year, job, olympics, medals) {
        super(name, year, job);
        this.olympics = olympics;
        this.medals = medals;
    }
    
    wonMedal() {
        this.medals++;
        console.log(this.medals);
    }
}


const john6 = new Person6('John', 1990, 'teacher');
const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);
john6.calcAge();
johnAthlete6.calcAge();
johnAthlete6.wonMedal();


























