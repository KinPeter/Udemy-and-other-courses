var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var _ = require('lodash');
var jwt = require('jsonwebtoken');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
var port = process.env.PORT || 3000;

//middleware to use bodyParser to parse body as json
app.use(bodyParser.json());

//routing for POST request that saves a new TODO in the database
app.post('/todos', authenticate, (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

//routing for GET request that fetches all TODOs from the database which the current user created (req.user)
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos});
    }, (err) => {
        res.status(400).send(err);
    });
});

//routing for GET request that fetches one TODO from the database
app.get('/todos/:id', authenticate, (req, res) => {
    //get the ID from URL
    var id = req.params.id;
    //validate ID
    if (!ObjectID.isValid(id)) {
        //if not: send 404 with empty body 
        return res.status(404).send();
    } else {
        //fetch doc by ID
        Todo.findOne({
                _id: id,
                _creator: req.user._id
            }).then((todo) => {
            if (todo) {
                res.send({todo});
            } else {
                res.status(404).send();
            }
        }).catch((err) => {
            res.status(400).send();
        });
    };
});

//routing for DELETE request that removes one TODO from the database
app.delete('/todos/:id', authenticate, (req, res) => {
    //get the ID from URL
    var id = req.params.id;
    //validate ID
    if (!ObjectID.isValid(id)) {
        //if not: send 404 with empty body 
        return res.status(404).send();
    } else {
        //remove doc by ID
        Todo.findOneAndRemove({
                _id: id,
                _creator: req.user._id
            }).then((todo) => {
            if (todo) {
                res.send({todo});
            } else {
                res.status(404).send();
            }
        }).catch((err) => {
            res.status(400).send();
        });
    };
});

//routing for PATCH request that updates one TODO from the database
app.patch('/todos/:id', authenticate, (req, res) => {
    //get the ID from URL
    var id = req.params.id;

    //setting body by lodash to specify only 'text' and 'completed' fields should be used by the user
    var body = _.pick(req.body, ['text', 'completed']);

    //validate ID
    if (!ObjectID.isValid(id)) {
        //if not: send 404 with empty body 
        return res.status(404).send();
    } 
    //check if 'completed' is a boolean and if it's true
    if (_.isBoolean(body.completed) && body.completed) {
        //if yes, set 'completedAt' field to current time
        body.completedAt = new Date().getTime();
    } else {
        //if not, set it to false and remove 'completedAt' field value
        body.completed = false;
        body.completedAt = null;
    }

    //update doc by ID $set method to updade for 'body', and 'new' option to true to return the updated document
    Todo.findByIdAndUpdate({_id: id, _creator: req.user._id}, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        } 
        res.send({todo});

    }).catch((err) => {
        res.status(400).send();
    });
    
});

//routing for POST method to add new user
app.post('/users', (req, res) => {
    console.log(req.body);
    //we only need user to set email and password, so pick them by lodash
    var body = _.pick(req.body, ['email', 'password']);
    //create a new instance to the User model
    var user = new User(body);
    //save the user with generated auth token
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        //send the token as a request header 'x-auth'
        res.header('x-auth', token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });
});

//private route to authenticate user by x-auth header and token
app.get('/users/me', authenticate, (req, res) => {
    //send back the user we just authenticated by the 'authenticate' middleware
    res.send(req.user);
});

// POST request route to LOG IN 
app.post('/users/login', (req, res) => {
    //we only need user to set email and password, so pick them by lodash
    var body = _.pick(req.body, ['email', 'password']);
    //call our findByCredentials model method from users, to find the user and compare passwords
    User.findByCredentials(body.email, body.password).then((user) => {
        //if everything is fine we generate a new token, and send it back as header with the user object
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);
        });
    }).catch((e) => {
        //if there is error or findByCredentials sends back a reject, throw err 400
        res.status(400).send();
    });
});

//private route for DELETE request to LOG OUT
app.delete('/users/me/token', authenticate, (req, res) => {
    //call instance method to remove token
    req.user.removeToken(req.token).then(() => {
        //if everything fine, send back status 200
        res.status(200).send();
    }, () => {
        //if there is error, send back err 400
        res.status(400).send();
    });
});


//start the server
app.listen(port, () => {
    console.log(`Started on port ${port}...`);
});

//export for testing only
module.exports = {app};




