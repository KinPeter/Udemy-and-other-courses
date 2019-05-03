const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

//create an express app
const port = process.env.PORT || 3000; //setting port either we run on HEROKU or in LOCALHOST
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

//middleware to user Public folder as static
app.use(express.static(publicPath));

//event listener for new connection
io.on('connection', (socket) => {
    console.log('New user connected.');

    //listener for 'join' event when somebody comes from the join screen
    socket.on('join', (params, callback) => {
        //validate the parameters using our util validation function
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        };
        
        //join the room by socket.io built-in .join() method
        socket.join(params.room);

        //remove current user from other rooms IF they had been in any
        users.removeUser(socket.id);

        //add users to our User class with the current parameters
        users.addUser(socket.id, params.name, params.room);

        //emit the updateUserList event only to the room the user joined
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        
        //sending welcome message to the new user only
        socket.emit('newMessage', generateMessage('Admin', `Welcome to the chat app`));
    
        //sending message to all other users about a new user connected to the room
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} joined the chat.`));

        //if fine, call callback but not send anything back (no response means no error)
        callback();
    });

    //listener for incoming messages
    socket.on('createMessage', (message, callback) => {
        console.log('Message:', message);
        //get the current user by socket id
        var user = users.getUser(socket.id);
        //if user exists and the message text is valid
        if (user && isRealString(message.text)) {
            //event emission: sending the message data to the client to the specific room
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
            //send response to the client (no response means no error)
            callback();
        }
        
        //io.emit() will send this to all connected users
        //.broadcast.emit() does the same as simple .emit, but the user who sends will NOT receive the message, but everyone else will
        // socket.broadcast.emit('newMessage',generateMessage(message.from, message.text);
    });

    //listener for location message event that fires if the user clicks the "share location" button
    socket.on('createLocationMessage', (coords) => {
        //get the current user by socket id
        var user = users.getUser(socket.id);
        //if user exists and the coords are available
        if (user && coords) {
            //emit new location message event and send the location to the room
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });

    //event listener for user disconnected
    socket.on('disconnect', () => {
        console.log('User was disconnected.');
        //get the user object who was disconnected (removed) 
        var user = users.removeUser(socket.id);
        //if there is a user
        if (user) {
            //emit the updateUserList method to update the user list in that room
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            //send an admin message to everyone in that room about which user left
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the chat.`));
        }
    });
});



//start up the server
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})