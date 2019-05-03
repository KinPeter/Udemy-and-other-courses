const express = require('express')

// require (run) mongoose.js file to connect to the database
require('./db/mongoose')

// create the express webapp object
const app = express()
const port = process.env.PORT

// maintenance mode middleware
// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintenance, please try again later.')
// })

// middleware for express automatically parse requests as JSON
app.use(express.json())

// import and use the router files for URL routings
const userRouter = require('./routers/users_router')
app.use(userRouter)
const taskRouter = require('./routers/tasks_router')
app.use(taskRouter)

// start up the server app
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
