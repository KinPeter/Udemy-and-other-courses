var square = (x) => {
    var result = x * x;
    return result;
}

console.log(square(9));

var square2 = x => x * x;

console.log(square2(9));


var user = {
    name: 'Peter',
    sayHi: () => { //arrow function here
        console.log(`Hi. I'm ${this.name}`); //not working, as arrow functions do not bind "this"
    },
    sayHiAlt() { //regular function syntax here, so "this" is defined
        console.log(`Hi. I'm ${this.name}`);
    }
};

user.sayHi();
user.sayHiAlt();
