var listaUsuarios = [];
var usuario = "";
var contrasenia = "";
class Usuario {
    constructor(nombre, apellido, edad, email, telefono, contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.telefono = telefono;
        this.contraseña = contraseña;
    }
}

document.addEventListener("DOMContentLoaded", function(e) {

    $("#registerButton").click(function() {
        crearUsuario($("#nameUser").val(), $("#surnameUser").val(), $("#ageUser").val(), $("#emailUser").val(),
            $("#mobileUser").val(), $("#passwordUser").val());
    });

    function crearUsuario(nombre, apellido, edad, email, telefono, contraseña) {
        var nuevoUsuario = new Usuario(nombre, apellido, edad, email, telefono, contraseña);
        if (!localStorage.getItem("LISTA_DE_USUARIOS") == "" || (!localStorage.getItem("LISTA_DE_USUARIOS") == null)) {
            localStorage.setItem("LISTA_DE_USUARIOS", ((localStorage.getItem("LISTA_DE_USUARIOS") + JSON.stringify(nuevoUsuario))));
        } else {
            localStorage.setItem("LISTA_DE_USUARIOS", JSON.stringify(nuevoUsuario));
        }
    }

    function reconviertoAJson() {
        if (!localStorage.getItem("LISTA_DE_USUARIOS") == "" || (!localStorage.getItem("LISTA_DE_USUARIOS") == null)) {

            var jsonData = JSON.parse(localStorage.getItem("LISTA_DE_USUARIOS"));
            console.log(jsonData.length);
            for (var i = 0; i < jsonData.length; i++) {
                var userData = jsonData[i];
                alert("hola");
                if (usuario == userData.email && contrasenia == userData.contraseña) {

                    alert("Bienvenido " + userData.nombre);
                    //
                    localStorage.setItem("NOMBRE", userData.nombre);
                    localStorage.setItem("APELLIDO", userData.apellido);
                    localStorage.setItem("EDAD", userData.edad);
                    localStorage.setItem("EMAIL", userData.email);
                    localStorage.setItem("TELÉFONO", userData.telefono);
                    localStorage.setItem("CONTRASEÑA", userData.contraseña);
                    //
                    window.location.href = "mainPage.html";
                }
                //crearUsuario(userData.nombre, userData.apellido, userData.edad, userData.email, userData.telefono, userData.contraseña);
            }
        } else {
            alert("cualquiera");
        }

    }

    $("#loginButton").click(function() {
        usuario = $("#inputUserName").val();
        contrasenia = $("#inputContraseña").val();
        reconviertoAJson();
    });

});