import Product from '../../products/interfaces/Product.js';

import getDB from './storage.js'
import { startTransaction, flatProducts } from './utils.js'


class DBMethods {

    async putProduct(id: number): Promise<Product | undefined> {

        const db = await getDB();
        const store = startTransaction(db, { objectStoreName: 'products', mode: 'readwrite' });
        const productFound = flatProducts().find((product: Product) => product.id === id);

        if(!productFound) {
            return;
        }

        store.put(productFound);
        return productFound as Product;
    }

    removeProduct(id: number) {

    }
}

export default DBMethods;