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
        if (!localStorage.getItem("LISTA_DE_USUARIOS") == "" || (!localStorage.getItem("LISTA_DE_USUARIOS") == null)) {
            localStorage.setItem("LISTA_DE_USUARIOS", (localStorage.getItem("LISTA_DE_USUARIOS")) + JSON.stringify(new Usuario(nombre, apellido, edad, email, telefono, contraseña)));
        } else {
            localStorage.setItem("LISTA_DE_USUARIOS", (JSON.stringify(new Usuario(nombre, apellido, edad, email, telefono, contraseña))));
        }
    }

    function reconviertoAJson(usuario, contrasenia) {
        const start = "[";
        const end = "]";
        var existe = false;
        //
        var str = localStorage.getItem("LISTA_DE_USUARIOS");
        var n = str.includes(start || end);
        if (n == false) {
            var editoStringOne = start + localStorage.getItem("LISTA_DE_USUARIOS") + end;
            var editoStringTwo = editoStringOne.replace(/}/g, "},");
            var editoStringTwo = editoStringOne.replace(/}/g, "},");
            var editoStringFinal = editoStringTwo.replace(/},]/g, "}]");
            localStorage.setItem("LISTA_DE_USUARIOS", editoStringFinal);
        } else {
            var editoStringOne = localStorage.getItem("LISTA_DE_USUARIOS");
            var editoStringTwo = editoStringOne.replace(/}]{/g, "},{");
            var editoStringFinal = editoStringTwo.replace(/\/}/g, "}]");
            console.log(editoStringFinal);
            localStorage.setItem("LISTA_DE_USUARIOS", editoStringFinal + end);
        }

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