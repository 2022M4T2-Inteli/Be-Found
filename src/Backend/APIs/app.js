// login database
//login: joaoalca
//senha: joaoalca123

// config init
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Ports
const PORT = 5500;
const hostname = '127.0.0.1:';

//leitura json
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())




//endpoit inicial
// app.get('/' , (req,res) => {
//     res.json({
//         "msg":"oioioi"
//     })
// })



// rotas API
app.use(express.static("../../Frontend"));
const RouterFront = require('./routes/routesFront.js');
app.use('/', RouterFront);


// /rfid
const RfRoutes = require('./routes/LocationRfRouter.js');
app.use('/rfid', RfRoutes);


const cors = require("cors");
app.use(
	cors({
		// accept vercel
		// origin: "https://projeto3-client.vercel.app/",

		// accept any request from any origin
		origin: "*",
	})
);

//Host and db connect

mongoose
    .connect(
        'mongodb+srv://joaoalca:joaoalca123@apicluster.ldpol3f.mongodb.net/bancodaapi?retryWrites=true&w=majority'
        )
    .then(
        ()=>{
            console.log("Conectado ao banco")
            app.listen(PORT, () => {
                console.log(`Page server running at http://${hostname}${PORT}/`);
              });
        }
    )
    .catch(
        (err)=>{console.log(err)}
    )
