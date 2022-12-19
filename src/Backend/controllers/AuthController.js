const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            email: req.body.email,
            password: hashedPass
        })
        user.save()
            .then(auth => {
                res.json({ message: 'User added succesfully!' })
            })
            .catch(error => {
                res.json({ message: 'An error ocurred!' })
            })
    })
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({ email: username })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    console.log(req.body)

                    if (err && err.error) {
                        return res.json({
                            error: err
                        })
                    }
                    if (result) {
                        //let token = jwt.sign({email: user.email})
                        return res.status(200).json({
                            message: "Login successful!",
                        })
                    } else {
                        return res.status(400).json({
                            message: "Password does not match!"
                        })
                    }
                })
            } else {
                return res.json({
                    message: "No user found!"
                })
            }

        })
}

module.exports = {
    register,
    login
}