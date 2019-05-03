const jwt = require('jsonwebtoken')
// import the collection model
const User = require('../models/user')

// middleware function to run upon each request and check authentication JWT
const auth = async (req, res, next) => {
    try {
        // look for the request header with auth token that the user should provide 
        const token = req.header('Authorization').replace('Bearer ', '') // remove Bearer from the beginning
        // decode the JWT to get the payload which is the user id of the user
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // try to find that user with the user ID and check if the token is still saved in the tokens array
        const user = await User.findOne({ 
            _id: decoded._id, 
            'tokens.token': token
        })
        // if there is no such user, throw an error (go to catch() code)
        if (!user) {
            throw new Error()
        }
        // save the user object on the request object
        req.user = user
        // save the token too on the request object
        req.token = token
        // call next() to let the route handler continue
        next()
    } catch (err) {
        res.status(401).send({error: 'Please authenticate.'})
    }
}

module.exports = auth