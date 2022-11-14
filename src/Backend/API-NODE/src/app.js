import { createTable, insertPosition, updatePosition} from "./controler/rfidDB.js"

import express from 'express';
const app = express();

const PORT = 3000

app.use(express.json());

createTable();

app.get('/', (req, res) => {
   res.send("Ola world!");
})

app.post('/sala', (req,res) =>{
   insertPosition(req.body)
   res.json({
      "statusCode" : 200
   })
})

app.put('/sala', (req,res) =>{
   if(req.body && !req.body.id){
      res.json({
         "statusCode":400
      })
   }else{
      updatePosition(req.body)
      res.json({
         "statusCode" : 200
      })
   }
})

app.listen(PORT, () => console.log("api rodando"));