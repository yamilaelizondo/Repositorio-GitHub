//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
   
        document.getElementById("loginButton").addEventListener("click", function(){ 
            if (document.loginForm.userName.value=='yami@coso.com' && document.loginForm.password.value=='1234'){ 
                //document.form.submit(); 
                window.location.href = "mainPage2.html";
                //alert("coso");
            } 
            else{ 
                 alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
            } 
        });
});