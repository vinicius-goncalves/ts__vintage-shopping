import('../../fonts/loader.js');
import('./cart-observer.js');

import CartMethods from './cart-methods.js';

const cm: CartMethods = new CartMethods();
const addedProductsContainer = document.querySelector('section[data-cart="cart-products"]') as HTMLElement;

window.addEventListener('DOMContentLoaded', (): void => {
    cm.loadProducts(addedProductsContainer);
});