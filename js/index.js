class Usuario {
    constructor(nombre, apellido, edad, email, telefono, contraseña, imagen) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.telefono = telefono;
        this.contraseña = contraseña;
        this.imagen = imagen;
    }
}
document.addEventListener("DOMContentLoaded", function(e) {

    $("#registerButton").click(function() {
        crearUsuario($("#nameUser").val(), $("#surnameUser").val(), $("#ageUser").val(), $("#emailUser").val(),
            $("#mobileUser").val(), $("#passwordUser").val());
    });
    const start = "[";
    const end = "]";

    function crearUsuario(nombre, apellido, edad, email, telefono, contraseña) {
        if (!localStorage.getItem("LISTA_DE_USUARIOS") == "" || (!localStorage.getItem("LISTA_DE_USUARIOS") == null)) {
            localStorage.setItem("LISTA_DE_USUARIOS", (localStorage.getItem("LISTA_DE_USUARIOS")) + JSON.stringify(new Usuario(nombre, apellido, edad, email, telefono, contraseña, "")));
            //

        } else {
            localStorage.setItem("LISTA_DE_USUARIOS", (start + JSON.stringify(new Usuario(nombre, apellido, edad, email, telefono, contraseña, "")) + end));
        }
    }

    function reconviertoAJson(usuario, contrasenia) {

        var existe = false;
        localStorage.setItem("LISTA_DE_USUARIOS", (localStorage.getItem("LISTA_DE_USUARIOS").replace(/}]{/gm, "},{").replace(/}{/, "},{").replace(/]+/gm, "")) + end);
        console.log(localStorage.getItem(("LISTA_DE_USUARIOS")));

        var jsonData = JSON.parse(localStorage.getItem(("LISTA_DE_USUARIOS")));

        for (var i = 0; i < jsonData.length; i++) {
            var userData = jsonData[i];
            if (usuario == userData.email && contrasenia == userData.contraseña) {
                existe = true;
                localStorage.setItem("NOMBRE", userData.nombre);
                localStorage.setItem("APELLIDO", userData.apellido);
                localStorage.setItem("EDAD", userData.edad);
                localStorage.setItem("EMAIL", usuario);
                localStorage.setItem("TELÉFONO", userData.telefono);
                localStorage.setItem("CONTRASEÑA", userData.contraseña);
                localStorage.setItem("IMAGEN_DE_PERFIL", userData.imagen);
                window.location.href = "mainPage.html";
            }
        }
        if (existe == false) {
            alert("error con el usuario y/o la contraseña");
        }
    }

    $("#loginButton").click(function() {
        reconviertoAJson($("#inputUserName").val(), $("#inputContraseña").val());
    });

});