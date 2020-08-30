document.addEventListener("DOMContentLoaded", () => {

    const search_input = document.getElementById('search');
    const results = document.getElementById('results');

    var search_term = '';
    var products;

    const fetchProducts = async() => {
        products = await fetch(
            'https://japdevdep.github.io/ecommerce-api/product/all.json'
        ).then(res => res.json());
    };

    const showproducts = async() => {
        results.innerHTML = '';

        await fetchProducts();

        const table = document.createElement('table');
        table.id = "listaResultados";
        table.classList.add("media-table", "table-hover");

        products
            .filter(product =>
                product.name.toLowerCase().includes(search_term.toLowerCase()) || product.description.toLowerCase().includes(search_term.toLowerCase()))
            .forEach(product => {
                const tr = document.createElement('tr');
                //  li.classList.add('media-body');

                const product_image = document.createElement('img');
                product_image.src = product.imgSrc;
                product_image.classList.add("image");

                const product_name = document.createElement('strong');
                product_name.innerText = product.name;
                product_name.classList.add('product');

                const product_price = document.createElement('p');
                product_price.innerText = Number(product.cost);
                //  product_price.classList.add('product-population');

                tr.appendChild(product_name);
                tr.appendChild(product_price);
                tr.appendChild(product_image);

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