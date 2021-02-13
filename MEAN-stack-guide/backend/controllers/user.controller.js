const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 8).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then((result) => {
                res.status(201).json({
                    message: 'User created',
                    result: result
                });
                console.log('USER CREATED: ' + result.email);
            })
            .catch((err) => {
                res.status(500).json({ message: 'Invalid authentication credentials!' });
            });
    });
};

exports.loginUser = (req, res, next) => {
    let user;
    User.findOne({ email: req.body.email })
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(401).json({ message: 'Authentications failed.' });
            }
            user = foundUser;
            return bcrypt.compare(req.body.password, foundUser.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({ message: 'Authentications failed.' });
            }
            const token = jwt.sign(
                { email: user.email, userId: user._id },
                'secret_this_should_be_long',
                { expiresIn: '1h' }
            );
            console.log('USER LOGGED IN: ' + user.email);
            res.status(200).json({
                token,
                expiresIn: 3600,
                userId: user._id
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(401).json({ message: 'Authentications failed.' });
        })
}