const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
// import the collection model
const User = require('../models/user')
// import email sending functions
const { sendWelcomeEmail, sendGoodbyeEmail } = require('../emails/account')
// create a mew Router object
const router = new express.Router()

// import middleware function to run upon each request and check authentication
// to implement it just have to pass it as 2nd argument for each route
// it will only allow the route handler function to run after it finished and called next()
const auth = require('../middleware/auth')

// route to create user (sign up)
router.post('/users', async (req, res) => {
    // console.log(req.body)
    // create a new instance of User, passing the request body
    const user = new User(req.body)
    // try to save new user to the database, await for the method
    try {
        await user.save()
        // send welcome email
        sendWelcomeEmail(user.email, user.name)
        // use our instance method to generate a JWT
        const token = await user.generateAuthToken()
        // if everything comes back fine, send back the user object and the token as an object as response
        res.status(201).send({ user: user, token: token })
    } catch (err) {
        // if not, handle error
        res.status(400).send(err.message)
    }
})

// route to LOGIN a user
router.post('/users/login', async (req, res) => {
    try {
        // use our custom method from the schema to find and check user credentials
        const user = await User.findByCredentials(req.body.email, req.body.password)
        // use our instance method to generate a JWT
        const token = await user.generateAuthToken()
        // send back the customised user object and the token as an object
        res.send({ user: user, token: token })
    } catch (err) {
        res.status(400).send()
    }
})

// route to LOGOUT a user from current session (device)
router.post('/users/logout', auth, async (req, res) => {
    try {
        // update the user object .token (which is accessible now on the request object thanks to the auth middleware) by filtering out the currently used token (logging out)
        req.user.tokens = req.user.tokens.filter((token) => {
            // .filter iterates through the tokens and if it finds the current token deletes it from the array
            return token.token !== req.token
        })
        // save the user in the database
        await req.user.save()
        // send back default 200
        res.send()

    } catch (err) {
        res.status(500).send()
    }
})

// route to LOGOUT a user from ALL sessions (devices)
router.post('/users/logoutall', auth, async (req, res) => {
    try {
        // update the user object .tokens array to an empty array, wiping out all existing tokens 
        req.user.tokens = []
        // save the user in the database
        await req.user.save()
        // send back default 200
        res.send()

    } catch (err) {
        res.status(500).send()
    }
})

// route to get current user's profile
router.get('/users/me', auth, async (req, res) => {
    // after authentication return the users data that is saved by the auth middleware on the request object
    res.send(req.user)
})

// route to get ONE user by ID - don't need it in production
// router.get('/users/:id', async (req, res) => {
//     // console.log(req.params)
//     // get the id from request parameters object's id field
//     const _id = req.params.id
//     try {
//         // use findById() method 
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send()
//         }
//         res.status(200).send(user)
//     } catch (err) {
//         res.status(500).send(err.message)
//     }
// })

// route to UPDATE the -authenticated- user
router.patch('/users/me', auth, async (req, res) => {
    // get the id from request object's id field - added by auth middleware
    const _id = req.user._id
    // get the update keys (fields) from request body
    const updates = Object.keys(req.body)
    // create a list of allowed fields
    const allowedUpdates = ['name', 'email', 'password', 'age']
    // check if every update field is in the allowed updates list
    // .every() returns true only if all elements are true
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    // if the above returned false, send a 400 error back
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid field(s) to update!'})
    }
    // try to update user after finding by id using await (update content in req.body)
    try {
        // get the user from the request object - added there by auth middleware
        const user = req.user
        // loop through the fields and update them
        updates.forEach((field) => {
            user[field] = req.body[field]
        })
        // save the user (with applying the middleware set up in the Schema)
        await user.save()
        // if everything is fine, send back the user and 200
        res.status(200).send(user)
    } catch (err) {
        // if there is other error, send 400
        res.status(400).send(err.message)
    }
})

// route to DELETE the current user - authenticated by middleware
router.delete('/users/me', auth, async (req, res) => {
    // console.log(req.params)
    // get the id from request object's id field - added by auth middleware
    const _id = req.user._id
    try {
        // use findByIdAndDelete() method 
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }
        // send goodbye email
        sendGoodbyeEmail(req.user.email, req.user.name)
        res.status(200).send(req.user)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// create a multer object to use it for file uploads
const upload = multer({
    // restrict uploaded files
    limits: {
        fileSize: 1000000 // file size limit in bytes
    },
    // function we will call on the request to filter files
    fileFilter(req, file, callback) {
        // check if the file ends with a supported file extension
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
            // if the file is not accepted, call callback with a new error
            return callback(new Error('File must be an image.'))
        }
        // if the file is okay, call callback with no error and true to accept file
        callback(undefined, true)
    }
})
// route to UPLOAD a file using auth as first middleware and multer middleware as second to manage the upload process
// in request need to use "form-data" as req.body and key "avatar"
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    // using SHARP module to modify the image
    // first save get the file binary data from req object, resize it, convert it to PNG, and save it to a sharp buffer
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    // set the content on user.avatar in the database
    req.user.avatar = buffer
    await req.user.save()
    // if everything went fine only send a 200 back
    res.send()
}, (error, req, res, next) => {
    // catch if there is an error with the upload and send back error message as JSON
    res.status(400).send({error: error.message})
})

// route to DELETE an avatar file with authentication
router.delete('/users/me/avatar', auth, async (req, res) => {
    try {
        // clear the avatar field on the user document and save it
        req.user.avatar = undefined
        await req.user.save()
        res.send()        
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// route to fetch a user's avatar image by user ID
router.get('/users/:id/avatar/', async (req, res) => {
    const _id = req.params.id 
    // first try to find user by id
    try {
        const user = await User.findById(_id)
        // if there is no such user or the user has no avatar - throw an error
        if (!user || !user.avatar) {
            throw new Error()
        }
        // if found, set response header content type to image
        res.set('Content-Type', 'image/png')
        // send back the user.avatar binary data (the image itself)
        res.send(user.avatar)
    } catch(err) {
        res.status(404).send()
    }    
})

// export this router for the index.js file
module.exports = router