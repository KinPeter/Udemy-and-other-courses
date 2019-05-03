//import MongoClient and ObjectID method from MongoDB Native library (NPM)
const {MongoClient, ObjectID} = require('mongodb');

//connect to the server
MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
    if (err) {
        return console.log('Unable to connect to database server.');
    } 
//IF NO error, everything we do comes here:
    console.log('Connected to MongoDB server.');
    //create a 'db' variable to access the client for 'TodoApp' database
    const db = client.db('TodoApp');

    //Insert a document (record) to the 'Todos' collection (table):
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) { return console.log('Unable to insert todo', err)};
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    // });

    //Insert a document (record) to the 'Users' collection (table):
    // db.collection('Users').insertOne({
    //     name: 'Peter',
    //     age: 33,
    //     location: 'Budapest'
    // }, (err, result) => {
    //     if (err) { return console.log('Unable to insert todo', err)};
    //     console.log(JSON.stringify(result.ops, undefined, 4));
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

//CLOSE the connection to the client (DB)
    client.close();
});