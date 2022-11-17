const geralDevices = document.querySelector("#geralDevices");
console.log("teste");

$.ajax({
    url: "",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const div = document.createElement("div");
        div.innerHTML = `
        <div class="devices">
            <div class="textDevices">
                <svg class="svgCircle" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="14" height="14" rx="7" fill="#19B69B"/></svg>
                <p><b>${element.nameDevice}</b><br>${element.dateTime}</p>
            </div>
            <div class="imgCategoryDevice">
                <img class="mapPin" src="../imagens/map-pin.svg" alt="map_pin">
                <p class="textCategory">${element.category}</p>
            </div>
        </div>
        `
        geralDevices.appendChild(div);
        });
    }
});