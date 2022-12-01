const mongoose = require('mongoose');
var moment = require('moment');
moment.locale("pt-br");

const roomRfid = mongoose.model('RoomRfid',{
    iCardModel:{
        type: String,
        default: "Indefinido",
    },
    iCardBeaP:{
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
    qutn:{
        type: Number,
        default: 0,
    },
})

module.exports = roomRfid;