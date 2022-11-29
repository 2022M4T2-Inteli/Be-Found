const mongoose = require('mongoose');
var moment = require('moment');
moment.locale("pt-br");

const locationRf = mongoose.model('locationRf',{
    modelo:{
        type: String,
        default: "Indefinido",
    },
    localizacao:{
        type: String,
        default: "Indefinido",
    },
    beaconP:{
        type: String,
        default: "Indefinido",
    },
})

module.exports = locationRf;