var mongoose = require('mongoose');

//set mongoose to use global promise library
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp',  { useNewUrlParser: true });

module.exports = {
    mongoose 
}