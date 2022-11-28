$(document).ready(() => {
    getDevices();
});

const geralDevices = document.querySelector("#geralDevices");
const lastLocation = document.querySelector("#lastLocation");
const register = document.querySelector("#registerData");

var aux = 0;
var ndev = 0;
var idFilter = 0;
var activeFilter = false;

console.log("teste");

const getDevices = () => {$.ajax({
    async:true,
    url: "http://127.0.0.1:5500/rfid/find",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            const div = document.createElement("div");
            div.classList.add('divButton');
            div.setAttribute("id", "buttonListDevices");
            
        div.innerHTML = `
        <button onclick="deviceDetail('${element._id}')" class="buttonDevices">
            <div class="devices">
                <div class="textDevices">
                    <img style="width: 12px; height: 12px;"class="circleFillGreenList" src="../imagens/circleFillGreen.png" alt="">
                    <p><b>${element.rec}</b><br>${element.data}</p>
                </div>
                <div class="imgCategoryDevice">
                    <img class="mapPinList" src="../imagens/map-pin.svg" alt="map_pin">
                    <section class="textCategory"><p id="qcaraio`+idFilter+`">${element.modelo}</p></section>
                </div>
            </div>
        </button>
        `
        idFilter += 1;
        ndev += 1;
        geralDevices.appendChild(div);
        });
        ReactDOM.render(ndev, document.getElementById("numberDevices"));
    }
})
};



// document.getElementById("inputInfoDevice1").value = "My value";

function deviceDetail(id){
    const deced = document.querySelector("#currentLocDev");
    const decedd = document.querySelector("#lastLocDev");
    deced.innerHTML = "";
    decedd.innerHTML = "";
    register.innerHTML = "";
    console.log("BUCETAAAAA");
    $.ajax({
        url: "http://127.0.0.1:5500/rfid/find",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                const tittleView = document.createElement("div");
                tittleView.classList.add('registerr');
                tittleView.innerHTML = `
                <p>Registrado em ${element.data}</p>
                <div class="connectDevide">
                    <img class="circleFillGreenInfo" src="../imagens/circleFillGreen.png" alt="">
                    <p>Conectado</p>
                </div>
                `
                const currentLoc = `${element.localizacao}`;
                const lastLoc = `${element.localizacao}`;
                var idDevicess = `${element._id}`;
                if(idDevicess == id){
                    document.getElementById("btnMusic").disabled = false;
                    document.getElementById("btnMore").disabled = false;
                    register.appendChild(tittleView);
                    $("#currentLocDev").append(currentLoc);
                    $("#lastLocDev").append(lastLoc);
                    document.getElementById("input0").value = `${element.rec}`;
                    document.getElementById("input3").value = `${element.data}`;
                }
            });
        }
    });
};

function searchFilter() {
    var input, filter, geralDevicesht, buttonDev, p, i, txtValue;
  
    input = document.getElementById("searchName");
    filter = input.value.toUpperCase();
    geralDevicesht = document.getElementById("geralDevices");
    buttonDev = geralDevicesht.getElementsByTagName("button");

    for (i = 0; i < buttonDev.length; i++) {
      p = buttonDev[i].getElementsByTagName("p")[0];
      if (p) {
        txtValue = p.textContent || p.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            buttonDev[i].style.display = "";
        } else {
            buttonDev[i].style.display = "none";
        }
      }
    }
}

function filterCategory(id){
    if(activeFilter == true){
        cleanfilter();
    };
    activeFilter = true;
    var categoryAr = ["Macbook", "tatu", "vitoria", "olocomeu", "dellzada"];
    var filter, geralDevicesht, buttonDevFilter, pfilter, i, txtValue;
  
    filter = categoryAr[id];
    geralDevicesht = document.getElementById("geralDevices"); // section with all buttons of devices 
    buttonDevFilter = geralDevicesht.getElementsByTagName("button"); // button for display none or not

    for (i = 0; i < buttonDevFilter.length; i++) {
        pfilter = document.getElementById("qcaraio" + i);
      console.log("qcaraio" + i);
      console.log("conteudo dele " + pfilter.innerText);
      console.log("comparando com " + filter);

      if (pfilter) {
        txtValue = pfilter.textContent || pfilter.innerText;
        if (txtValue.indexOf(filter) > -1) {
            buttonDevFilter[i].style.display = "";
            console.log("conteudo diferente com o indice")
        } else{
            buttonDevFilter[i].style.display = "none";
        }
      }
    }
}

function cleanfilter(){
    var geralDevicesht, buttonDevFilter, i;
    geralDevicesht = document.getElementById("geralDevices"); // section with all buttons of devices 
    buttonDevFilter = geralDevicesht.getElementsByTagName("button"); // button for display none or not
    for (i = 0; i < buttonDevFilter.length; i++) {
        buttonDevFilter[i].style.display = "";
    }

}

function editInfos(){
    for (i = 0; i <= 5; i++) {
        document.getElementById('input' + i).disabled = false;
        document.getElementById('input' + i).placeholder = "";
        document.getElementById('input' + i).style.background = "white";
    }
}

function disableField(number){
    document.getElementById('input' + number).disabled = true;
    document.getElementById('input' + number).style.background = "#F2F2F2";
}

function buttonBuzzer(){
    var buzzer = {
        "url": "http://127.0.0.1:5500/wifi/teste",
        "method": "PATCH",
        "timeout": 0,
        "data": {
            "buzer": 1,
        }
      };
      
      $.ajax(buzzer);
}
