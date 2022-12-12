const mongoose = require('mongoose');
var moment = require('moment');
moment.locale("pt-br");
var x = () => moment().format('L')

const locationWifi = mongoose.model('locationWifi', {
    modelo:{
        type: String,
        default: "Indefinido",
    },
    loc:{
        type: String,
        default: "Indefinido",
    },
    locAnterior:{
        type: String,
        default: "Indefinido",
    },
    timeLocAnte:{type: String,
        default: () => moment().startOf('hour').fromNow();
    },
    rec:{
        type: String,
        default: "Indefinido",
    },
    timestamp:{type: String,
        value: () => moment().startOf('hour').fromNow();
    },
    timeAlert:{type: String,
        default: () => moment().startOf('hour').fromNow();
    },
    buzer:{
        type: Number,
        default: 0,
    },
    perm:{
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
    custody:{
        type: String,
        default: "Indefinido",
    },
    register:{
        type:String,
        default: "Indefinido"
    },
})

module.exports = locationWifi;
