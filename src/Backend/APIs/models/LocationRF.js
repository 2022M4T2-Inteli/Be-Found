const mongoose = require('mongoose');

const locationRf = mongoose.model('locationRf',{
    modelo:String,
    localizacao:String,
    rec:String,
    data:String,
    buzer:{
        type: Number,
        default: 0,
    }, 
})

module.exports = locationRf;