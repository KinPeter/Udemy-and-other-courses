const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { dbUser, dbPass, clusterData } = require('../keys');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPass}@${clusterData}/node-angular?retryWrites=true&w=majority`, 
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database.');
    })
    .catch((error) => {
        console.log('Connection failed');
        console.log(error);
    })

app.use(bodyParser.json());

app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);

module.exports = app;