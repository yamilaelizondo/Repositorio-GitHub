var logueado = false;
if (localStorage.getItem("EMAIL") == undefined || localStorage.getItem("EMAIL") == null || localStorage.getItem("EMAIL") == "") {
    alert("Debe iniciar sesión");
    window.location.href = "index.html";
} else {
    logueado = true;
}