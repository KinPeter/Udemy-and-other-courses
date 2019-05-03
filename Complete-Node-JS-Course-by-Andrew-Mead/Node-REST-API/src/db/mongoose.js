const mongoose = require('mongoose')

// set the URL to the database and the name 
const connection = process.env.MONGODB_URL // from environment variable in config/ (module env-cmd)
// connect to the database
mongoose.connect(connection, { 
    useNewUrlParser: true,
    useCreateIndex: true
})

// create an instance (document) and save it to the database
// const me = new User({
//     name: 'Peter',
//     email: 'PETER@p-kin.com  ',
//     password: 'AbC123AbC321'
// })
// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!\n', error.message)
// })

// create an instance of the Taks
// const task = new Task({
//     description: 'Go to gym!'
// })
// task.save().then(() => {
//     console.log(task)
// }).catch((err) => {
//     console.log(err.message)
// })


