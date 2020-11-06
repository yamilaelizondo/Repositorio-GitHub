document.addEventListener("DOMContentLoaded", function(e) {
    const formulario = document.getElementById("loginForm");

    formulario.loginButton.addEventListener("click", function() {
        if (formulario.userName.value == 'user@mail.com' && formulario.password.value == '1234') {
            localStorage.setItem('usuario', formulario.userName.value);
            localStorage.setItem('contrasenia', formulario.password.value);
            $(location).attr('href', 'cart.html');
        } else {
            $(location).attr('href', 'index.html');
            alert("Porfavor ingrese, nombre de usuario y contraseña correctos.");
        }
    });
});