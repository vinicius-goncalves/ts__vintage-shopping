import type CategoryName from '../CategoryName.js';
import type Product from './IProduct.js';
import type DocFragment from '../DocFragment.js';

interface IProductsMethods {
    renderCategory(category: CategoryName): HTMLElement;
    renderProduct(product: Product, type: CategoryName): Promise<HTMLElement>;
    loadProducts(): DocFragment<Product[]>;
}

export default IProductsMethods;