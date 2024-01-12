import buildElement from '../../utils/element-builder.js';
import DBMethods from '../storage/DBMethods.js';
const db = new DBMethods();
const addedProductsContainer = document.querySelector('section[data-cart="added-products-container"]');
const totalAddedProducts = document.querySelector('span[data-cart="total-added-products"');
function renderCartProduct(product) {
    const productWrapper = buildElement('div')
        .setCustomAttribute('data-cart', 'product')
        .build();
    const productDetails = buildElement('figure')
        .setCustomAttribute('data-cart-product', 'details')
        .build();
    buildElement('img')
        .setAttribute('src', `../${product.image_src}`)
        .setCustomAttribute('data-cart-product', 'img')
        .appendOn(productDetails)
        .build();
    const productDescription = buildElement('figcaption')
        .setCustomAttribute('data-cart-product', 'description')
        .appendOn(productDetails)
        .build();
    buildElement('p')
        .setCustomAttribute('data-cart-product', 'title')
        .setText(product.name)
        .appendOn(productDescription)
        .build();
    buildElement('span')
        .setCustomAttribute('data-cart-product', 'price')
        .setText(`$${product.price}`)
        .appendOn(productDescription)
        .build();
    productWrapper.appendChild(productDetails);
    return productWrapper;
}
function loadProducts() {
    db.getAllProducts().then(query => {
        if (!query) {
            return;
        }
        if (!Array.isArray(query.data)) {
            return;
        }
        const docFragment = document.createDocumentFragment();
        for (const product of query.data) {
            const productRendered = renderCartProduct(product);
            docFragment.appendChild(productRendered);
        }
        addedProductsContainer.appendChild(docFragment);
    });
}
async function updateProductsAdded() {
    const totalProductsInCart = await db.countAddedProducts();
    totalAddedProducts.textContent = totalProductsInCart;
}
window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateProductsAdded();
});
