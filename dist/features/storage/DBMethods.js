import('./storage.js');
import { getDB } from './storage.js';
import { startTransaction, isProduct } from './utils.js';
let db = getDB().then(db => db);
class DBMethods {
    addProduct(product) {
        return new Promise(async (resolve, reject) => {
            if (!isProduct(product)) {
                return resolve(undefined);
            }
            const storage = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readwrite' });
            const key = IDBKeyRange.only(product.id);
            const reqGET = store.get(key);
            reqGET.addEventListener('success', () => {
                if (reqGET.result) {
                    return (void reject('The product already exists.'));
                }
                const reqADD = store.add(product);
                reqADD.addEventListener('success', () => {
                    resolve({ put: true, data: product });
                });
            });
            reqGET.addEventListener('error', () => {
                console.log('Error');
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
                    return (void reject(undefined));
                }
                resolve({ data: reqGET.result });
            });
        });
    }
    countAddedProducts() {
        return new Promise(async (resolve) => {
            const storage = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readonly' });
            const reqCOUNT = store.count();
            reqCOUNT.addEventListener('success', () => {
                resolve(reqCOUNT.result);
            });
        });
    }
    removeProductById(id) {
        return new Promise(async (resolve) => {
            const storage = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readwrite' });
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
