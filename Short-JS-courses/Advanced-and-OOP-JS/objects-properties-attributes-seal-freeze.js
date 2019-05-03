var course1 = {
    name: "JS Fundamentals"
};

course1.description = "Master JS Project Development";

//check if there is property "description" on the object
console.log("description" in course1);

//check if "toString" method is in (inherited) on the object
console.log("toString" in course1); // true as it is inherited
console.log(course1.hasOwnProperty("toString")); // false as it is inherited

//deleting the property:
//delete course1.description;
//console.log("description" in course1);

//retrieve each property and value
for (var property in course1) {
    console.log(property);
    console.log(course1[property]);
}

//retrieve only the keys
var allProperties = Object.keys(course1);
allProperties.forEach(el => console.log(el));

/**************************************************/
// ACCESSOR and MUTATOR (GETTER and SETTER) methods
var object = {
    _name: "John",
    //this will happen when we retrieve the name:
    get name() {
        return "He is " + this._name;
    },
    //this will happen when we set a new name:
    set name(value) {
        this._name = "changed to " + value;
    }
};

console.log(object.name);

object.name = "Peter";
console.log(object.name);

/**************************************************/
// OBJECT PROPERTY ATTRIBUTES

var person = {
    name: "John"
};
 
Object.defineProperty(person, "name", {
    enumerable: false,   //default: true
    configurable: false  //default: true
});

console.log(person.propertyIsEnumerable("name"));

delete person.name; // delete fails as it's non-configurable now
console.log("name" in person); // true as it's still there
console.log(person.name); // we can access it

person.name = "Peter";    // we can still change the value of it
console.log(person.name); 

//define a new property with writable: false
Object.defineProperty(person, "age", {
    value: 33,
    enumerable: true,
    configurable: true,
    writable: false
});
console.log(person.age);

//we cannot overwrite or change the value!
person.age = 35; // fails!
console.log(person.age); // remain the same

//get the property attributes of an object:
var descriptor = [
    Object.getOwnPropertyDescriptor(person, "name"),
    Object.getOwnPropertyDescriptor(person, "age")
];
console.log(descriptor);



/**************************************************/
// OBJECT ATTRIBUTES : Extensible, seal it, freeze it
var product = {
    name: "Iphone"
}

console.log("extensible: " + Object.isExtensible(product));

//Prevent the addition of new properties or methods:
Object.preventExtensions(product);

product.price = 1500; //fails!
console.log("price" in product); //false
console.log(product.price); //undefined
console.log("extensible: " + Object.isExtensible(product));

// SEAL an object: non-extensible, non-configurable
console.log("sealed: " + Object.isSealed(product));
Object.seal(product);
console.log("sealed: " + Object.isSealed(product));

// FREEZE an object: non-extensible, non-configurable, non-writable
console.log("frozen: " + Object.isFrozen(product));
Object.freeze(product);
console.log("frozen: " + Object.isFrozen(product));
// NOW EVERYTHING IS READ ONLY!





















