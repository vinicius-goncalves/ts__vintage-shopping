import('./fonts/loader.js');
import('./features/storage/storage.js');

import type Product from './types/interfaces/IProduct.js';
import type DocFragment from './types/DocFragment.js';

import ProductsMethods from './products/products-methods.js';

const productsMain = document.querySelector('[data-products="main"]') as HTMLElement;
const pm: ProductsMethods = new ProductsMethods();

window.addEventListener('DOMContentLoaded', (): void => {

    const productsDocFragment: DocFragment<Product[]> = pm.loadProducts();
    productsMain.appendChild(productsDocFragment);
});