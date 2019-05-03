// ARRAYS 

const boxes = document.querySelectorAll('.box');

// ES6 to make array from node list:
const boxesArray = Array.from(boxes);
boxesArray.forEach(current => current.style.backgroundColor = 'dodgerblue');

// ES6 for of loop (like for elem in array @Python)
for (const elem of boxesArray) {
    if (elem.className === 'box blue') {
        continue;
    }
    elem.textContent = 'I changed to blue';
}





// ES5
var ages = [12, 17, 8, 21, 14, 11];
var full = ages.map(function(current) {
    return current >= 18;
});
console.log(full);
console.log(full.indexOf(true));
console.log(ages[full.indexOf(true)]);

// ES6
const full6 = ages.findIndex(current => current >= 18);
console.log(full6);
console.log(ages.find(current => current >= 18));