var listaUsuarios = [];
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

        listaUsuarios.push(nuevoUsuario);
        guardoListaDeUsuariosEnLocalStorage();
    }

    function guardoListaDeUsuariosEnLocalStorage() {
        localStorage.setItem("LISTA_DE_USUARIOS", "");
        localStorage.setItem("LISTA_DE_USUARIOS", (JSON.stringify(listaUsuarios)));
        console.log(localStorage.getItem("LISTA_DE_USUARIOS"));
    }
});