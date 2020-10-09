var cartInfo = [];
var cartArticles = [];
var shippingPercentage = 0.15;
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";

function costoTotal(){
    
}

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function(resultObj) {
        let htmlContentToAppend = "";
        if (resultObj.status === "ok") {
            cartInfo = resultObj.data;
            cartArticles = cartInfo.articles;
            for (var i = 0; i < cartInfo.articles.length; i++) {
                htmlContentToAppend += `
                <tr>
                    <th scope="row"><img src="`+ cartArticles[i].src +`" alt="" width="50px"></th>
                    <td>`+ cartArticles[i].name +`</td>
                    <td>`+ cartArticles[i].currency + ` `  + cartArticles[i].unitCost +`</td>
                    <td><input class="form-control" style="width: 60px;" type="number" id="contadorProd">`+ cartArticles[i].count +`</td>
                    <td class="font-weight-bold" id="productSubtotal">UYU 100</td>
                </tr>`
              document.getElementById("tablaCarrito").innerHTML = htmlContentToAppend;
            }
        } 
    });
    
    document.getElementById("contadorProd").addEventListener("change",function(){
        var contadorArt = document.getElementById("contadorProd").value;
        var resultado = contadorArt * unitCost;
    });

    document.getElementById("premiumRadio").addEventListener("change", function(){
        shippingPercentage = 0.15;
        costoTotal();
    });
    
    document.getElementById("expressRadio").addEventListener("change", function(){
        shippingPercentage = 0.07;
        costoTotal();
    });

    document.getElementById("standardRadio").addEventListener("change", function(){
        shippingPercentage = 0.05;
        costoTotal();
    });
});

