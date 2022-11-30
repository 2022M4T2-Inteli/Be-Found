var modal = document.getElementById("myModal");

function teste(){
    modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}