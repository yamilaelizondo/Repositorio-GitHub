var cartInfo = [];
var cartArticles = [];
var subtotalParcial;
var subTotalCompletoImporte = 0;
var metodoDePago;
//TARJETA
var numeroDeTarjeta = "";
var anioDeExpiracion = "";
var mesDeExpiracion = "";
var codigoDeSeguridad = "";
//BANCO
var nombreDelBanco = "";
var nombreDeUsuario = "";
var contraeñaBanco = "";
var numeroDeCuenta = "";
// DATOS PERSONALES
var calleUsuario = "";
var numeroDeCalle = "";
var esquinaDeCalle = "";
var datosDePago = false;
var datosDireccion = false;
var productosEnCarrito = false;

var mensajeFinal = "";

document.addEventListener("DOMContentLoaded", function (e) {
    //peticion a URL e imprime datos en pantalla - llama metodos especificos 
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
                        <input class="btn btn-info btn-sm eliminar" type="button" value="Eliminar">
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
    //Metodo que captura los datos del precio y cantidad los multiplica para obtener el subtotal e imprmirlo
    function muestroSubTotal() {
        $('.articuloDeLista').each(function () {
            var precioUnitario = $(this).children('.currencyAndCost').text();
            var cantidad = $(this).children('.cantidadArt').children().val();
            subtotalParcial = precioUnitario * cantidad;
            $(this).children('.productSubtotal').text(subtotalParcial + " $U");
        });
    }
    // Captura cada subtotal y los suma al subtotalCompleto / lo imprime en la tabla inferior
    function muestroTotalProductos() {
        subTotalCompletoImporte = 0;
        $('.articuloDeLista').each(function () {
            var subTotalCompleto = parseFloat($(this).children('.productSubtotal').text());
            subTotalCompletoImporte += subTotalCompleto;
            document.getElementById("productCostText").innerHTML = subTotalCompletoImporte;
        });
    }

    //Captura el valor radio button seleccionado y calcula el costo de envio / lo suma al subtotalCompleto e imprime
    function actualizoTotales() {
        var costoDeEnvio = $("input[name='opcion']:checked").val() * $("#productCostText").text();
        importeTotal = costoDeEnvio + parseFloat($("#productCostText").text());
        document.getElementById("comissionText").innerHTML = costoDeEnvio.toFixed(0);
        document.getElementById("totalCostText").innerHTML = importeTotal.toFixed(0);
    }

    //
    function agregoListeners() {
        //litener al radio button de envios
        $('.radio input').change(function () {
            actualizoTotales();
        });
        // al boton eliminar
        $('.eliminarArt input').click(function () {
            eliminarArticulo(this);
        });
        //al input de tipo number que suma los productos 
        $('.cantidadArt input').change(function () {
            muestroSubTotal();
            muestroTotalProductos();
            actualizoTotales();
        });
        // boton finalizar compra que valida todos los datos necesarios ingresados 
        $('#confirmButton').click(function () {
            if (metodoDePago == "" || metodoDePago == undefined || metodoDePago == null) {
                alert("Debe seleccionar un metodo de pago");
                datosDePago = false;
            } else {
                validoCamposMetodoDePago();
            }
        });
        //
        $("[name='pago']").change(function () {
            metodoDePago = $("input[name='pago']:checked").val();
            datosDePago = false;
            habilitoDeshabilitoCampos(metodoDePago);
        });

        $('#btnFinalizar').click(function () {
            calleUsuario = $('#calleUser').val();
            numeroDeCalle = $('#numeroDeCalle').val();
            esquinaDeCalle = $('#esquinaUser').val();
            cuentaProductos = $('.cantidadArt').children().val();
            if (cuentaProductos == 0) {
                alert("Carrito vacio");
                productosEnCarrito = false;
            } else {
                productosEnCarrito = true;
                if (calleUsuario == "" || numeroDeCalle == "" || esquinaDeCalle == "") {
                    alert("Falta completar datos de la dirección");
                    datosDireccion = false;
                } else {
                    datosDireccion = true;
                    if ((datosDireccion && datosDePago && productosEnCarrito) == true) {
                        getJSONData("https://japdevdep.github.io/ecommerce-api/cart/buy.json").then(function (resultObj) {
                            if (resultObj.status === "ok") {
                                mensajeFinal = resultObj.data;
                                alert(mensajeFinal.msg);
                            }
                        })
                    } else {
                        alert("Debe seleccionar metodo de pago");
                    }
                }

            }

        });
    }

    //Deshabilita los campos de metodo de pago
    function deshabilitoCampos() {
        $('.containerPayMethods input[type="text"]').each(function () {
            $(this).prop("disabled", true);
        });
    }
    //Deshabilita o hablita campos segun metodo de pago seleccionado y borra los campos 
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
    //
    function validoCamposMetodoDePago() {
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
    //Metodo que accede a la fila de un articulo y lo elimina / actualiza totales
    function eliminarArticulo(botonEliminar) {
        $(botonEliminar).parent().parent().remove();
        muestroSubTotal();
        muestroTotalProductos();
        actualizoTotales();
    }

});


