import getDB from './storage.js';
import { startTransaction, findProductById } from './utils.js';
class DBMethods {
    addProduct(id) {
        return new Promise(async (resolve, reject) => {
            const db = await getDB();
            const store = startTransaction(db, { objectStoreName: 'products', mode: 'readwrite' });
            const key = IDBKeyRange.only(id);
            const reqGET = store.get(key);
            reqGET.addEventListener('success', () => {
                if (reqGET.result) {
                    return (void reject('The product already exists.'));
                }
                const productFound = findProductById(id);
                if (!productFound) {
                    return (void resolve(undefined));
                }
                const reqADD = store.add(productFound);
                reqADD.addEventListener('success', () => {
                    resolve({ put: true, data: productFound });
                });
            });
        });
    }
    removeProduct(id) {
        return new Promise(async (resolve) => {
            const db = await getDB();
            const store = startTransaction(db, { objectStoreName: 'products', mode: 'readwrite' });
            const key = IDBKeyRange.only(id);
            const reqGET = store.get(key);
            reqGET.addEventListener('success', () => {
                if (!reqGET.result) {
                    return (void resolve(undefined));
                }
                const product = reqGET.result;
                const reqDELETE = store.delete(key);
                reqDELETE.addEventListener('success', () => {
                    if (typeof reqDELETE.result === 'undefined') {
                        resolve({ deleted: true, data: product });
                    }
                });
            });
        });
    }
}
export default DBMethods;
