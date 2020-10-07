var cartInfo = [];
var cartArticles = [];

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL).then(function(resultObj) {
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
                <td><input class="form-control" style="width: 60px;" type="number" id="contadorProd"></td>
                <td class="font-weight-bold" id="productSubtotal">UYU 200</td>
                </tr>`
              document.getElementById("tablaCarrito").innerHTML = htmlContentToAppend;
            }
        } 
    });    
});

document.getElementById("contadorProd").addEventListener("change",function(){

});