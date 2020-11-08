document.addEventListener("DOMContentLoaded", function(e) {
    var htmlContentToAppend = "";
    htmlContentToAppend += `
        <div class="container rounded bg-white mt-5">
            <div class="row">
                <div class="col-md-4 border-right">
                <div class="avatar-upload">
                <div class="avatar-edit">
                    <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg" />
                    <label for="imageUpload"></label>
                </div>
                <div class="avatar-preview">
                    <div id="imagePreview" style="background-image: url('img/avatar.jpg');"></div>
                </div>
         </div>
                </div>
                <div class="col-md-8">
                    <div class="p-3 py-5">
                        <div class="d-flex align-items-center mb-3">
                            <div class="d-flex flex-row align-items-center back">
                                <i class=""></i>
                                <h2>Mi Perfil</h2>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-md-6"><input type="text" id="inputName" class="form-control" placeholder="Nombre" value="` + localStorage.getItem('NOMBRE') + `" required></div>
                            <div class="col-md-6"><input type="text" id="inputSurname" class="form-control" value="` + localStorage.getItem('APELLIDO') + `" placeholder="Apellido"></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><input type="text" id="inputAge" class="form-control" placeholder="Edad" value="` + localStorage.getItem('EDAD') + `" required></div>
                            <div class="col-md-6"><input type="text" class="form-control" id="inputEmail" value="` + localStorage.getItem('EMAIL') + `" placeholder="Email" disabled></div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-md-6"><input type="text" id="inputMobile" class="form-control" placeholder="Teléfono" value="` + localStorage.getItem('TELÉFONO') + `" required></div>
                        </div>
                        <div class="mt-5 text-right">
                            <button class="btn btn-primary profile-button" id="guardarButton" type="button">Guardar Cambios</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    document.getElementById("profileContainer").innerHTML = htmlContentToAppend;

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        readURL(this);
    });

    $('#guardarButton').click(function() {
        actualizoDatos();
    });

    function actualizoDatos() {
        const start = "[";
        const end = "]";
        //
        var editoStringOne = localStorage.getItem("LISTA_DE_USUARIOS");
        var jsonData = [];
        jsonData = JSON.parse(editoStringOne); //PARSEO EL STRING A OBJETO JSON
        for (var i = 0; i < jsonData.length; i++) {
            var userData = jsonData[i];
            console.log(userData);
            console.log(jsonData);
            console.log($("#inputEmail").val());
            if ($("#inputEmail").val() == userData.email) {
                userData.nombre = $("#inputName").val();
                userData.apellido = $("#inputSurname").val();
                userData.edad = $("#inputAge").val();
                userData.telefono = $("#inputMobile").val();
                //
                localStorage.setItem("NOMBRE", userData.nombre);
                localStorage.setItem("APELLIDO", userData.apellido);
                localStorage.setItem("EDAD", userData.edad);
                localStorage.setItem("EMAIL", userData.email);
                localStorage.setItem("TELÉFONO", userData.telefono);
                localStorage.setItem("CONTRASEÑA", userData.contraseña);
                //
                localStorage.setItem("LISTA_DE_USUARIOS", JSON.stringify(jsonData));
                location.reload();
            }
        }
    }
});