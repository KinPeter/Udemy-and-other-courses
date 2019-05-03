const express = require('express')
// import the collection model
const Task = require('../models/task')
// create a mew Router object
const router = new express.Router()
// import authentication middleware
const auth = require('../middleware/auth')

// route to create new task
router.post('/tasks', auth, async (req, res) => {
    // console.log(req.body)
    // create a new instance of Task, passing the request body and the owner's id
    const task = new Task({
        ...req.body,         // syntax to "copy in" all fields from request body
        owner: req.user._id  // user object is added to request by auth middleware
    })
    // try save new task to the database, send back the task object as response or handle error
    try {
        await task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

// route to get all tasks owned by the authenticated user
router.get('/tasks', auth, async (req, res) => {
    // create an object for the base search criteria
    const match = {
        owner: req.user._id
    }
    // GET /tasks?completed=true
    // if there is ?completed= in the query string
    if (req.query.completed) {
        // then add it's boolean value to the match object
        match.completed = req.query.completed === 'true'
    }

    // GET /tasks?limit=10&skip=20 - PAGINATION
    // create an object for options field for .find()
    const options = {
        // if limit and skip provided in the query string, use them as options
        // if they are not provided, mongoose automatically ignores them
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip)
    }

    // GET /tasks?sortBy=createdAt_asc  or updatedAt_desc  etc
    // if ?sortBy= is in the query string add sort field to options object
    if (req.query.sortBy) {
        // split the query string to get sortby field and the order
        const sortByString = req.query.sortBy.split('_')
        // create an empty object for sort
        const sort = {}
        // set the splitted field name as the object field and the order as the value
        sort[sortByString[0]] = sortByString[1] === 'asc' ? 1 : -1
        // attach this sort object to the options object we pass to find()
        options.sort = sort
    }

    // try to find tasks passing match object (search criteria) and options object (limit/skip pagination and/or sorting) to the find method
    // (null is for 2nd argument projection that is not provided)
    try {
        const tasks = await Task.find(match, null, options)
        res.status(200).send(tasks)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// route to get ONE task by ID after authentication
router.get('/tasks/:id', auth, async (req, res) => {
    // console.log(req.params)
    // get the id from request parameters object's id field
    const _id = req.params.id
    try {
        // find task by passing the ID and also the owner's id from req. object (added there by auth middleware)
        const task = await Task.findOne({ _id: _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// route to UPDATE a task created by the authenticated user
router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    // get the update keys (fields) from request body
    const updates = Object.keys(req.body)
    // create a list of allowed fields
    const allowedUpdates = ['description', 'completed']
    // check if every update field is in the allowed updates list
    // .every() returns true only if all elements are true
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    // if the above returned false, send a 400 error back
    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid field(s) to update!'})
    }
    // try to update task after finding by id using await (update content in req.body)
    try {
        // find task by passing the ID and also the owner's id from req. object (added there by auth middleware)
        const task = await Task.findOne({ _id: _id, owner: req.user._id })
        // if there is no task found by ID return 404
        if (!task) {
            return res.status(404).send()
        }
        // loop through the fields and update them
        updates.forEach((field) => {
            task[field] = req.body[field]
        })
        // save the user (with applying the middleware set up in the Schema)
        await task.save()
        // if everything is fine, send back the task and 200
        res.status(200).send(task)
    } catch (err) {
        // if there is other error, send 400
        res.status(400).send(err.message)
    }
})

// route to DELETE one task by ID after authentication
router.delete('/tasks/:id', auth, async (req, res) => {
    // console.log(req.params)
    // get the id from request parameters object's id field
    const _id = req.params.id
    try {
        // find and delete task by passing the ID and also the owner's id from req. object (added there by auth middleware)
        const task = await Task.findOneAndDelete({ _id: _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.status(200).send(task)
    } catch (err) {
        res.status(500).send(err.message)
    }
})

// export this router for the index.js file
module.exports = router