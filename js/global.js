var logueado = false;
alert("leyendo");
if (localStorage.getItem("usuario") == undefined || localStorage.getItem("usuario") == null || localStorage.getItem("usuario") == ""){
    alert ("Debe iniciar sesión");
    window.location.href = "index.html"; 
} else {
    logueado = true;
}