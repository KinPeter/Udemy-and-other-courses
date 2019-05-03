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

    //update a document:
    // db.collection('Todos').findOneAndUpdate({       //first argument: how to find it
    //     _id: new ObjectID("5c5ff40cc5e8a54eca5138d9")
    // }, {    //second argument: what to do and what value
    //     $set: {    //$set is the method to update a value
    //         completed: true
    //     }
    // }, {    //third argument: options, this one to get back the updated result:
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({      
        _id: new ObjectID("5c5fe8c441c60b0fa09e4d96")
    }, {    
        $set: {   
            name: "Peter"
        },
        $inc: {
            age: 1
        }
    }, {    
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

//CLOSE the connection to the client (DB)
    //client.close();
});

