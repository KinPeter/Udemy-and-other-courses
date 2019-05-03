var person = {
    name: 'PEter'
};

person.age = 25;

//debug mode in terminal: >node inspect myfile.js
//in debug mode using "c" for continue, the debugger will stop at each line like this:
debugger; 

person.name = 'Mike';

console.log(person);