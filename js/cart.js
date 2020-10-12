var cartInfo = [];
var cartArticles = [];
var subtotalParcial;
var porcentajeEnvio = 0.15;
var subTotalCompletoImporte = 0;
//let DOLLAR_SYMBOL = "USD ";
//let PESO_SYMBOL = "UYU ";


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
        let htmlContentToAppend = "";
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data;
            cartArticles = cartInfo.articles;
            for (var i = 0; i < cartInfo.articles.length; i++) {
                if (cartArticles[i].currency == "USD"){
                    cartArticles[i].unitCost = cartArticles[i].unitCost *40;
                }
                htmlContentToAppend += `
                <tr class= "articuloDeLista">
                    <th scope="row"><img src="`+ cartArticles[i].src + `" alt="" width="50px"></th>
                    <td>`+ cartArticles[i].name + `</td>
                    <td class="currencyAndCost">` + cartArticles[i].unitCost + `</td>
                    <td class="cantidadArt">
                        <input class="form-control" style="width: 60px;" type="number" value=`+ cartArticles[i].count + `>
                    </td>
                    <td class="font-weight-bold productSubtotal"></td>
                </tr>`
                document.getElementById("tablaCarrito").innerHTML = htmlContentToAppend;
            }
            muestroSubTotal();
            muestroTotalProductos();
            actualizoTotales();
        }
    });

    function muestroSubTotal(){
        $('.articuloDeLista').each(function () {
            var precioUnitario = $(this).children('.currencyAndCost').text();
            var cantidad = $(this).children('.cantidadArt').children().val();
            subtotalParcial = precioUnitario * cantidad;
            $(this).children('.productSubtotal').text(subtotalParcial);
        });
    }

    function muestroTotalProductos(){
        subTotalCompletoImporte = 0;
        $('.articuloDeLista').each(function () {
            var subTotalCompleto = parseFloat($(this).children('.productSubtotal').text());
            subTotalCompletoImporte += subTotalCompleto;
            document.getElementById("productCostText").innerHTML = subTotalCompletoImporte;
        });
    }

    document.body.addEventListener('input', function (evt) {
        muestroSubTotal();
        muestroTotalProductos();
        actualizoTotales();
    });
   
    function actualizoTotales(){
        $('.radio input').change(function () {
            var costoDeEnvio= $("input[name='opcion']:checked").val() * $("#productCostText").text();
            importeTotal = costoDeEnvio + parseFloat($("#productCostText").text());
            document.getElementById("comissionText").innerHTML = costoDeEnvio.toFixed(0);
            document.getElementById("totalCostText").innerHTML = importeTotal.toFixed(0);
         });
    }

});


