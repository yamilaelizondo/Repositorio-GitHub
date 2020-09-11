var product = {};
var currentProductsArray = [];
var productRelacionados = [];
var productComments = []; 

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showProductosRelacionados (array){
    for (let i = 0; i < array.length; i++) {
        productRelacionados.push (array[i]);
    }
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCost");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.currency + " " + product.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showProductosRelacionados (product.relatedProducts);
        }
    });

//Productos relacionados
getJSONData(PRODUCTS_URL).then(function(resultObj){
    let htmlContentToAppend = "";
    if (resultObj.status === "ok"){
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
                    <img src="`+ imagenProducto +`" class="img-thumbnail rounded card-img-top" style="width: 150px;">
                </div>
                 <h6 class="card-title">` + nombreProducto +`</h6>
                 <p class="card-text">`+ pesoProducto + ` ` + precioProducto +`</p>
                 <a style="color: dodgerblue;" href="product-info.html">Ver más</a>
             </div>
        </div>
            ` 
         document.getElementById("productosRelac").innerHTML = htmlContentToAppend;
        }
    }
});
});

//Comentarios productos
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    let htmlContentToAppend = "";
    if (resultObj.status === "ok"){
    productComments = resultObj.data;
    for (var i = 0; i < productComments.length; i++) {
        var userName = productComments[i].user;
        var comment = productComments[i].description;
        var commentDate = productComments[i].dateTime;
        var commentScore = productComments[i].score;
        var textToAppend = "";
        textToAppend = muestroEstrellas (textToAppend,commentScore);
        
        htmlContentToAppend += `
            <div class="card">
                <div class="card-header">
                <h5><a href="#">`+ userName + `</a></h5>
                <small>` + commentDate + `</small>
                </div>
                <div class="card-body">
                <blockquote class="blockquote mb-0">
                    <h6>` + comment + `</h6>
                    `+ textToAppend + ` 
                </blockquote>
                </div>
            </div>`
            document.getElementById("productsComments").innerHTML = htmlContentToAppend;
    }
    
    }
});

function muestroEstrellas (textToAppend,score) {
    if (score == 1){
        textToAppend = `
        <p>
            <i style="color: gold;" class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </p>`
    }
    if (score == 2){
        textToAppend = `
        <p>
            <i style="color: gold;" class="fa fa-star"></i>
            <i style="color: gold;" class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </p>`
    }
    if (score == 3){
        textToAppend = `
        <p>
            <i style="color: gold;" class="fa fa-star"></i>
            <i style="color: gold;" class="fa fa-star"></i>
            <i style="color: gold;" class="fa fa-star"></i>
            <i class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </p>`
    }
    if (score == 4){
        textToAppend = `
        <p>
            <i style="color: gold;" class="fa fa-star"></i>
            <i style="color: gold;" class="fa fa-star"></i>
            <i style="color: gold;" class="fa fa-star"></i>
            <i style="color: gold;" class="fa fa-star"></i>
            <i class="fa fa-star"></i>
        </p>`
    }
    if (score == 5){
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
 
document.getElementById("btnComment").addEventListener("click",function(){

})