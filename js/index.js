document.addEventListener("DOMContentLoaded", function(e) {
    var usuario = "";
    var contrasenia = "";

    $("#loginButton").click(function() {
        usuario = $("#inputUserName").val();
        contrasenia = $("#inputContraseña").val();
        if (usuario == "yami@mail.com" && contrasenia == "1234") {
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('contrasenia', contrasenia);
            $(location).attr('href', 'mainPage.html');
        } else {
            alert("Error con usuario y o contraseña");
        }

    });
});