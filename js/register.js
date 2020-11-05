document.addEventListener("DOMContentLoaded", function(e) {
    $('#confirmButton').click(function() {
        var nameUsuario = $("#nameUser").val();
        var apellidoUsuario = $("#surnameUser").val();
        var edadUsuario = $("#ageUser").val();
        var emailUsuario = $("#emailUser").val();
        var telefonoUsuario = $("#mobileUser").val();
        var contraseñaUsuario = $("#passwordUser").val();
    });
});