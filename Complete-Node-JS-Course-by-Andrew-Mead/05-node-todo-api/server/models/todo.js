var mongoose = require('mongoose');

//create a model for Todo collection specifing the fields and their options
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true, //removes whitespaces from beginning and end
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

//ADDING NEW DOCUMENT
//create a new variable with an object for the new document
// var newTodo = new Todo({
//     text: 'Feed the cat'
// });
// //save the variable to the database and use promise.then() to log it
// newTodo.save().then((doc) => {
//     console.log('Saved todo: ', doc);
// }, (err) => {
//     console.log('Unable to save todo', err);
// });

module.exports = {
    Todo
}