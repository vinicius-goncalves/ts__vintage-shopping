import { removeDOMElement } from '../../utils/dom-manipulation.js';
import DBMethods from '../storage/DBMethods.js';
import sendToast from '../toast.js';
const totalPrice = document.querySelector('span[data-cart-product="price"]');
const emptyCartText = document.querySelector('p[data-cart="empty-cart-text"]');
const db = new DBMethods();
class CartMethods {
    addProductIntoCart(product) {
        db.addProduct(product)
            .then(() => sendToast({ title: 'Yeah!', body: 'You have added a new product to your cart!' }))
            .catch(() => sendToast({ title: 'Hey!', body: 'This product is already in your cart.' }));
    }
    removeProductFromCart(product) {
        db.removeProductById(product.id)
            .then(() => sendToast({ title: 'Ok', body: 'You have removed a product from your cart.' }))
            .then(async () => removeDOMElement(`[data-product-id="${product.id}"]`));
    }
    async isCartEmpty() {
        return (await db.countAddedProducts()).count === 0;
    }
    async updateTotalPrice() {
        const products = await db.getAllProducts();
        if (!products || !Array.isArray(products.data)) {
            return;
        }
        const sumTotalPrice = (acc, product) => acc += Number(product.price);
        const priceSum = products.data.reduce(sumTotalPrice, 0);
        totalPrice.textContent = `$${priceSum.toFixed(2)}`;
    }
    async updateProductsCount() {
        const totalAddedProducts = document.querySelector('span[data-cart="total-added-products"');
        const { count } = await db.countAddedProducts();
        totalAddedProducts.textContent = String(count);
    }
    async updateCartText() {
        const isCartEmpty = await this.isCartEmpty();
        emptyCartText.style.setProperty('display', isCartEmpty ? 'block' : 'none');
    }
    async loadProducts(container) {
        const { ['default']: renderCartProduct } = await import('./cart-products-loader.js');
        const allProducts = await db.getAllProducts();
        if (!allProducts || !Array.isArray(allProducts.data)) {
            return;
        }
        const docFragment = document.createDocumentFragment();
        for (const product of allProducts.data) {
            const productRendered = renderCartProduct(product);
            docFragment.appendChild(productRendered);
        }
        container.appendChild(docFragment);
        Promise.all([this.updateCartText(), this.updateProductsCount(), this.updateTotalPrice()]);
    }
}
export default CartMethods;
