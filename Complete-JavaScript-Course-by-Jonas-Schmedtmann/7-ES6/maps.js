// MAPS

const question = new Map();

question.set('question', 'What is the official name of the latest JS version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'Correct Answer!');
question.set(false, 'Wrong, please try again.');

console.log(question.get('question'));

console.log(question.size);

if (question.has(4)) {
    //question.delete(4);
    console.log('Answer 4 is here')
}

//question.clear();

question.forEach((value, key) => console.log(key, value));

for (let [key, value] of question.entries()) {
    if (typeof(key) === 'number') {
        console.log(key, value);
    }
}

const ans = parseInt(prompt('Write the correct answer'));

let result = question.get( ans === question.get('correct') ); // because the key is a boolean, enough to get true or false's value from the map

console.log(result);










