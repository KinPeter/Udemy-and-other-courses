/*
Arrow function              19
Default parameter values    34
Rest operator               46
Spread operator             57
Property shorthand          86
Computed property names     100
Method properties           114
Export-import modules       127
Classes                     155
Destructuring               211
Object.assign()             241
String.repeat()             255
Array.find() / findIndex()  265
Math.trunc()                275
Set                         281
*/
/*****************************************************************************
 * Arrow function with one argument:
 */
const arr = [1, 2, 3, 4]
const byTwo1 = arr.map((number) => {
    return number*2
})
// same as:
const byTwo2 = arr.map(number => number*2)

console.log(byTwo2)

// with arrow functions "this" is ALWAYS bound to the parent's "this"


/*****************************************************************************
* Default parameter values:
*/
function buy(item = 'eggs', amount = 1) {
    return {
        item: item,
        amount: amount
    }
}
console.log(buy())


/*****************************************************************************
* Rest operator:
*/
// way to get the arguments not listed in the declaration as an array
function printArgs(age, siblings, ...otherArgsArray) {
    console.log(age)
    console.log(siblings)
    console.log(otherArgsArray)
}
printArgs(20, 1, 'hello', 'another', 123)

/*****************************************************************************
* Spread operator:
*/
// spreads the arguments into an array or object
function spreadInArray(...values) {
    array = [...values]
    console.log(array)
}
spreadInArray(1, 2, 'hi', true, 3.67)

// we can put them inside other arrays
const message = ['hello world', 'ES6 is cool', 'so what now?']
const messages = ['START: ', ...message, ' END!']
console.log(messages)

// or pass them as arguments to a function
const numbers = [1, 10, 5, 4]
function addThem(a, b, c, d) {
    console.log(a+b+c+d)
}
addThem(...numbers)

// easy way to copy an array (new copy, other reference)
const origArr = [1, 2, 3, 4]
const copyArr = [...origArr]
console.log(origArr)
console.log(copyArr)


/*****************************************************************************
* Property shorthand:
*/
// if the variable and the object property has the same identifier (name):
var firstname = 'bob'
var lastname = 'harvey'
var age = 20
var person = {
    firstname, // same as firstname: firstname
    lastname,  // same as lastname: lastname
    age        // same as age: age
}
console.log(person)

/*****************************************************************************
* Computed property names:
*/
var key = 'lastname'
function getKey() {
    return 'age'
}
var person = {
    firstname: 'bob',
    [key]: 'harvey',    // uses the key variable as property name
    [getKey()]: 20      // also works with functions or other expressions
}
console.log(person)

/*****************************************************************************
* Method properties:
*/
var person = {
    name: 'Peter',
    age: 20,
    increaseAge () {    // just simply add a function as a method for that object
        this.age++
    }
}
person.increaseAge()
console.log(person)

/*****************************************************************************
* Export-import modules:
*/
// * Node does not support it at this point
// in one js file (module) called let's say 'add.js' :
// export function add(a, b) {
//     return a+b
// }
// export function subtract(a, b) {
//     return a-b
// }
// export const obj = {
//     prop1: 'value',
//     prop2: 'value'
// }

// then in the main js file :
// import { add } from './add'  //or:
// import { add as myAddFunction } from './add'  //or:
// import { add as myAdd, subtract as mySubtract } from './add'
// and then just use this function
// myAdd(10, 2)

// or we can import everything and use as a 'class name':
// import * as myTools from './add'
// myTools.add(10, 2)
// console.log(myTools.obj.prop1)

/*****************************************************************************
* Classes
*/
// class declaration and child class (inheritence)
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    jump() {    // simply add a prototype method
        console.log('jump')
    }
}

const bob = new Person('bob', 20)
console.log(bob)
bob.jump()

class Employee extends Person {     // Employee class is a child class to Person
    constructor(name, age, years) {
        super(name, age)            // specify the fields to inherit from super (parent) class
        this.years = years
    }
    jumpHigher() {
        super.jump()                // calling the parent's method first
        console.log('jump higher!')
    }
}

const mike = new Employee('Mike', 20, 2)
console.log(mike)
mike.jump() // Employee inherits the parents methods
mike.jumpHigher() 

// custom getter and setter
class Car {
    constructor(make, model) {
        this._make = make
        this._model = model
    }
    get make() {            // simple getter
        return this._make
    }
    get model() {           // custom getter with extra logic
        return this._model + ' is a ' + this._make
    }
    set make(make) {       // simple setter
        this._make = make
    }
}
const car = new Car('Porsche', '911')
console.log(car.make)
console.log(car.model)
car.make = 'Lada'
console.log(car)

/*****************************************************************************
* Destructuring
*/
// array destructuring
const numbers1 = [1, 2, 3, 4]
const [a, b, c, d] = numbers1
console.log(a, b, c, d)
// if we don't want all elements:
const numbers2 = [1, 2, 3, 4]
const [, , e, f] = numbers2
console.log(e, f)
// use it from a function return value
function getData() {
    return [true, 12, 3, 5, 1]
}
const [isOn, height, ...rest] = getData()   // we only need the first too in variables
console.log(isOn, height)                   // log them
console.log(rest)                           // we still get the rest of them

// object destructuring
// works same as arrays
const someone = {
    name: 'bob',
    age: 20,
    uselessProp: 1234
}
const {name : someName, age : someAge } = someone
console.log(someName)
console.log(someAge)

/*****************************************************************************
* Object.assign()
*/
// gives an object all the properties of an other object
const objX = {
    name: 'Bob'
}
const objY = {
    home: 'Florida',
    hasADog: true
}
Object.assign(objX, objY)
console.log(objX)

/*****************************************************************************
* String.repeat()
*/
// ES5:
const stars5 = Array(10).fill('*').join('')
console.log(stars5)
// ES6:
const stars6 = '*'.repeat(10)
console.log(stars6)

/*****************************************************************************
* Array.find() / findIndex()
*/
// returns the first element / it's index that matches the criteria
const array2 = [1, 20, 10, 5]
const result1 = array2.find(number => number > 10)
const result2 = array2.findIndex(number => number > 10)
console.log(result1)
console.log(result2)

/*****************************************************************************
* Math.trunc()
*/
// Math.trunc() - truncates a floating point number
console.log(Math.trunc(32.12))

/*****************************************************************************
* Set
*/
// set is similar to array but allows no duplicates and has different methods
const arrayWithDuplicates = [1, 2, 2, 3, 4, 5, 3, 1]
const set = new Set(arrayWithDuplicates) // passing it to set it removes duplicates
console.log(set)
set.add(1)      // can't add a number that is already there
console.log(set)
set.add(10)
console.log(set)
