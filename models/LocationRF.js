const mongoose = require('mongoose');
var moment = require('moment');
moment.locale("pt-br");

const locationRf = mongoose.model('locationRf',{
    modelo:{ //Tipo de Objeto
        type: String,
        default: "Indefinido",
    },
    beaconP:{ //Número - Beacon Patrimônio 
        type: String,
        default: "Indefinido",
    },
    salaatt:{
        type: String,
        default: "Indefinido",
    },
})

module.exports = locationRf;