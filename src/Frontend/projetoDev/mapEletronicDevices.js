$(document).ready(() => {
    getDevices();
});
const localDisp = document.querySelector("#sala01");
var idFilter = 0;
var activeFilter = false;

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
                
                if(element.modelo == "Desktop"){
                    div.innerHTML = `
                        <div class="dropdown ativoEle">
                                <button id="disp`+idFilter+`" value="${element.rec}" name="Desktop" class="localDisp localizacao corRosa bolDesk" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                </button>
                                <ul id="infoDisp" class="dropdown-menu" style="padding: 10px;">
                                <li>Nome do dispositivo: ${element.rec}</li>
                                <li>Categoria do ativo: ${element.modelo}</li>
                                <li>Localização: ${element.loc}</li>
                                <li>Última atualização: ${element.status}</li>
                                <li><button onclick="infoAvancadas('${element._id}')" id="buttonInfo">Informações avançadas</button></li>
                                </ul>
                        </div>
                        `
                }else if(element.modelo == "IPAD"){
                    div.innerHTML = `
                    <div class="dropdown ativoEle">
                            <button id="disp`+idFilter+`" value="${element.rec}" name="IPAD" class="localDisp localizacao corVerde bolDesk" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <ul id="infoDisp" class="dropdown-menu" style="padding: 10px;">
                              <li>Nome do dispositivo: ${element.rec}</li>
                              <li>Categoria do ativo: ${element.modelo}</li>
                              <li>Localização: ${element.loc}</li>
                              <li>Última atualização: ${element.status}</li>
                              <li><button onclick="infoAvancadas('${element._id}')" id="buttonInfo">Informações avançadas</button></li>
                            </ul>
                    </div>
                    `
                }else if(element.modelo == "Notebook"){
                    div.innerHTML = `
                    <div class="dropdown ativoEle">
                            <button id="disp`+idFilter+`" value="${element.rec}" name="Notebook" class="localDisp localizacao corRoxo bolDesk" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <ul id="infoDisp" class="dropdown-menu" style="padding: 10px;">
                              <li>Nome do dispositivo: ${element.rec}</li>
                              <li>Categoria do ativo: ${element.modelo}</li>
                              <li>Localização: ${element.loc}</li>
                              <li>Última atualização: ${element.status}</li>
                              <li><button onclick="infoAvancadas('${element._id}')" id="buttonInfo">Informações avançadas</button></li>
                            </ul>
                    </div>
                    `
                }else if(element.modelo == "Chrome"){
                    div.innerHTML = `
                    <div class="dropdown ativoEle">
                            <button id="disp`+idFilter+`" value="${element.rec}" name="Chrome" class="localDisp localizacao corAzulEscuro bolDesk" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <ul id="infoDisp" class="dropdown-menu" style="padding: 10px;">
                              <li>Nome do dispositivo: ${element.rec}</li>
                              <li>Categoria do ativo: ${element.modelo}</li>
                              <li>Localização: ${element.loc}</li>
                              <li>Última atualização: ${element.status}</li>
                              <li><button onclick="infoAvancadas('${element._id}')" id="buttonInfo">Informações avançadas</button></li>
                            </ul>
                    </div>
                    `
                }else{
                    div.innerHTML = `
                    <div class="dropdown ativoEle">
                            <button id="disp`+idFilter+`" value="${element.rec}" name="ApplePencil" class="localDisp localizacao corAzulClaro bolDesk" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            </button>
                            <ul id="infoDisp" class="dropdown-menu" style="padding: 10px;">
                              <li>Nome do dispositivo: ${element.rec}</li>
                              <li>Categoria do ativo: ${element.modelo}</li>
                              <li>Localização: ${element.loc}</li>
                              <li>Última atualização: ${element.status}</li>
                              <li><button onclick="infoAvancadas('${element._id}')" id="buttonInfo">Informações avançadas</button></li>
                            </ul>
                    </div>
                    `    
                }

                idFilter += 1;
                for(var i=1; i<52; i++){
                    if(element.loc == "Sala "+i){
                        document.querySelector("#a"+i).appendChild(div);
                    }
                    else if(i<10 && element.loc == "Sala 0"+i){
                        document.querySelector("#a0"+i).appendChild(div);
                    }
                }
                //localDisp.appendChild(div);
            });
        }
    })
};

function infoAvancadas(id){
    window.open("paginas/eletronicDevices.html?"+id);
}

/*
function searchFilter() {
    var input, filter, buttonDev, p, i, txtValue;

    input = document.getElementById("searchName");
    filter = input.value.toUpperCase();
    buttonDev = document.getElementsByName("botaoDisp"); // button for display none or not

    for (i = 0; i < buttonDev.length; i++) {
        p = buttonDev[i].value;
        console.log(p);
        if (p) {
            txtValue = p;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                buttonDev[i].style.display = "";
            } else {
                buttonDev[i].style.display = "none";
            }
        }
    }
}
*/

function searchFilter() {
    var input, filter, buttonDev, p, i, txtValue;

    input = document.getElementById("searchName");
    filter = input.value.toUpperCase();
    buttonDev = document.getElementsByClassName("localDisp"); // button for display none or not

    for (i = 0; i < buttonDev.length; i++) {
        p = buttonDev[i].value;
        console.log(p);
        if (p) {
            txtValue = p;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                buttonDev[i].style.display = "";
            } else {
                buttonDev[i].style.display = "none";
            }
        }
    }
}



/*
TESTE 1
function filterCategory(id) {
    if (activeFilter == true) {
        cleanfilter();
    };
    activeFilter = true;
    var categoryAr = ["Desktop", "IPAD", "Notebook", "Chrome", "ApplePencil"];
    var filter, buttonDevFilter, i, txtValue;

    filter = categoryAr[id];
    buttonDevFilter = document.getElementsByClassName("localDisp"); // button for display none or not

    console.log(buttonDevFilter.length)

    console.log(buttonDevFilter);
    for (i = 0; i < buttonDevFilter.length; i++) {
        txtValue = document.getElementById("disp" + i).name;
        if (txtValue == filter) {
            buttonDevFilter[i].style.display = "";
        }else{

            buttonDevFilter[i].style.display = "none";
        }
    }
}
*/
/*
function filterCategory(id) {
    if (activeFilter == true) {
        cleanfilter();
    };
    activeFilter = true;
    var categoryAr = ["Desktop", "IPAD", "Notebook", "Chrome", "ApplePencil"];
    var filter, buttonDevFilter, i, txtValue;

    filter = categoryAr[id];
    buttonDevFilter = document.getElementsByClassName("localDisp"); // button for display none or not

    console.log(buttonDevFilter.length)

    console.log(buttonDevFilter);
    for (i = 0; i < buttonDevFilter.length; i++) {
        txtValue = document.getElementById("disp" + i).name;
        if (txtValue == filter) {
            buttonDevFilter[i].style.display = "";
        }else{

            buttonDevFilter[i].style.display = "none";
        }
    }
}
*/

function cleanfilter() {
    var buttonDevFilter, i;
    buttonDevFilter = document.getElementsByClassName("localDisp"); // button for display none or not
    for (i = 0; i < buttonDevFilter.length; i++) {
        buttonDevFilter[i].style.display = "";
    }

}