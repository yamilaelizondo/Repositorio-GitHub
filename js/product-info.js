var product = {};
var currentProductsArray = [];
var productRelacionados = [];

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
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCost");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.currency + " " + product.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });
});
//Productos relacionados
getJSONData(PRODUCTS_URL).then(function(resultObj){
    let htmlContentToAppend = "";
    if (resultObj.status === "ok"){
        currentProductsArray = resultObj.data;
        for (var i = 0; i <productRelacionados.length; i++) {
            var imagenProducto = currentProductsArray[productRelacionados[i]].imgSrc
            var nombreProducto = currentProductsArray[productRelacionados[i]].name
            var precioProducto = currentProductsArray[productRelacionados[i]].cost
            htmlContentToAppend += `
            <div id="containerRelatedProduct" class="">
              <div class="card-img-top">
                 <img src="` + imagenProducto +`" class="img-thumbnail rounded mx-auto d-block" name="zoom" style="cursor:pointer"></div>
               <h6 class="blockquote text-center"> `+ nombreProducto +`</h6>
               <h6 class="blockquote text-center display-4">`+ precioProducto +`</h6>
            </div>
            ` 
         document.getElementById("productosRelac").innerHTML = htmlContentToAppend;
        };

    };
});