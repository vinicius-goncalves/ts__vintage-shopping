import type CategoryName from '../CategoryName.js';
import type Product from './IProduct.js';
import type DocFragment from '../DocFragment.js';

interface IProductsMethods {
    renderCategory(category: CategoryName): HTMLDivElement;
    renderProduct(product: Product, type: CategoryName): HTMLElement;
    loadProducts(): DocFragment<Product[]>;
}

export default IProductsMethods;