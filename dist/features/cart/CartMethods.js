import findDOMElement from '../../utils/find-dom-element.js';
import DBMethods from '../storage/DBMethods.js';
import sendToast from '../toast.js';
const db = new DBMethods();
class CartMethods {
    addProductIntoCart(product) {
        db.addProduct(product)
            .then(() => sendToast({ title: 'Yeah!', body: 'You have added a new product to your cart!' }))
            .catch(() => sendToast({ title: 'Hey!', body: 'This product is already in your cart.' }));
    }
    removeProductFromCart(product) {
        db.removeProductById(product.id)
            .then(() => findDOMElement(`[data-product-id="${product.id}"]`)?.remove())
            .then(() => sendToast({ title: 'Ok', body: 'You have removed a product from your cart.' }));
    }
}
export default CartMethods;
