import('./features/storage/storage.js');
import ProductsMethods from './products/products-methods.js';
const productsMain = document.querySelector('[data-products="main"]');
const pm = new ProductsMethods();
window.addEventListener('DOMContentLoaded', () => {
    const productsDocFragment = pm.loadProducts();
    productsMain.appendChild(productsDocFragment);
});
