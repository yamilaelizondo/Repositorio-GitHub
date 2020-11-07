var listaUsuarios = [];
var jsonData;
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
        //listaUsuarios.push(nuevoUsuario);
        //guardoListaDeUsuariosEnLocalStorage();
    }

    function guardoListaDeUsuariosEnLocalStorage() {


        //console.log(localStorage.getItem("LISTA_DE_USUARIOS"));
    }

    function reconviertoAJson() {
        var listaUsuarios = [];
        jsonData = JSON.parse(localStorage.getItem("LISTA_DE_USUARIOS"));
        alert(jsonData.length);
        for (var i = 0; i < jsonData.length; i++) {
            var userData = jsonData[i];
            if (usuario == userData.email && contrasenia == userData.contraseña) {
                alert(userData.nombre);
                window.location.href = "mainPage.html";
            }
            //crearUsuario(userData.nombre, userData.apellido, userData.edad, userData.email, userData.telefono, userData.contraseña);
        }
    }


    $("#loginButton").click(function() {
        usuario = $("#inputUserName").val();
        contrasenia = $("#inputContraseña").val();
        reconviertoAJson();
    });

});