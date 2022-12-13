function login(){

    var e_mail = document.getElementById("email").value;
    var password = document.getElementById("senha").value;

    console.log(e_mail, password)

    $.ajax({
        url: "/log/login",
        type: 'POST',
        data: {
            username: e_mail, password: password
        },
       success: (response) =>{
         if (response.message == "Login successful!") {
            setTimeout(()=>{
                window.location = "/eletronicDevices"
             },1500)
         }
       } 
    });
}
