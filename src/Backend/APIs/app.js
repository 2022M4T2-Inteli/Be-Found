// login database
//login: joaoalca
//senha: joaoalca123

// config init
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Ports
const PORT = 3000;
const hostname = '127.0.0.1';

//leitura json
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())




//endpoit inicial
app.get('/' , (req,res) => {
    res.json({
        "msg":"oioioi"
    })
})



// rotas API

// /rfid
const RfRoutes = require('./routes/LocationRfRouter.js');
app.use('/rfid', RfRoutes);


//Host and db connect

mongoose
    .connect(
        'mongodb+srv://joaoalca:joaoalca123@apicluster.ldpol3f.mongodb.net/bancodaapi?retryWrites=true&w=majority'
        )
    .then(
        ()=>{
            console.log("Conectado ao banco")
            app.listen(PORT, hostname, () => {
                console.log(`Page server running at http://${hostname}:${PORT}/`);
              });
        }
    )
    .catch(
        (err)=>{console.log(err)}
    )
