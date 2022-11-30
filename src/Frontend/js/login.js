function login(){

    var e_mail = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    $.ajax({
        url: "",
        type: '',
        data:{email: e_mail, senha: password},
        success: data => {
            console.log(data);
            if(data) {
                console.log("Login Correto");
                window.location.replace("");
            }
            else{
                alert("Dados incorretos!");
            }
        }
    });
}