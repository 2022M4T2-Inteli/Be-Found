const mongoose = require('mongoose');
var moment = require('moment');
moment.locale("pt-br");

const roomRfid = mongoose.model('RoomRfid',{
    infoCard:{
        type: String,
        default: "Indefinido",
    },
    attLocRf:{
        type: String,
        default: () => moment().format('L')
    },
    nameRoom:{
        type: String,
        default: "Indefinido",
    },
})

module.exports = roomRfid;