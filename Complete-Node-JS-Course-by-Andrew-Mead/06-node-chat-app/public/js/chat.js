//call socket.io to open up connection with the server
var socket = io();

//function to autoscroll to the bottom when new message comes in, but only if we are already near the bottom (and not intentionally checking old messages)
function scrollToBottom() {
    //selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    //determine if we need to scroll down
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    };
};

//event listener to fire when we connect to the server
socket.on('connect', function() {
    console.log('Connected to server.'); 
    //from the join screen get the parameters name and room using deparam library
    var params = $.deparam(window.location.search);
    //perform 'join' event emission to the server
    socket.emit('join', params, function(err) {
        //if server's join validation sends back error 
        if (err) {
            //show the error and redirect to join page
            alert(err);
            window.location.href = '/';
        } else {
            console.log('no error');
        };
    });
});

//event listener to fire when we disconnect from the server
socket.on('disconnect', function() {
    console.log('Disconnected from the server.');
});

//listener to update the user list
socket.on('updateUserList', function(users) {
    console.log('Users list:', users);
    var ol = $('<ol></ol>');
    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

//event listener to check new messages arriving (in socket)
socket.on('newMessage', function(message) {
    console.log('New message:', message);
    //setting formatted timestamp with Moment
    var formattedTime = moment(message.sentAt).format('H:mm');
    //MUSTACHE.JS template rendering to show the messages on the page:
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        time: formattedTime,
        from: message.from
    });
    //append (add) the message to the html
    $('#messages').append(html);
    scrollToBottom();
});

//event listener to check new LOCATION messages arriving (in socket)
socket.on('newLocationMessage', function(message) {
    console.log('New location message:', message);
    //setting formatted timestamp with Moment
    var formattedTime = moment(message.sentAt).format('H:mm');
    //MUSTACHE.JS template rendering to show the messages on the page:
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        time: formattedTime,
        from: message.from
    });
    //append (add) the message to the html
    $('#messages').append(html);
    scrollToBottom();
});

//send the message from the form on html
$('#message-form').on('submit', function(e) {
    e.preventDefault();
    socket.emit('createMessage', {
        text: $('#message').val()
    }, function() {
        $('#message').val('');
    });
});

//get and send location to the chat
var locBtn = $('#send-location');
locBtn.on('click', function() {
    //check if browser supports Geolocation API
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported in your browser.');
    }

    //disable the button while the geolocation fetching is in progress
    locBtn.attr('disabled', 'disabled').text('Sending...');

    //get location from built in JS Geolocation API
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        //enable the button again once we have the position
        locBtn.removeAttr('disabled').text('Share location');
        //use a different emit event for the server to differentiate from other messages
        socket.emit('createLocationMessage', {
            //and send the location data as object properties
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        });
    }, function() { //if there is an error
        locBtn.removeAttr('disabled').text('Share location');
        alert('Unable to fetch location.');
    });
});
