import type Product from './IProduct.js';

interface ICartMethods {
    addProductIntoCart(product: Product): void;
    removeProductFromCart(product: Product): void;
    isCartEmpty(): Promise<boolean>;
    updateTotalPrice(): Promise<void>;
    updateProductsCount(): Promise<void>;
    updateCartTextInformation(): Promise<void>;
    renderCartProduct(product: Product): HTMLDivElement;
    updateCart(): Promise<void>;
    loadProducts(container: Element): Promise<void>;
}

export default ICartMethods;