document.addEventListener("DOMContentLoaded", function(e) {
    var htmlContentToAppend = "";
    htmlContentToAppend + -
        `<div class="container rounded bg-white mt-5">
            <div class="row">
                <div class="col-md-4 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src="img/avatar.jpg" width="90">
                        <div class="mt-4 text-right"><button class="btn btn-primary profile-button" type="button">Cargar Imagen</button></div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="p-3 py-5">
                        <div class="d-flex align-items-center mb-3">
                            <div class="d-flex flex-row align-items-center back"><i class=""></i>
                                <h2>Mi Perfil</h2>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6"><input type="text" class="form-control" placeholder="Nombre" value="" required></div>
                            <div class="col-md-6"><input type="text" class="form-control" value="" placeholder="Apellido"></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><input type="text" class="form-control" placeholder="Edad" value="" required></div>
                            <div class="col-md-6"><input type="text" class="form-control" value="" placeholder="Email"></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><input type="text" class="form-control" placeholder="Teléfono" value="` + localStorage.getItem('usuario') + `" required></div>
                        </div>
                        <div class="mt-5 text-right"><button class="btn btn-primary profile-button" type="button">Guardar Cambios</button></div>
                    </div>
                </div>
        </div>`

    document.getElementById("profileContainer").innerHTML = htmlContentToAppend;
});