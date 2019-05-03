const mongoose = require('mongoose')
const validator = require('validator')
const bc = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

// create a schema (constructor) for users
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password must not contain the word "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    tokens: [{  // array of objects so it can store more tokens
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {   // buffer type field on User to store avatar image binary data
        type: Buffer
    }
}, { // adding option arguments to the Schema in a separate object
    // this will automatically add createdAt and updatedAt timestamp each time we create or update a document
    timestamps: true
})

// create a "virtual field" on User to make relationship between the user and their tasks
userSchema.virtual('tasks', {
    ref: 'Task',          // the model to relate to
    localField: '_id',    // the field on User   
    foreignField: 'owner' // the field on Task
})

// with this method we basically override the JSON stringifying method whenever it's called on a user object
// this way anyway we send back a user it will remove password and token fields
userSchema.methods.toJSON = function() {
    // save the current user to a variable
    const user = this
    // make a copy object of the user object
    const userObject = user.toObject()
    // delete those fields we don't want to show
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    // return what's left
    return userObject
}

// create an instance method to generate JWT
userSchema.methods.generateAuthToken = async function() {
    // save the current user to a variable
    const user = this
    // create the web token using user's ID as payload 
    const token = jwt.sign({ _id : user._id.toString() }, process.env.JWT_SECRET)
    // add the token to the user document in the database (concat to the tokens array)
    user.tokens = user.tokens.concat({token: token})
    // save the user document
    await user.save()
    // return the token if everything went fine
    return token
}

// create a custom static model method to find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    // first find the user by email
    const user = await User.findOne({ email : email })
    // if no user found throw an error
    if (!user) {
        throw new Error('Unable to log in.')
    }
    // use bcrypt.compare to check the currently passed password with the stored hash
    const isMatch = await bc.compare(password, user.password)
    // if password does not match throw an error
    if (!isMatch) {
        throw new Error('Unable to log in.')
    }
    // if user found and passwords match return the user object
    return user
}

// setting up 'pre' middleware to hash the password before it gets saved
userSchema.pre('save', async function(next) {
    // save the current user to a variable
    const user = this

    // only hash the password if it's a modified field (being saved first time or being updated)
    if (user.isModified('password')) {
        // use bcrypt.hash(), 8 is the rounds for the hashing algorhytm to run
        user.password = await bc.hash(user.password, 8)
    }

    // by calling next() we let the program know middleware is finished and it can continue
    next()
} )

// middleware to delete user's tasks when user is removed
userSchema.pre('remove', async function(next) {
    const user = this
    // delete all tasks where the current user is the owner
    await Task.deleteMany({ owner: user._id })
    // call next to continue the route handler
    next()
})

// create a model for Users
const User = mongoose.model('User', userSchema)

module.exports = User