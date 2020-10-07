document.addEventListener("DOMContentLoaded",function(){
var barToAppend = 
    `
<nav class="site-header sticky-top py-1 bg-dark">
      <div id="case" class="container d-flex flex-column flex-md-row justify-content-between">
        <a class="py-2 d-none d-md-inline-block" href="mainPage.html">Inicio</a>
        <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
        <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
        <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
        <div id="menu">
          <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="usuarioConectado" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            `+localStorage.getItem("usuario")+`</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" href="my-profile.html">Mi perfil</a>  
              <a class="dropdown-item" href="cart.html">Mi carrito </a>
              <a id="cerrar_btn" class="dropdown-item" href="#">Cerrar Sesión</a>
            </div>
          </div>
        </div>
      </div>
    </nav>`
    document.getElementById("barContainer").innerHTML = barToAppend;




    document.getElementById("cerrar_btn").addEventListener("click", function(){
        localStorage.clear();
        window.location.href = "index.html";
        alert("Gracias por su visita");
      });
});