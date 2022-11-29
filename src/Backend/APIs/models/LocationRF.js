const mongoose = require('mongoose');
var moment = require('moment');
moment.locale("pt-br");

const locationRf = mongoose.model('locationRf',{
    modelo:String,
    localizacao:String,
    rec:String,
    timestamp:{type: String,
        default: () => moment().format('L')
    },
    buzer:{
        type: Number,
        default: 0,
    },
    version:{
        type: String,
        default: "Indefinido",
    },
    beaconP:{
        type: String,
        default: "Indefinido",
    },
    idd:{
        type: String,
        default: "Indefinido",
    },
    idp:{
        type: String,
        default: "Indefinido",
    },
})

module.exports = locationRf;