$(document).ready(() => {
  listCard.innerHTML = rooms;
});


const geralatv = document.querySelector("#geralatv");
const geralatv2 = document.querySelector("#geralatv2");
const tittleModal = document.querySelector("#top1");
const tittleModal2 = document.querySelector("#top12");
const listCard = document.querySelector("#list");
var modal = document.getElementById("myModall");
var modal2 = document.getElementById("myModall2");
var aux = 0;
var idFilter = 0;
var kkkk;


function bttnCard(id){
  const div = document.createElement("div");
  div.classList.add('devices');
  div.innerHTML = "";
  geralatv.innerHTML = "";
  var arrAtv = ["Cadeiras", "Cadeiras com rodas", "Quadro branco", "Violão", "Violino", "Flauta"];
  $.ajax({
    async: true,
    url: "/room/find",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            if(id == 0){kkkk = `${element.qtdCad}`;}if(id == 1){kkkk = `${element.qtdCadRod}`;}if(id == 2){kkkk = `${element.qtdQuad}`;}if(id == 3){kkkk = `${element.qtdviol}`;}if(id == 4){kkkk = `${element.qtdvioli}`;}if(id == 5){kkkk = `${element.qtdflaut}`;}
            div.innerHTML = `
            <div class="devices">
              <div class="textDevices">
                  <div>
                      <span class="tittleRoom"><p><b>${element.nameRoom}</b></p></span>
                      <p class="pQtnd">Quantidade: ${kkkk}</p>
                  </div>
              </div>
              <div class="imgCategoryDevice">
                  <button onclick="detailRoom('${element.nameRoom}', '${arrAtv[id]}')" class="infoButtonn">Visualizar listagem da sala: <img style="width: 22px; height: 22px;" src="../imagens/arrowLeftt.png" alt=""></button>
              </div>
            </div>
            `
            tittleModal.innerHTML= `${arrAtv[id]} por salas`
            geralatv.appendChild(div);
            modal.style.display = "block";
        });
    }
  })
  console.log("Função Funcionando");
  console.log(arrAtv[id])
}

function closeModal(){
    modal.style.display = "none";
}

function closeModal2(){
  modal.style.display = "none";
  modal2.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

window.onclick = function(event) {
  if (event.target == modal2) {
    modal.style.display = "none";
    modal2.style.display = "none";
  }
}

function detailRoom(nameRoom, model){
  const divv = document.createElement("div");
  divv.classList.add('devices');
  divv.innerHTML = "";
  geralatv.innerHTML = "";
  $.ajax({
    async: true,
    url: `/rfid/find`,
    type: 'GET',
    success: data => {
        data.forEach(element => {
          divv.innerHTML = `
            <div class="textDevices">
                <div>
                    <span class="tittleRoom"><p><b>${element.modelo}</b></p></span>
                </div>
            </div>
            <div class="imgCategoryDevice">
                <span class="textpatri"><b>Patrimônio Beacon: </b></span>
                <section class="textCategory"><p id="pfilter`+idFilter+`">${element.beaconP}</p></section>
            </div>
            `
            tittleModal2.innerHTML= `Listagem da ${nameRoom}`
            var tsts = `${element.salaatt}`;
            if(tsts == nameRoom){
              geralatv2.appendChild(divv);
              modal2.style.display = "block"
            }
            
            ;
        });
    }
  })
  console.log("Função Funcionando");
}

function bttnRoom(id){
  const divv = document.createElement("div");
  divv.classList.add('devices');
  divv.innerHTML = "";
  geralatv.innerHTML = "";
  $.ajax({
    async: true,
    url: `/room/${id}`,
    type: 'GET',
    success: data => {
        data.forEach(element => {
          divv.innerHTML = `
            <div class="textDevices">
                <div>
                    <span class="tittleRoom"><p><b>${element.modelo}</b></p></span>
                </div>
            </div>
            <div class="imgCategoryDevice">
                <span class="textpatri"><b>Patrimônio Beacon: </b></span>
                <section class="textCategory"><p id="pfilter`+idFilter+`">${element.beaconP}</p></section>
            </div>
            `
            tittleModal2.innerHTML= `Listagem da ${nameRoom}`
            var tsts = `${element.salaatt}`;
            if(tsts == nameRoom){
              geralatv2.appendChild(divv);
              modal2.style.display = "block"
            }
            ;
        });
    }
  })
  console.log("Função Funcionando");
  console.log("Mostrando os moveis da sala " + id);
}

function filterFurnit(){
  listCard.innerHTML = "";
  listCard.innerHTML = rooms;

}

function filterRoom(){
  listCard.innerHTML = "";
  listCard.innerHTML = cards;
}


const cards = `
<div class="rowFurniture">
    <button onclick="bttnRoom(0)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/imageRoom.png" alt=""></div>
            <div class="cardText"><h4>Sala-01</h4></div>
        </div>
    </button>
    <button onclick="bttnRoom(1)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/imageRoom.png" alt=""></div>
            <div class="cardText"><h4>Sala-02</h4></div>
        </div>
    </button>
    <button onclick="bttnRoom(2)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/imageRoom.png" alt=""></div>
            <div class="cardText"><h4>Sala-03</h4></div>
        </div>
    </button>
</div>
<div class="rowFurnitureDown">
    <button onclick="bttnRoom(3)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/imageRoom.png" alt=""></div>
            <div class="cardText"><h4>Sala-04</h4></div>
        </div>
    </button>
    <button onclick="bttnRoom(4)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/imageRoom.png" alt=""></div>
            <div class="cardText"><h4>Sala-05</h4></div>
        </div>
    </button>
    <button onclick="bttnRoom(5)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/imageRoom.png" alt=""></div>
            <div class="cardText"><h4>Sala-06</h4></div>
        </div>
    </button>
</div>
`;

const rooms = `
<div class="rowFurniture">
    <button onclick="bttnCard(0)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/Chair.png" alt=""></div>
            <div class="cardText"><h4>Cadeiras</h4></div>
        </div>
    </button>
    <button onclick="bttnCard(1)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/wheelChair.png" alt=""></div>
            <div class="cardText"><h4>Cadeiras com rodas</h4></div>
        </div>
    </button>
    <button onclick="bttnCard(2)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/whiteBoard.png" alt=""></div>
            <div class="cardText"><h4>Quadro branco</h4></div>
        </div>
    </button>
</div>
<div class="rowFurnitureDown">
    <button onclick="bttnCard(3)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/guitar.png" alt=""></div>
            <div class="cardText"><h4>Violão</h4></div>
        </div>
    </button>
    <button onclick="bttnCard(4)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/violin.png" alt=""></div>
            <div class="cardText"><h4>Violino</h4></div>
        </div>
    </button>
    <button onclick="bttnCard(5)" class="buttonCard">
        <div class="cardDevicess">
            <div class="cardImage"><img src="../imagens/flute.png" alt=""></div>
            <div class="cardText"><h4>Flauta</h4></div>
        </div>
    </button>
</div>
`;