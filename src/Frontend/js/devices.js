const geralatv = document.querySelector("#geralatv");
const geralatv2 = document.querySelector("#geralatv2");
const tittleModal = document.querySelector("#top1");
const tittleModal2 = document.querySelector("#top12");
var modal = document.getElementById("myModall");
var modal2 = document.getElementById("myModall2");
var aux = 0;
var idFilter = 0;


function bttnCard(id){
  const div = document.createElement("div");
  div.classList.add('devices');
  div.innerHTML = "";
  var arrAtv = ["Cadeiras", "Cadeiras com rodas", "Quadro branco", "Violão", "Violino", "Flauta"];
  $.ajax({
    async: true,
    url: "/room/find",
    type: 'GET',
    success: data => {
        data.forEach(element => {
            div.innerHTML = `
            <div class="textDevices">
                <div>
                    <span class="tittleRoom"><p><b>${element.nameRoom}</b></p></span>
                    <p class="pQtnd">Quantidade: 34</p>
                </div>
            </div>
            <div class="imgCategoryDevice">
                <button onclick="detailRoom('${element.nameRoom}', '${arrAtv[id]}')" class="infoButtonn">Visualizar listagem da sala: <img style="width: 22px; height: 22px;" src="../imagens/arrowLeftt.png" alt=""></button>
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
  $.ajax({
    async: true,
    url: `/room/${id}`,
    type: 'GET',
    success: data => {
        data.forEach(element => {
          divv.innerHTML = `
            <div class="textDevices">
                <div>
                    <span class="tittleRoom"><p><b>${model} ${aux}</b></p></span>
                </div>
            </div>
            <div class="imgCategoryDevice">
                <span class="textpatri"><b>Patrimônio Beacon: </b></span>
                <section class="textCategory"><p id="pfilter`+idFilter+`">${element.beaconP}</p></section>
            </div>
            `
            tittleModal2.innerHTML= `Listagem da ${nameRoom}`
            geralatv2.appendChild(divv);
            modal2.style.display = "block";
            aux ++;
        });
    }
  })
  console.log("Função Funcionando");
  console.log(`Visualizando os ativos ${model} da ${nameRoom}`)
}