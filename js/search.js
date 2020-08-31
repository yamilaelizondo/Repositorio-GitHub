document.addEventListener("DOMContentLoaded", () => {

    const search_input = document.getElementById('search');
    const results = document.getElementById('results');

    var search_term = '';
    var products;

    const fetchProducts = async() => {
        products = await fetch(
            PRODUCTS_URL
        ).then(res => res.json());
    };

    const showproducts = async() => {
        results.innerHTML = '';

        await fetchProducts();

        const table = document.createElement('table');
        table.id = "listaResultados";
        table.classList.add("table" , "table-hover");

        products
            .filter(product =>
                product.name.toLowerCase().includes(search_term.toLowerCase()) || product.description.toLowerCase().includes(search_term.toLowerCase()))
            .forEach(product => {
                const tr = document.createElement('tr');
                const tdProductImage = document.createElement('td');
                const tdProductName = document.createElement('td');
                const tdProductPrice = document.createElement('td');
                //  li.classList.add('media-body');

                const product_image = document.createElement('img');
                product_image.src = product.imgSrc;
                tdProductImage.appendChild(product_image);
                product_image.classList.add("miniatura_tabla");

                const product_name = document.createElement('strong');
                product_name.innerText = product.name;
                tdProductName.appendChild(product_name);
               // product_name.classList.add('product');

                const product_price = document.createElement('p');
                product_price.innerText = Number(product.cost);
                tdProductPrice.appendChild(product_price);
                //  product_price.classList.add('product-population');
                $('table td').attr('scope','row');
                tr.appendChild(tdProductName);
                tr.appendChild(tdProductPrice);
                tr.appendChild(tdProductImage);

                table.appendChild(tr);


            });

        results.appendChild(table);
    };



    search_input.addEventListener('input', e => {
        search_term = e.target.value;
        if (search_term == "") {
            document.getElementById("listaResultados").style.display = "none";
        } else {
            showproducts();
        }

    });
});