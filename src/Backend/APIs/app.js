
// initial imports
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

//Ports
const PORT = 5500;
const hostname = '127.0.0.1:';

//JSON read
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



// routes Frontend
app.use(express.static("../../Frontend"));
const RouterFront = require('./routes/routesFront.js');
app.use('/', RouterFront);


// routes Rfid
const RfRoutes = require('./routes/LocationRfRouter.js');
app.use('/rfid', RfRoutes);

// routes Wifi
const wifiRoutes = require('./routes/LocationWifiRouter.js')
app.use('/wifi',wifiRoutes)

// routes room
const roomRoutes = require('./routes/roomsRouter.js')
app.use('/room',roomRoutes)

//Registration
const authRoute = require('./routes/auth.js');
app.use('/log', authRoute);

// Access CORS
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
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ldpol3f.mongodb.net/bancodaapi?retryWrites=true&w=majority`
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
