$(document).ready(() => {
    getDevices();
});

function cleanInfos(){
    const deced = document.querySelector("#currentLocDev");
    const decedd = document.querySelector("#lastLocDev");
    addInputdiv.innerHTML = "";
    deced.innerHTML = "";
    decedd.innerHTML = "";
    register.innerHTML = "";
    geralDevices.innerHTML = "";
}

const geralDevices = document.querySelector("#geralDevices");
const lastLocation = document.querySelector("#lastLocation");
const register = document.querySelector("#registerData");
const addInputdiv = document.querySelector("#info");
const addperdiv = document.querySelector("#divinfoperi");
const imgPer = document.createElement("img");
imgPer.classList.add('perimeterGreen');
imgPer.setAttribute("src", "../imagens/perimeterRigth.png");

var aux = 0;
var idFilter = 0;
var activeFilter = false;


const getDevices = () => {
    var ndev = 0;
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
                <p>Registrado em ${element.register}</p>
                <div class="connectDevide">
                    <img class="circleFillGreenInfo" src="../imagens/circleFillGreen.png" alt="">
                    <p>Conectado</p>
                </div>
                `
                buttonBuzzer.innerHTML = `
                <img src="../imagens/volume-2.svg" alt="">
                `
                //<li><button onclick="attDevice('${element._id}')" class="btn"><img src="../imagens/attInfos.png" width="30" height="30" alt=""><span class="attSpan">Atualizar</span></button></li>
                moreButtonsTopDev.innerHTML = `
                <button id="btnMore" class="moreButton" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="../imagens/more-horizontal.svg" alt="">
                </button>
                <ul class="dropdown-menu">
                    <li><button onclick="editInfos('${element._id}')" class="btn"><img src="../imagens/editInfos.png" width="30" height="30" alt=""><span class="editSpan">Editar</span></button></li>
                    <li><button onclick="removeDevice('${element._id}')" class="btn"><img src="../imagens/removeDevices.png" width="30" height="30" alt=""><span class="removSpan">Desconectar</span></button></li>
                </ul>
                `
                inputDiv.innerHTML = `
                <div class="oneInput">
                    <label>Nome do Dispositivo</label>
                    <input name="${element._id}" onfocusout="disableField(0,'${element._id}')" class="inputInfoDevice" type="text" value="${element.rec}" placeholder="Nome do Dispositivo" disabled>
                    <label>Versão</label>
                    <input name="${element._id}" onfocusout="disableField(1,'${element._id}')" class="inputInfoDevice" type="text" value="${element.version}" placeholder="Versão" disabled>
                    <label>Status</label>
                    <input name="${element._id}" onfocusout="disableField(2,'${element._id}')" class="inputInfoDevice" type="text" value="${element.status}" placeholder="Status" disabled>
                    
                </div>
                <div class="twoInput">
                    <label>Ultima atualização</label>
                    <input name="${element._id}" onfocusout="disableField(3,'${element._id}')" class="inputInfoDevice" type="text" value="${element.timestamp}" placeholder="Ultima atualização" disabled>
                    <label>Beacon Patrimônio</label>
                    <input name="${element._id}" onfocusout="disableField(4,'${element._id}')" class="inputInfoDevice" type="text" value="${element.beaconP}" placeholder="Beacon Patrimônio" disabled>
                    <label>Custodia</label>
                    <input name="${element._id}" onfocusout="disableField(5,'${element._id}')" class="inputInfoDevice" type="text" value="${element.custody}"placeholder="Custodia" disabled>
                </div>
                `
                const currentLoc = `${element.loc}`;
                const lastLoc = `${element.locAnterior}`;
                var idDevicess = `${element._id}`;
                if (idDevicess == id) {
                    register.appendChild(tittleView);
                    $("#currentLocDev").append(currentLoc);
                    $("#lastLocDev").append(lastLoc);
                    addperdiv.appendChild(imgPer);
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
    var categoryAr = ["Desktop", "IPAD", "Notebook", "Chrome", "Apple Pencil"];
    var filter, geralDevicesht, buttonDevFilter, pfilter, i, txtValue;

    filter = categoryAr[id];
    geralDevicesht = document.getElementById("geralDevices"); // section with all buttons of devices 
    buttonDevFilter = geralDevicesht.getElementsByTagName("button"); // button for display none or not

    for (i = 0; i < buttonDevFilter.length; i++) {
        pfilter = document.getElementById("qcaraio" + i);

        if (pfilter) {
            txtValue = pfilter.textContent || pfilter.innerText;
            if (txtValue.indexOf(filter) > -1) {
                buttonDevFilter[i].style.display = "";
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
        console.log("sddfdsf");
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
    cleanInfos();
    getDevices();
    deviceDetail(id);
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
    cleanInfos();
    getDevices();
}
