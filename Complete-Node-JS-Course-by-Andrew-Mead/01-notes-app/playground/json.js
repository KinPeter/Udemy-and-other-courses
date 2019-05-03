// var obj = {
//     name: "Peter"
// };

// var stringObj = JSON.stringify(obj);

// var personString = '{"name" : "Peter", "age": 33}';

// var person = JSON.parse(personString);

// console.log(person);
// console.log(typeof person);

const fs = require('fs');

var originalNote = {
    title: 'Some title',
    body: 'Some body'
};

var originalNoteString = JSON.stringify(originalNote);

fs.writeFileSync('notes.json', originalNoteString);

var noteString = fs.readFileSync('notes.json');

var note = JSON.parse(noteString);

console.log(typeof note);
console.log(note.title);
