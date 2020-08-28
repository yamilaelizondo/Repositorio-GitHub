const search_input = document.getElementById('search');
const results = document.getElementById('results');
let productos;
let search_term = '';
const fetchProductos = async() => {
    productos = await fetch(
        'https://japdevdep.github.io/ecommerce-api/product/all.json'
    ).then(res => res.json());
};
const showCountries = async() => {
    results.innerHTML = '';

    await fetchProductos();

    const ul = document.createElement('ul');
    ul.id = "listar";
    ul.classList.add('products');

    productos
        .filter(producto =>
            producto.name.toLowerCase().includes(search_term.toLowerCase())
        )
        .forEach(producto => {
            const li = document.createElement('li');
            li.classList.add('products-item');



            const product_name = document.createElement('h3');
            product_name.innerText = producto.name;
            product_name.classList.add('product-name');

            const product_info = document.createElement('div');
            product_info.classList.add('product-info');

            const products_name = document.createElement('h2');
            products_name.innerText = producto.name
            products_name.classList.add('product-name');

            const product_image = document.createElement('img');
            product_image.src = producto.imgSrc;
            product_image.classList.add('product-img');
            const product_cost = document.createElement('h5');
            product_cost.innerText = producto.currency + producto.cost;
            product_cost.classList.add('product_cost');

            product_info.appendChild(product_cost);

            li.appendChild(product_name);
            li.appendChild(product_image);
            li.appendChild(product_info);

            ul.appendChild(li);
        });

    results.appendChild(ul);
};



search_input.addEventListener('input', e => {

    search_term = e.target.value;
    if (search_term == "") {


        document.getElementById("listar").style.display = "none";
    } else {

        showCountries();
    }


});