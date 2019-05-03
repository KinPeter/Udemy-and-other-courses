// DESTRUCTURING

// ES5
var john = ['John', 26];
var name = john[0];
var age = john[1];


// ES6
const [name6, age6] = ['John', 26];
console.log(name6, age6);

const obj = {
    firstName: 'John',
    lastName: 'Smith'
}

const {firstName, lastName} = obj;
console.log(firstName, lastName);


const {firstName: a, lastName: b} = obj;
console.log(a, b);


// get more values from a function
function calcAgeRetirement (year) {
    const age = new Date().getFullYear() - year;
    return [age, 65-age];
}

const [age2, ret2] = calcAgeRetirement(1990);
console.log(age2);
console.log(ret2);





