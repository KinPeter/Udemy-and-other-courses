const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

//set partials location (header, footer, etc)
hbs.registerPartials(__dirname + '/views/partials/');

//handlebars setting
app.set('view engine', 'hbs');

//middleware to make a log about requests
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} request for path ${req.url} \n`;
    console.log(log);
    fs.appendFile('serverLog.txt', log, err => {
        if (err) {
            console.log('Something went wrong.');
        } });
    //next() is needed to let the app continue running!
    next();
});

//middleware to set MAINTENANCE
// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
//     //no next(), so all other commands BELOW will NOT be available
// });

//middleware: sets the base directory for the static website
app.use(express.static(__dirname + '/public'));

//helper to get year for the footer
hbs.registerHelper('currentYear', () => new Date().getFullYear());

//helper that take argument (on home page e.g.)
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

//http request routing method for root page:
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Hi there, it\'s Peter',
        
    });
});

//routing for about page
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',

    });
});

//routing for projects page
app.get('/projects', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'Projects page',

    });
});


// start listening on port 3000
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});