var db = require('./db');

module.exports.handleSignup = (email, password) => {
    //check if the email already exists
    //save the user into the database
    db.saveUser({
        email: email,
        password: password
    })
    //send the welcome email
}