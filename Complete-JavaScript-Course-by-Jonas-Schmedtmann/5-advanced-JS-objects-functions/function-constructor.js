// Function constructor:
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

// adding a method to the constructor's prototype:
Person.prototype.calculateAge = function() {
    console.log(2019 - this.yearOfBirth);
};

// instanciation:
var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1969, 'designer');
var mark = new Person('Mark', 1948, 'retired');

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

// adding a property to the constructor's prototype:
Person.prototype.lastName = 'Smith'; // this will be the same for all instances

console.log(john.name + john.lastName);
console.log(jane.name + jane.lastName);
console.log(mark.name + mark.lastName);