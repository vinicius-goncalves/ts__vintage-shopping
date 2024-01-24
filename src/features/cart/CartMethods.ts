import Product from '../../products/interfaces/Product.js';
import { removeDOMElement } from '../../utils/dom-manipulation.js';
import DBMethods from '../storage/DBMethods.js';
import sendToast from '../toast.js';

const totalPrice = document.querySelector('span[data-cart-product="price"]') as HTMLSpanElement;
const emptyCartText = document.querySelector('p[data-cart="empty-cart-text"]') as HTMLParagraphElement;

const db = new DBMethods();

interface ICartMethods {
    addProductIntoCart(product: Product): void;
    removeProductFromCart(product: Product): void;
    isCartEmpty(): Promise<boolean>;
    updateTotalPrice(): Promise<void>;
    updateProductsCount(): Promise<void>;
    updateCartText(): Promise<void>
    loadProducts(container: Element): Promise<void>;
}

class CartMethods implements ICartMethods {

    addProductIntoCart(product: Product): void {

        db.addProduct(product)
            .then(() => sendToast({ title: 'Yeah!', body: 'You have added a new product to your cart!' }))
            .catch(() => sendToast({ title: 'Hey!', body: 'This product is already in your cart.' }));
    }

    removeProductFromCart(product: Product): void {

        db.removeProductById(product.id)
            .then(() => sendToast({ title: 'Ok', body: 'You have removed a product from your cart.' }))
            .then(async () => removeDOMElement(`[data-product-id="${product.id}"]`));
    }

    async isCartEmpty(): Promise<boolean> {
        return (await db.countAddedProducts()).count === 0;
    }

    async updateTotalPrice(): Promise<void> {

        const products: { data: Array<Product> } = await db.getAllProducts();

        if(!products || !Array.isArray(products.data)) {
            return;
        }

        const sumTotalPrice = (acc: number, product: Product): number => acc += Number(product.price);
        const priceSum = products.data.reduce(sumTotalPrice, 0);
        totalPrice.textContent = `$${priceSum.toFixed(2)}`;
    }

    async updateProductsCount(): Promise<void> {

        const totalAddedProducts = document.querySelector('span[data-cart="total-added-products"') as HTMLSpanElement;
        const { count } = await db.countAddedProducts();
        totalAddedProducts.textContent = String(count);
    }

    async updateCartText(): Promise<void> {
        const isCartEmpty: Awaited<boolean> = await this.isCartEmpty();
        emptyCartText.style.setProperty('display', isCartEmpty ? 'block' : 'none');
    }

    async loadProducts(container: Element): Promise<void> {

        const { ['default']: renderCartProduct } = await import('./cart-products-loader.js');
        const allProducts: { data: Array<Product> } = await db.getAllProducts();

        if(!allProducts || !Array.isArray(allProducts.data)) {
            return;
        }

        const docFragment: DocumentFragment = document.createDocumentFragment();

        for(const product of allProducts.data) {
            const productRendered: HTMLDivElement = renderCartProduct(product);
            docFragment.appendChild(productRendered);
        }

        container.appendChild(docFragment);

        Promise.all([ this.updateCartText(), this.updateProductsCount(), this.updateTotalPrice() ]);
    }
}

export default CartMethods;