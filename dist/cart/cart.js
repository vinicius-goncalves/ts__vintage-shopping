import('./cart-observer.js');
import CartMethods from './cart-methods.js';
const cm = new CartMethods();
const addedProductsContainer = document.querySelector('section[data-cart="cart-products"]');
window.addEventListener('DOMContentLoaded', () => {
    cm.loadProducts(addedProductsContainer);
});
