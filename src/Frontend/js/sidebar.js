$(document).ready(function () {
    $("#nav").load("navbar.html", function () {
        $("#btn").on('click', showmenu);
    });
});

function shownavbar() {
    navigator.classList.toggle('active');
}