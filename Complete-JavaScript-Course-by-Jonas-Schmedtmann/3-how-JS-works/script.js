///////////////////////////////////////
// Lecture: Hoisting

// Functions
/*
// Function declaration:
calculateAge(1990);

function calculateAge(year) {
    console.log(2016 - year);
}

// Function expressions:
//retirement(1990);

var retirement = function(year) {
    console.log(60 - (2016 - year));
}


// Variables

console.log(age);  //undefined datatype but variable exists
var age = 23;
console.log(age);

function foo() {
    var age = 65; //this age variable is inside the function execution context only
    console.log(age);
}
foo();
console.log(age); //this age variable is from the global execution context

*/



///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword

//console.log(this);
/*
calculateAge(1985);

function calculateAge(year) {
    console.log(2019 - year);
    console.log(this);
}
*/

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calculateAge: function() {
        console.log(this);
        console.log(2019 - this.yearOfBirth);
        /*
        function innerFunction() {
            console.log(this);
        }
        innerFunction();*/
    }
}

john.calculateAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1984
}
mike.calculateAge = john.calculateAge; //method borrowing !!!

mike.calculateAge();



