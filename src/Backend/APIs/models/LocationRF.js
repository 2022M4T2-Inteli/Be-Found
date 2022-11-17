const mongoose = require('mongoose');

const locationRf = mongoose.model('locationRf',{
    modelo:String,
    localizacao:String,
    rec:String,
    data:String 
})

module.exports = locationRf;