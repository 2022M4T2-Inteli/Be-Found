const mongoose = require('mongoose');
var moment = require('moment');
moment.locale("pt-br");

const roomRfid = mongoose.model('RoomRfid',{
    attLocRf:{
        type: String,
        default: () => moment().format('L')
    },
    nameRoom:{
        type: String,
        default: "Indefinido",
    },
    qtdCad:{
        type: Number,
        default: 0,
    },
    qtdCadRod:{
        type: Number,
        default: 0,
    },
    qtdQuad:{
        type: Number,
        default: 0,
    },
    qtdviol:{
        type: Number,
        default: 0,
    },
    qtdvioli:{
        type: Number,
        default: 0,
    },
    qtdflaut:{
        type: Number,
        default: 0,
    },
})

module.exports = roomRfid;