const mongoose = require('mongoose')

// create a schema (constructor) for tasks
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // reference: creates the relationship with the User model
    }
}, { // adding option arguments to the Schema in a separate object
    // this will automatically add createdAt and updatedAt timestamp each time we create or update a document
    timestamps: true
})

// create a model for Tasks
const Task = mongoose.model('Task', taskSchema)

module.exports = Task