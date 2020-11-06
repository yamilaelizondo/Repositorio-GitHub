var usersList = [];
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
    $('#confirmButton').click(function() {
        var nombreUsuario = $("#nameUser").val();
        var apellidoUsuario = $("#surnameUser").val();
        var edadUsuario = $("#ageUser").val();
        var emailUsuario = $("#emailUser").val();
        var telefonoUsuario = $("#mobileUser").val();
        var contraseñaUsuario = $("#passwordUser").val();
    });


    function nuevosUsuarios() {
        localStorage.setItem('nombre', nombreUsuario);
        localStorage.setItem('apellido', apellidoUsuario);
        localStorage.setItem('edad', edadUsuario);
        localStorage.setItem('telefono', telefonoUsuario);
        var newUsers = new Usuario()
        usersList.push(newUsers)
    }
});