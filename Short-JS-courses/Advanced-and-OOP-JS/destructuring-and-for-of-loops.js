/************************************************/
//OBJECT DESTRUCTURING
let student = {
    firstName: "Peter",
    lastName: "Kin",
    score: 100
};

//to same variable names as the properties
let { firstName, lastName, score } = student;

console.log(firstName);
console.log(lastName);
console.log(score);

//to different variable names
let { firstName : fName, lastName : lName, score : s } = student;

console.log(fName);
console.log(lName);
console.log(s);

/************************************************/
//ARRAY DESTRUCTURING
const courses = ["Angular", "React", "Node"];

let [course1, course2, course3] = courses;
console.log(course1);
console.log(course2);
console.log(course3);

/************************************************/
//FOR-OF LOOP
let names = ["John", "Bob", "Mike", "Tom"];

for (let value of names) {
    console.log(value);
}
