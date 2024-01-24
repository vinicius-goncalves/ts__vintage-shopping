// import CartMethods from './CartMethods.js';
// const cm = new CartMethods();
import('../../fonts/loader.js');
import('./cart-observer.js');
import buildElement from '../../utils/element-builder.js';
import CartMethods from './CartMethods.js';
const cm = new CartMethods();
const addedProductsContainer = document.querySelector('section[data-cart="cart-products"]');
function renderCartProduct(product) {
    const productWrapper = buildElement('div')
        .setCustomAttribute('data-cart', 'product')
        .setCustomAttribute('data-product-id', product.id)
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
    buildElement('button')
        .setCustomAttribute('data-cart', 'remove-from-cart')
        .setText('Remove')
        .appendOn(productDescription)
        .on('click', () => cm.removeProductFromCart(product))
        .build();
    productWrapper.appendChild(productDetails);
    return productWrapper;
}
export default renderCartProduct;
window.addEventListener('DOMContentLoaded', () => {
    cm.loadProducts(addedProductsContainer);
});
