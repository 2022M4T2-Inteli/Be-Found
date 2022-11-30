const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User ({
            email: req.body.email,
            password: hashedPass
        })
        user.save()
        .then(auth => {
            res.json({message: 'User added succesfully!'})
        })
        .catch(error => {
            res.json({message: 'An error ocurred!'})
        })
    }) 
}

const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({email:username})
    .then(user => {
        bcrypt.compare(password, user.password, function(err, result){
            
        })
    })
}

module.exports = {
    register
}