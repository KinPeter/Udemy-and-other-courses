const fs = require('fs'); //importing FileSystem module
const _ = require('lodash'); //importing Lodash library (NPM)
const yargs = require('yargs');

const notes = require('./notes'); //importing our own file notes.js

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't' //shortcut: '-t' for '--title'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b' //shortcut: '-b' for '--body'
};

const argv = yargs
    .command('add', 'Add a new note', {title: titleOptions, body: bodyOptions})
    .command('list', 'List all notes')
    .command('read', 'Read a note', {title: titleOptions})
    .command('remove', 'Remove a note', {title: titleOptions})
    .help()
    .argv;
var command = argv._[0];

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log(`Note has been added.`);
        notes.printNote(note);
    } else {
        console.log('That title is already used. Please try an other one.');
    }

} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(element => notes.printNote(element));

} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log(`The requested note:`);
        notes.printNote(note);
    } else {
        console.log('Note not found. :(');
    }

} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? `Note with title ${argv.title} was removed.` : 'Note not found.';
    console.log(message);

} else {
    console.log('Command is not recognized :(');
}
