import Product from '../../products/interfaces/Product.js';
import { removeDOMElement } from '../../utils/dom-manipulation.js';
import DBMethods from '../storage/DBMethods.js';

import sendToast from '../toast.js';

const db = new DBMethods();

interface ICartMethods {
    addProductIntoCart(product: Product): void;
    removeProductFromCart(product: Product): void;
}

class CartMethods implements ICartMethods {

    addProductIntoCart(product: Product) {

        db.addProduct(product)
            .then(() => sendToast({ title: 'Yeah!', body: 'You have added a new product to your cart!' }))
            .catch(() => sendToast({ title: 'Hey!', body: 'This product is already in your cart.' }));
    }

    removeProductFromCart(product: Product) {

        db.removeProductById(product.id)
            .then(() => sendToast({ title: 'Ok', body: 'You have removed a product from your cart.' }))
            .then(async () => removeDOMElement(`[data-product-id="${product.id}"]`));
    }
}

export default CartMethods;