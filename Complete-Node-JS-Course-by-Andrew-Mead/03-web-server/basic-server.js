const express = require('express');

var app = express();

//http request routing method for root page:
app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!</h2>');
    res.send({
        name: 'Peter',
        likes: ['Cities', 'Travel']
    });
});

//routing for 'about'
app.get('/about', (req, res) => {
    res.send('About page');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Some error occured'
    });
});

//start listening on port 3000
app.listen(3000);