var {User} = require('./../models/user');

//middleware to authenticate before sending request
var authenticate = (req, res, next) => {
    //fetching token from request header
    var token = req.header('x-auth');
    //using our own function to find user by token
    User.findByToken(token).then((user) => {
        //if there is no such user, send a rejected promise, which will take us to the error case
        if (!user) {
            return Promise.reject();
        }
        //if there is user, set the request.user and request.token to the ones we just found, so the route will be able to uses these data
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};