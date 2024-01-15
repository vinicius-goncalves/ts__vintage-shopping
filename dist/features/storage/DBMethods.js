import('./storage.js');
import { getDB } from './storage.js';
import { startTransaction, isProduct } from './utils.js';
let db = getDB().then(db => db);
class DBMethods {
    addProduct(product) {
        return new Promise(async (resolve, reject) => {
            if (!isProduct(product)) {
                return reject({ reason: 'invalid_product' });
            }
            const storage = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readwrite' });
            const key = IDBKeyRange.only(product.id);
            const reqGET = store.get(key);
            reqGET.addEventListener('success', () => {
                if (reqGET.result) {
                    return reject({ reason: 'product_already_in_cart' });
                }
                const reqADD = store.add(product);
                reqADD.addEventListener('success', () => {
                    resolve({ product });
                });
            });
        });
    }
    countAddedProducts() {
        return new Promise(async (resolve) => {
            const storage = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readonly' });
            const reqCOUNT = store.count();
            reqCOUNT.addEventListener('success', () => {
                resolve({ count: reqCOUNT.result });
            });
        });
    }
    getAllProducts() {
        return new Promise(async (resolve, reject) => {
            const storage = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readonly' });
            const reqGET = store.getAll();
            reqGET.addEventListener('success', () => {
                if (!reqGET.result) {
                    return reject(undefined);
                }
                resolve({ data: reqGET.result });
            });
        });
    }
    removeProductById(id) {
        return new Promise(async (resolve, reject) => {
            const storage = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readwrite' });
            const key = IDBKeyRange.only(id);
            const reqGET = store.get(key);
            reqGET.addEventListener('success', () => {
                if (!reqGET.result) {
                    return reject({ reason: 'product_does_not_exist' });
                }
                const product = reqGET.result;
                const reqDELETE = store.delete(key);
                reqDELETE.addEventListener('success', () => {
                    if (typeof reqDELETE.result === 'undefined') {
                        resolve({ product });
                    }
                });
            });
        });
    }
}
export default DBMethods;
