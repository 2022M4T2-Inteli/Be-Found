const mongoose = require('mongoose');
var moment = require('moment');
moment.locale("pt-br");

const locationWifi = mongoose.model('locationWifi', {
    modelo:{
        type: String,
        default: "Indefinido",
    },
    localizacao:{
        type: String,
        default: "Indefinido",
    },
    rec:{
        type: String,
        default: "Indefinido",
    },
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
    status:{
        type: String,
        default: "Indefinido",
    },
    idp:{
        type: String,
        default: "Indefinido",
    },
})

module.exports = locationWifi;
