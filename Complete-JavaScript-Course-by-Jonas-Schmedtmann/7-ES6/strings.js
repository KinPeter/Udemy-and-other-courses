// STRINGS 

let firstName = 'John';
let lastName = 'Smith';
const yearOfBirth = 1990;

function calculateAge(year) {
    return 2019 - year;
}

// ES5
console.log('This is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + ', so he is ' + calculateAge(yearOfBirth) + ' years old.');

// ES6 - template literals
console.log(`This is ${firstName} ${lastName}. He was born in ${yearOfBirth}, so he is ${calculateAge(yearOfBirth)} years old.`);


const n = `${firstName} ${lastName}`;
console.log( n.startsWith('J') ); //true or false
console.log( n.endsWith('hn') ); //true or false
console.log( n.includes(' ') ); //true or false

console.log(firstName.repeat(5));