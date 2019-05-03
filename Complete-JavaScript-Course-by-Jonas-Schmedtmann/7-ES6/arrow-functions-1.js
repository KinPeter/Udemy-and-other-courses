// ARROW FUNCTIONS

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function(elem) {
    return 2019 - elem;
});
console.log(ages5);

// ES6 - arrow function
let ages6 = years.map(elem => 2019 - elem);
console.log(ages6);

ages6 = years.map((elem, index) => `Age element ${index +1}: ${2019 - elem}.`);
console.log(ages6);

ages6 = years.map((elem, index) => {
    const now = new Date().getFullYear();
    const age = now - elem;
    return `Age element ${index +1}: ${age}.`;
});
console.log(ages6);