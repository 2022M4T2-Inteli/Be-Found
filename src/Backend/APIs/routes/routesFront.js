const router = require('express').Router();
const path = require('path');

  router.get("/notEletronicDevices", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/notEletronicDevices.html"));
  });
  router.get("/infoDevice", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/infoDevice.html"));
  });
  router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/loginpage.html"));
  });
  router.get("/paginaInicial", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/paginaInicial.html"));
  });
  router.get("/requestlogin", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/requestlogin.html"));
  });
  router.get("/teste", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/teste.html"));
  });
  router.get("/teste2", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/teste2.html"));
  });
  router.get("/eletronicDevices", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/eletronicDevices.html"));
  });
  router.get("/mapNotEletronic", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/mapNotEletronic.html"));
  });
  router.get("/notEletronicMapteste", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/notEletronicMapteste.html"));
  });
  router.get("/home2", (req, res) => {
    res.sendFile(path.join(__dirname, "../../../Frontend/paginas/home2.html"));
  });

module.exports = router;