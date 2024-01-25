import { buildElement, removeDOMElement } from '../../utils/utils.js';
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
            .then(() => removeDOMElement(`[data-product-id="${product.id}"]`));
    }
    async isCartEmpty() {
        const { count } = await db.countAddedProducts();
        return count === 0;
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
    renderCartProduct(product) {
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
            .on('click', () => this.removeProductFromCart(product))
            .build();
        productWrapper.appendChild(productDetails);
        return productWrapper;
    }
    async updateCart() {
        await Promise.all([this.updateCartText(), this.updateProductsCount(), this.updateTotalPrice()]);
    }
    async loadProducts(container) {
        const allProducts = await db.getAllProducts();
        if (!allProducts || !Array.isArray(allProducts.data)) {
            return;
        }
        const docFragment = document.createDocumentFragment();
        for (const product of allProducts.data) {
            const productRendered = this.renderCartProduct(product);
            docFragment.appendChild(productRendered);
        }
        container.appendChild(docFragment);
        await this.updateCart();
    }
}
export default CartMethods;
