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

    //deleteMany - deletes all that match the query
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
    //     console.log(result.result);
    // });

    //deleteOne - deletes only the first doc that matches the query
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
    //     console.log(result.result);
    // });

    //findOneAndDelete - deletes the first doc matches the query AND get that doc back as result
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // })

    db.collection('Users').deleteMany({name: 'Peter'}).then((result) => {
        console.log(result.result);
    });
    db.collection('Users').findOneAndDelete({_id: new ObjectID("5c5febc8e74dbe022c2bdcff")}).then((result) => {
        console.log(result);
    })

//CLOSE the connection to the client (DB)
    //client.close();
});

