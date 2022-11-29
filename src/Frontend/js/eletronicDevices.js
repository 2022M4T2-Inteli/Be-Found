$(document).ready(() => {
    getDevices();
});

const geralDevices = document.querySelector("#geralDevices");
const lastLocation = document.querySelector("#lastLocation");
const register = document.querySelector("#registerData");
const addInputdiv = document.querySelector("#info");

var aux = 0;
var ndev = 0;
var idFilter = 0;
var activeFilter = false;

console.log("teste");

const getDevices = () => {
    $.ajax({
        async: true,
        url: "http://127.0.0.1:5500/wifi/",
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
                    <p><b>${element.rec}</b><br>${element.timestamp}</p>
                </div>
                <div class="imgCategoryDevice">
                    <section class="textCategory"><p id="qcaraio`+ idFilter + `">${element.modelo}</p></section>
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


function deviceDetail(id) {
    // Div para conter os botoes do buzzer e de opções
    addInputdiv.innerHTML = "";
    const divButtonsTop = document.createElement("div");
    divButtonsTop.classList.add('topInfoDevice');
    divButtonsTop.setAttribute("id", "topButtonsDevice");
    addInputdiv.appendChild(divButtonsTop);
    const topButtonsList = document.querySelector("#topButtonsDevice");

    const deced = document.querySelector("#currentLocDev");
    const decedd = document.querySelector("#lastLocDev");
    deced.innerHTML = "";
    decedd.innerHTML = "";
    register.innerHTML = "";

    console.log("BUCETAAAAA");
    $.ajax({
        url: "http://127.0.0.1:5500/wifi/",
        type: 'GET',
        success: data => {
            data.forEach(element => {
                // Botão Buzzer definições de propriedades
                const buttonBuzzer = document.createElement("button");
                buttonBuzzer.classList.add('volButton');
                buttonBuzzer.setAttribute("id", "btnMusic");
                buttonBuzzer.setAttribute("onclick", `buttonBuzzer('${element._id}')`);
                // Botão opções definições de propriedades
                const moreButtonsTopDev = document.createElement("div");
                moreButtonsTopDev.classList.add('dropdown');
                // Inputs definições de propriedades
                const inputDiv = document.createElement("div");
                inputDiv.classList.add('inputsDevice');
                inputDiv.setAttribute("id", "inputsDivs");
                // Informações de registro
                const tittleView = document.createElement("div");
                tittleView.classList.add('registerr');
                tittleView.innerHTML = `
                <p>Registrado em ${element.timestamp}</p>
                <div class="connectDevide">
                    <img class="circleFillGreenInfo" src="../imagens/circleFillGreen.png" alt="">
                    <p>Conectado</p>
                </div>
                `
                buttonBuzzer.innerHTML = `
                <img src="../imagens/volume-2.svg" alt="">
                `
                moreButtonsTopDev.innerHTML = `
                <button id="btnMore" class="moreButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="../imagens/more-horizontal.svg" alt="">
                </button>
                <ul class="dropdown-menu">
                    <li><button onclick="editInfos('${element._id}')" class="btn"><img src="../imagens/editInfos.png" width="30" height="30" alt=""><span class="editSpan">Editar</span></button></li>
                    <li><button class="btn"><img src="../imagens/attInfos.png" width="30" height="30" alt=""><span class="attSpan">Atualizar</span></button></li>
                    <li><button onclick="removeDevice('${element._id}')" class="btn"><img src="../imagens/removeDevices.png" width="30" height="30" alt=""><span class="removSpan">Desconectar</span></button></li>
                </ul>
                `
                inputDiv.innerHTML = `
                <div class="oneInput">
                    <label>Nome do Dispositivo</label>
                    <input name="${element._id}" onfocusout="disableField(0,'${element._id}','${element.rec}')" class="inputInfoDevice" type="text" value="${element.rec}" placeholder="Nome do Dispositivo" disabled>
                    <label>Versão</label>
                    <input name="${element._id}" onfocusout="disableField(1,'${element._id}','${element.rec}')" class="inputInfoDevice" type="text" value="${element.version}" placeholder="Versão" disabled>
                    <label>ID do Dispositivo</label>
                    <input name="${element._id}" onfocusout="disableField(2,'${element._id}','${element.rec}')" class="inputInfoDevice" type="text" value="${element.idd}" placeholder="ID do Dispositivo" disabled>
                    
                </div>
                <div class="twoInput">
                    <label>Ultima atualização</label>
                    <input name="${element._id}" onfocusout="disableField(3,'${element._id}','${element.rec}')" class="inputInfoDevice" type="text" value="${element.timestamp}" placeholder="Ultima atualização" disabled>
                    <label>Beacon Patrimônio</label>
                    <input name="${element._id}" onfocusout="disableField(4,'${element._id}','${element.rec}')" class="inputInfoDevice" type="text" value="${element.beaconP}" placeholder="Beacon Patrimônio" disabled>
                    <label>ID do Produto</label>
                    <input name="${element._id}" onfocusout="disableField(5,'${element._id}','${element.rec}')" class="inputInfoDevice" type="text" value="${element.idp}"placeholder="ID do Produto" disabled>
                </div>
                `
                const currentLoc = `${element.localizacao}`;
                const lastLoc = `${element.localizacao}`;
                var idDevicess = `${element._id}`;
                if (idDevicess == id) {
                    register.appendChild(tittleView);
                    $("#currentLocDev").append(currentLoc);
                    $("#lastLocDev").append(lastLoc);
                    topButtonsList.appendChild(buttonBuzzer);
                    topButtonsList.appendChild(moreButtonsTopDev);
                    addInputdiv.appendChild(inputDiv);
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

function filterCategory(id) {
    if (activeFilter == true) {
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
            } else {
                buttonDevFilter[i].style.display = "none";
            }
        }
    }
}

function cleanfilter() {
    var geralDevicesht, buttonDevFilter, i;
    geralDevicesht = document.getElementById("geralDevices"); // section with all buttons of devices 
    buttonDevFilter = geralDevicesht.getElementsByTagName("button"); // button for display none or not
    for (i = 0; i < buttonDevFilter.length; i++) {
        buttonDevFilter[i].style.display = "";
    }

}

function editInfos(id) {
    for (i = 0; i <= 5; i++) {
        document.getElementsByName(id)[i].disabled = false;
        document.getElementsByName(id)[i].placeholder = "";
        document.getElementsByName(id)[i].style.background = "white";
    }
}

function disableField(n, id) {
    var inputs = document.getElementsByName(id);
    const editInput = {
        "url": `http://127.0.0.1:5500/wifi/${id}`,
        "method": "PATCH",
        "timeout": 0,
        "data": {
            "rec": inputs[0].value, 
            "version": inputs[1].value,
            "idd": inputs[2].value,
            "timestamp": inputs[3].value,
            "beaconP": inputs[4].value,
            "idp": inputs[5].value,
        }
    };

    $.ajax(editInput);
    document.getElementsByName(id)[n].disabled = true;
    document.getElementsByName(id)[n].style.background = "#F2F2F2";
}

function buttonBuzzer(id) {
    var buzzer = {
        "url": `http://127.0.0.1:5500/wifi/buzer/${id}`,
        "method": "PATCH",
        "timeout": 0,
        "data": {
            "buzer": 1,
        }
    };

    $.ajax(buzzer);
}

function removeDevice(id){
    var deleteDev = {
        "url": `http://127.0.0.1:5500/wifi/del/${id}`,
        "method": "DELETE",
        "timeout": 0,
    };

    $.ajax(deleteDev);
}
