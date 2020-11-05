document.addEventListener("DOMContentLoaded",function(){
var barToAppend = //site-header sticky-top py-1 bg-dark//
    `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="mainPage.html">Inicio</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="categories.html">Categorías<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="products.html">Productos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="sell.html">Vender</a>
      </li>
      <li class="nav-item dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="usuarioConectado" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            `+localStorage.getItem("usuario")+`
        </button>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
          <a class="dropdown-item" href="cart.html">Mi Carrito</a>
          <a class="dropdown-item" id="cerrar_btn" href="#">Cerrar Sesión</a>
        </div>
      </li>
    </ul>
  </div>
</nav>`
    document.getElementById("barContainer").innerHTML = barToAppend;




    document.getElementById("cerrar_btn").addEventListener("click", function(){
        localStorage.clear();
        window.location.href = "index.html";
        alert("Gracias por su visita");
      });
});