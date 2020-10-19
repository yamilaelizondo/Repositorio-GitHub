var cartInfo = [];
var cartArticles = [];
var subtotalParcial;
var porcentajeEnvio = 0.15;
var subTotalCompletoImporte = 0;
var metodoDePago;


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
            agregoListeners();
        }
    });

    function muestroSubTotal() {
        $('.articuloDeLista').each(function () {
            var precioUnitario = $(this).children('.currencyAndCost').text();
            var cantidad = $(this).children('.cantidadArt').children().val();
            subtotalParcial = precioUnitario * cantidad;
            $(this).children('.productSubtotal').text(subtotalParcial + " $U");
        });
    }


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
        $('#metodoCredito').change(function () {
           metodoDePago = $("input[name='pago']:checked").val();
            $('#numeroDeTarjeta').prop( "disabled", false );
            $('#añoExpiracion').prop( "disabled", false );
            $('#mesExpiracion').prop( "disabled", false );
            $('#codigoSeguridad').prop( "disabled", false );
        });
        $('#metodoBanco').change(function () {

        });
        $('#confirmButton').click(function () {
            if (metodoDePago==""||metodoDePago==undefined||metodoDePago==null){
                alert("Debe seleccionar un metodo de pago");
            } else{
                validoCampos();
            }
        });
    }
    function validoCampos() {
        if (metodoDePago == "tCredito") {
            var numeroDeTarjeta = "";
            var anioDeExpiracion = "";
            var mesDeExpiracion = "";
            var codigoDeSeguridad = "";
            numeroDeTarjeta = $('#numeroDeTarjeta').val();
            anioDeExpiracion = $('#añoExpiracion').val();
            mesDeExpiracion = $('#mesExpiracion').val();
            codigoDeSeguridad = $('#codigoSeguridad').val();
            if (numeroDeTarjeta == "" || anioDeExpiracion == "" || mesDeExpiracion == "" || codigoDeSeguridad == "") {
                alert("Falta completar datos");
            }
        } else {
            var numeroDeTarjeta = "";
            var anioDeExpiracion = "";
            var mesDeExpiracion = "";
            var codigoDeSeguridad = "";
            numeroDeTarjeta = $('#numeroDeTarjeta').val();
            anioDeExpiracion = $('#añoExpiracion').val();
            mesDeExpiracion = $('#mesExpiracion').val();
            codigoDeSeguridad = $('#codigoSeguridad').val();
            if (numeroDeTarjeta == "" || anioDeExpiracion == "" || mesDeExpiracion == "" || codigoDeSeguridad == "") {
                alert("Falta completar datos"); 
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


