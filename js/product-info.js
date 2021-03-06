var product = {};
var currentProductsArray = [];
var productRelacionados = [];
var productComments = [];

function showCarrusel(array) {
    let htmlContentToAppend = "";
    var activar;
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        if (i == 0) activar = "active";
        else activar = "";

        htmlContentToAppend += `
            <div class="carousel-item ` + activar + `">
                <img src="` + imageSrc + `" style="width:100%;">
            </div>`

        document.getElementById("carouselProductos").innerHTML = htmlContentToAppend;
    }
}

function showProductosRelacionados(array) {
    for (let i = 0; i < array.length; i++) {
        productRelacionados.push(array[i]);
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            showProductosRelacionados(product.relatedProducts);
            //
            //Productos relacionados
            getJSONData(PRODUCTS_URL).then(function(resultObj) {
                let htmlContentToAppend = "";
                if (resultObj.status === "ok") {
                    currentProductsArray = resultObj.data;
                    for (var i = 0; i < productRelacionados.length; i++) {
                        var imagenProducto = currentProductsArray[productRelacionados[i]].imgSrc
                        var nombreProducto = currentProductsArray[productRelacionados[i]].name
                        var precioProducto = currentProductsArray[productRelacionados[i]].cost
                        var pesoProducto = currentProductsArray[productRelacionados[i]].currency
                        htmlContentToAppend += `
                        <div class="card" style="width: 150px;">
                            <div class="card-body">
                                <div class="card-img-top">
                                    <img src="` + imagenProducto + `" class="img-thumbnail rounded card-img-top" style="width: 150px;">
                                </div>
                                <h6 class="card-title font-weight-bold">` + nombreProducto + `</h6>
                                <p class="card-text">` + pesoProducto + ` ` + precioProducto + `</p>
                                <a style="color: dodgerblue;" href="product-info.html">Ver más</a>
                            </div>
                        </div> `
                        document.getElementById("productosRelac").innerHTML = htmlContentToAppend;
                    }
                }
            });
            //
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCost");
            //
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.currency + " " + product.cost;
            //Muestro las imagenes en un carrusel
            showCarrusel(product.images);

        }
    });






    //Comentarios productos
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        let htmlContentToAppend = "";
        if (resultObj.status === "ok") {
            productComments = resultObj.data;
            for (var i = 0; i < productComments.length; i++) {
                var userName = productComments[i].user;
                var comment = productComments[i].description;
                var commentDate = productComments[i].dateTime;
                var commentScore = productComments[i].score;
                var textToAppend = "";
                textToAppend = muestroEstrellas(textToAppend, commentScore);
                htmlContentToAppend += `
                    <div class="card">
                        <div class="card-header">
                            <h5><a href="#">` + userName + `</a></h5>
                            <small>` + commentDate + `</small>
                        </div>
                        <div class="card-body">
                            <blockquote class="blockquote mb-0">
                                <h6>` + comment + `</h6>` + textToAppend + ` 
                            </blockquote>
                        </div>
                    </div>`
                document.getElementById("productsComments").innerHTML = htmlContentToAppend;
            }
        }
    });

    function muestroEstrellas(textToAppend, score) {
        if (score == 1) {
            textToAppend = `
            <p>
                <i style="color: gold;" class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </p>`
        }
        if (score == 2) {
            textToAppend = `
            <p>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </p>`
        }
        if (score == 3) {
            textToAppend = `
            <p>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </p>`
        }
        if (score == 4) {
            textToAppend = `
            <p>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
                <i class="fa fa-star"></i>
            </p>`
        }
        if (score == 5) {
            textToAppend = `
            <p>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
                <i style="color: gold;" class="fa fa-star"></i>
            </p>`
        }
        return textToAppend
    }

    document.getElementById("btnComment").addEventListener("click", function() {
        let htmlContentToAppend = "";
        var comentario = document.getElementById("commentArea").value;
        var puntaje = document.getElementById("scoreSelector").value;
        var today = new Date();
        var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
        var starToAppend = "";
        starToAppend = muestroEstrellas(starToAppend, puntaje);
        var oldComments = document.getElementById("productsComments").innerHTML;
        //
        htmlContentToAppend += `
            <div class="card">
                <div class="card-header">
                    <h5><a href="#">` + localStorage.getItem("usuario") + `</a></h5>
                    <small>` + date + `</small>
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <h6>` + comentario + `</h6>` + starToAppend + ` 
                    </blockquote>
                </div>
            </div>`
        document.getElementById("productsComments").innerHTML = oldComments + htmlContentToAppend;
        document.getElementById("commentArea").value = '';
    })
});