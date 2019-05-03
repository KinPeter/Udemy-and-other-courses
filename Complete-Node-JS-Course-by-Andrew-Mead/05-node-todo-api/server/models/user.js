var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');
var bcrypt = require('bcryptjs');

//create a schema and model for Users collection specifing the fields and their options
var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 3,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});
//creating an instance method to create JWT token for a user
UserSchema.methods.generateAuthToken = function() {
    var user = this; //'this' is a current user document
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens = user.tokens.concat([{access, token}]);

    return user.save().then(() => {
        return token;
    });
};

//instance method to remove token
UserSchema.methods.removeToken = function(token) {
    var user = this; //'this' is a current user document 
    //update the document with $pull operator that removes the field if matches a criteria
    //using return to chain promises
    return user.update({
        $pull: {
            tokens: {
                token: token //if the token matches the token given as argument
            }
        }
    });
};

//override .toJSON() method to only return ID and email
UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

//model method to find a user by token
UserSchema.statics.findByToken = function(token) {
    var User = this; //seting this as the model 'User'
    var decoded;
    //try to verify the token by JWT
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        //if verify throws an error send a rejected promise
        return Promise.reject();
    }
    //if everything is fine return the user by id and token
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

//model method to find a user by email and password
UserSchema.statics.findByCredentials = function(email, password) {
    var User = this; //seting this as the model 'User'
    //using returns to chain promises, first find user in the database by matching email
    return User.findOne({email}).then((user) => {
        //if no such user, reject the whole promise (which will result in err 400 in server.js)
        if (!user) {
            return Promise.reject();
        } 
        //if there is user, create new promise to call bcrypt to compare passwords
        return new Promise((resolve, reject) => {
            //bcrypt.compare to compare given password and user.password
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    //if result is true, send back (resolve) the user object
                    resolve(user);
                } else {
                    //if not, reject the promise, (err 400 at the end)
                    reject();
                }
            });
        });
    });

    // //try to verify the token by JWT
    // try {
    //     decoded = jwt.verify(token, 'abc123');
    // } catch (e) {
    //     //if verify throws an error send a rejected promise
    //     return Promise.reject();
    // }
    // //if everything is fine return the user by id and token
    // return User.findOne({
    //     '_id': decoded._id,
    //     'tokens.token': token,
    //     'tokens.access': 'auth'
    // });
};

//middleware to use before (pre) each signup to if there is a new (or modified) password, hash it and save the hashed password
UserSchema.pre('save', function(next) {
    var user = this; //seting this as the current user
    //check if the user's password was modified
    if (user.isModified('password')) {
        //if yes, hash it and store it
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        //if no, simply continue with the routing
        next();
    }
});

//creating the model:
var User = mongoose.model('User', UserSchema);

//ADDING NEW DOCUMENT
//create a new variable with an object for the new document
// var newUser = new User({
//     email: 'kinpeter85@gmail.com'
// });
// //save the variable to the database and use promise.then() to log it
// newUser.save().then((doc) => {
//     console.log('Saved user: ', doc);
// }, (err) => {
//     console.log('Unable to save user', err);
// });

module.exports = {
    User
}