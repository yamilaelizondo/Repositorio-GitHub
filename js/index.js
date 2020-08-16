//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    const formulario = document.getElementById("loginForm");
   
        formulario.loginButton.addEventListener("click", function(){ 
            if (formulario.userName.value=='yami@mail.com' && formulario.password.value=='1234'){ 
                //document.form.submit(); 
                window.location.href = "mainPage.html";
                localStorage.setItem('usuario', formulario.userName.value);
                localStorage.setItem('contraseña', formulario.password.value);
                alert("El usuario conectado es " + localStorage.getItem('usuario'));
            } 
            else{ 
                 alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
            } 
        });
});