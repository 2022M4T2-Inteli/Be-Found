function login(){

    var e_mail = document.getElementById("email").value;
    var password = document.getElementById("senha").value;

    console.log(e_mail, password)

    $.ajax({
        url: "http://127.0.0.1:5500/log/login",
        type: 'POST',
        data: {
            username: e_mail, password: password
        },
       success: (d) =>{
         if (d.message == "Login successful!") {
            setTimeout(()=>{
                window.location = "/eletronicDevices"
             },1500)
         }
       } 
    });
}