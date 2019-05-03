// LET and CONST

// ES5
var name5 = 'Jane Smith';
var age5 = 23;

name5 = 'Jane Miller';
console.log(name5);

// ES6
const name6 = 'Jane Smith';
let age6 = 23;

//name6 = 'Jane Miller'; // will throw error because it's a constant variable
console.log(name6);


// ES5 
function driversLicence5(passedTest) {
    if (passedTest) {
        var firstName = 'John';
        var yearOfBirth = 1990;
    }
    console.log(firstName + ' born in ' + yearOfBirth);
}

driversLicence5(true);

// ES6
function driversLicence6(passedTest) {
    if (passedTest) {
        let firstName = 'John';
        const yearOfBirth = 1990;
    }
 //   console.log(firstName + ' born in ' + yearOfBirth); //let and const variables are block scoped, this will throw an error
}

//driversLicence6(true);



// ES5
var i = 23;
for (var i = 0; i < 4; i++) {
    console.log(i);
}
console.log('i is ' +i);


// ES6
let j = 23; // let is block scoped so it will remain 23 no matter the for loop variable
for (let j = 0; j < 4; j++) {
    console.log(j);
}
console.log('j is ' +j);