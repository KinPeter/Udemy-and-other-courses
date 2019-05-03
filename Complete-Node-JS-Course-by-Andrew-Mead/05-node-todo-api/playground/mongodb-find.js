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

    //get ALL documents from Todos collection
    //!!! .find() returns a MongoDB Cursor object, we need to convert it .toArray()
    //!!! .toArray() returns a promise so we need .then() to fetch the data

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });

    //get documents from Todos collection WHERE completed is false
    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });

    //get documents by ObjectID
    // db.collection('Todos').find({
    //     _id: new ObjectID('5c5fe733854765189897ac29')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 4));
    // }, (err) => {
    //     console.log('Unable to fetch Todos', err);
    // });

    //count the documents in Todos collection
    db.collection('Todos').find().count().then((count) => {
        console.log('Todos');
        console.log(`Todos count: ${count}`);
        
    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });

//CLOSE the connection to the client (DB)
    client.close();
});