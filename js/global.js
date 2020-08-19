const logueado = false;
if (localStorage.getItem("usuario") == null || localStorage.getItem("usuario") == undefined || localStorage.getItem("usuario") == ""){
window.location.href = "index.html"; 
} else {
    logueado = true;
}