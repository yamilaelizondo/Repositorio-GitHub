var cartInfo = [];
var cartArticles = [];
var subtotalParcial;
var subTotalCompletoImporte = 0;
var metodoDePago;
//
var numeroDeTarjeta = "";
var anioDeExpiracion = "";
var mesDeExpiracion = "";
var codigoDeSeguridad = "";
//
var nombreDelBanco = "";
var nombreDeUsuario = "";
var contraeñaBanco = "";
var numeroDeCuenta = "";
//
var calleUsuario = "";
var numeroDeCalle = "";
var esquinaDeCalle = "";
var datosDePago = false;
var datosDireccion = false;

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        let htmlContentToAppend = "";
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data;
            cartArticles = cartInfo.articles;
            for (var i = 0; i < cartInfo.articles.length; i++) {
                if (cartArticles[i].currency == "USD") {
                    cartArticles[i].unitCost = cartArticles[i].unitCost * 40;
                }
                htmlContentToAppend += `
                <tr class= "articuloDeLista">
                    <th scope="row"><img src="`+ cartArticles[i].src + `" alt="" width="50px"></th>
                    <td>`+ cartArticles[i].name + `</td>
                    <td class="currencyAndCost">` + cartArticles[i].unitCost + `</td>
                    <td class="cantidadArt">
                        <input class="form-control" style="width: 60px;" type="number" min="0" value=`+ cartArticles[i].count + `>
                    </td>
                    <td class="font-weight-bold productSubtotal"></td>
                    <td class="eliminarArt">
                        <input class="btn btn-primary btn-sm eliminar" type="button" value="Eliminar">
                    </td>
                </tr>`
                document.getElementById("tablaCarrito").innerHTML = htmlContentToAppend;
            }
            muestroSubTotal();
            muestroTotalProductos();
            actualizoTotales();
            deshabilitoCampos();
            agregoListeners();
        }
    });
    //
    function muestroSubTotal() {
        /*var articuloDeLista2 = document.querySelectorAll('.articuloDeLista');
        for (var filas = 0; filas < articuloDeLista2.length; filas=filas+1){
            console.log(articuloDeLista2[filas]);
        }*/
        $('.articuloDeLista').each(function () {
            var precioUnitario = $(this).children('.currencyAndCost').text();
            var cantidad = $(this).children('.cantidadArt').children().val();
            subtotalParcial = precioUnitario * cantidad;
            $(this).children('.productSubtotal').text(subtotalParcial + " $U");
        });
    }
    //
    function muestroTotalProductos() {
        subTotalCompletoImporte = 0;
        $('.articuloDeLista').each(function () {
            var subTotalCompleto = parseFloat($(this).children('.productSubtotal').text());
            subTotalCompletoImporte += subTotalCompleto;
            document.getElementById("productCostText").innerHTML = subTotalCompletoImporte;
        });
    }

    function agregoListeners() {
        $('.radio input').change(function () {
            actualizoTotales();
        });
        $('.eliminarArt input').click(function () {
            eliminarArticulo(this);
        });
        $('.cantidadArt input').change(function () {
            muestroSubTotal();
            muestroTotalProductos();
            actualizoTotales();
        });
        $('#confirmButton').click(function () {
            if (metodoDePago == "" || metodoDePago == undefined || metodoDePago == null) {
                alert("Debe seleccionar un metodo de pago");
                datosDePago = false;
            } else {
                validoCampos();
            }
        });
        $("[name='pago']").change(function () {
            metodoDePago = $("input[name='pago']:checked").val();
            datosDePago = false;
            habilitoDeshabilitoCampos(metodoDePago);
        });

        $('#btnFinalizar').click(function () {
            calleUsuario = $('#calleUser').val();
            numeroDeCalle = $('#numeroDeCalle').val();
            esquinaDeCalle = $('#esquinaUser').val();
            if (calleUsuario == "" || numeroDeCalle == "" || esquinaDeCalle == "") {
                alert("Falta completar datos de la dirección");
                datosDireccion = false;
            } else {
                datosDireccion = true;
                if((datosDireccion && datosDePago)){
                    alert("todo piola");
                }else{
                    alert("Debe seleccionar metodo de pago");
                }
            }

        });
    }


    function deshabilitoCampos() {
        $('.containerPayMethods input[type="text"]').each(function () {
            $(this).prop("disabled", true);
        });
    }

    function habilitoDeshabilitoCampos(metodoDePago) {
        if (metodoDePago == "tCredito") {
            $('#metodoPagoTarjeta input[type="text"]').each(function () {
                $(this).prop("disabled", false);
            });
            $('#metodoPagoTransferencia input[type="text"]').each(function () {
                $(this).prop("disabled", true);
                $(this).val("");
            });

        } else {
            $('#metodoPagoTarjeta input[type="text"]').each(function () {
                $(this).prop("disabled", true);
                $(this).val("");
            });
            $('#metodoPagoTransferencia input[type="text"]').each(function () {
                $(this).prop("disabled", false);
            });
        }
    }

    function validoCampos() {
        if (metodoDePago == "tCredito") {
            numeroDeTarjeta = $('#numeroDeTarjeta').val();
            anioDeExpiracion = $('#añoExpiracion').val();
            mesDeExpiracion = $('#mesExpiracion').val();
            codigoDeSeguridad = $('#codigoSeguridad').val();
            if (numeroDeTarjeta == "" || anioDeExpiracion == "" || mesDeExpiracion == "" || codigoDeSeguridad == "") {
                alert("Falta completar datos de la tarjeta");
                datosDePago = false;
            } else {
                alert("Datos de tarjeta guardados satisfactoriamente");
                datosDePago = true;
            }
        } else {
            nombreDelBanco = $('#nombreBanco').val();
            nombreDeUsuario = $('#nombreUser').val();
            contraeñaBanco = $('#password').val();
            numeroDeCuenta = $('#numeroCuenta').val();
            if (nombreDelBanco == "" || nombreDeUsuario == "" || contraeñaBanco == "" || numeroDeCuenta == "") {
                alert("Falta completar datos de la transferencia");
                datosDePago = false;
            } else {
                alert("Datos de banco guardados satisfactoriamente");
                datosDePago = true;
            }
        }
    }

    function eliminarArticulo(botonEliminar) {
        $(botonEliminar).parent().parent().remove();
        muestroSubTotal();
        muestroTotalProductos();
        actualizoTotales();
    }


    function actualizoTotales() {
        var costoDeEnvio = $("input[name='opcion']:checked").val() * $("#productCostText").text();
        importeTotal = costoDeEnvio + parseFloat($("#productCostText").text());
        document.getElementById("comissionText").innerHTML = costoDeEnvio.toFixed(0);
        document.getElementById("totalCostText").innerHTML = importeTotal.toFixed(0);
    }


});


