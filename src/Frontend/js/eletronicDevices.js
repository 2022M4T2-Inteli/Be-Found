const geralDevices = document.querySelector("#geralDevices");
const lastLocation = document.querySelector("#lastLocation");
const cors = require('cors');

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

console.log("teste");

$.ajax({
    url: "http://127.0.0.1:5500/rfid/find",
    type: 'GET',
    success: data => {
        console.log("oi");
        data.forEach(element => {
            const div = document.createElement("div");
            const location = document.createElement("p");
        div.innerHTML = `
        <div class="devices">
            <div class="textDevices">
                <svg class="svgCircle" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="14" height="14" rx="7" fill="#19B69B"/></svg>
                <p><b>${element.rec}</b><br>${element.data}</p>
            </div>
            <div class="imgCategoryDevice">
                <img class="mapPin" src="../imagens/map-pin.svg" alt="map_pin">
                <p class="textCategory">${element.modelo}</p>
            </div>
        </div>
        `
        geralDevices.appendChild(div);

        location.innerHTML = `
        <p class="lastInfoDev">${element.localizacao}</p>
        `
        lastLocation.appendChild(location);
        });
    }
});