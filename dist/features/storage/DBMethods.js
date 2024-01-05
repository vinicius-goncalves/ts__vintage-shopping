import getDB from './storage.js';
import { startTransaction, flatProducts } from './utils.js';
class DBMethods {
    async putProduct(id) {
        const db = await getDB();
        const store = startTransaction(db, { objectStoreName: 'products', mode: 'readwrite' });
        const productFound = flatProducts().find((product) => product.id === id);
        if (!productFound) {
            return;
        }
        store.put(productFound);
        return productFound;
    }
    removeProduct(id) {
    }
}
export default DBMethods;
