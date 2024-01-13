import Product from '../../products/interfaces/Product.js';
import findDOMElement from '../../utils/find-dom-element.js';
import DBMethods from '../storage/DBMethods.js';

import sendToast from '../toast.js';

const db = new DBMethods();

interface ICartMethods {
    addProductIntoCart(product: Product): void;
    removeProductFromCart(product: Product): void;
}

class CartMethods implements ICartMethods {

    addProductIntoCart(product: Product): void {

        db.addProduct(product)
            .then(() => sendToast({ title: 'Yeah!', body: 'You have added a new product to your cart!' }))
            .catch(() => sendToast({ title: 'Hey!', body: 'This product is already in your cart.' }));
    }

    removeProductFromCart(product: Product): void {
        db.removeProductById(product.id)
            .then(() => findDOMElement(`[data-product-id="${product.id}"]`)?.remove());
    }
}

export default CartMethods;