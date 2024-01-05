import Product from './Product.js';

interface Cart {
    products: Array<Product>;
    updatedAt: number;
    totalItems: number;
    finalPrice: number;
    discount?: number;
}

export default Cart;