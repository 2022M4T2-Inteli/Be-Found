const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ //Dados do usuário
    email:{ //Email do usuário
        type: String,

    },
    password:{ //Senha de acesso ao sistema
        type: String,

    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;