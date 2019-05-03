const {ObjectID} = require('mongodb');

var {mongoose} = require('./../server/db/mongoose');
var {Todo} = require('./../server/models/todo');
var {User} = require('./../server/models/user');

var id = '5c604247e8792829ac4af127';

//.remove({}) remove every document that matches


//.findOneAndRemove() remove the first doc that matches and returns the document


//.findByIdAndRemove() obviously :) -and returns the document
Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return console.log('Error: ID not found.');
        }
        console.log('Removed by ID:', todo);
    }).catch((e) => console.log(e));



//find() gets all matching into an array, if no found then empty array will be returned
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos:', todos);
// });

//findOne() gets the first matching, if no found then 'null' will be returned
// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo:', todo);
// });

//validate the objectID
// if (!ObjectID.isValid(id)) {
//     console.log('Error: ID is not valid.')
// }

// //findById() gets doc by ID
// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Error: ID not found.');
//     }
//     console.log('Todo by ID:', todo);
// }).catch((e) => console.log(e));


// var userId = '5c602795a77b6621ecebbbd8'
// User.findById(userId).then((user) => {
//     if (!user) {
//         return console.log('Error: User not found.');
//     }
//     console.log('User by ID:', user);
// }).catch((e) => console.log(e));