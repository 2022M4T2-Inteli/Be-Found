const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.send("Ola world!");
})

app.listen(3000, () => console.log("api rodando"));