import('./storage.js');

import type Product from '../../types/interfaces/IProduct.js';

import { getDB } from './storage.js';
import { startTransaction, isProduct, findProductById } from './utils.js'

interface IDBMethods {
    addProduct(product: Product): Promise<{ product: Product }>;
    countAddedProducts(): Promise<{ count: number }>;
    getAllProducts(): Promise<{ data: Product[] }>;
    removeProductById(id: string | number): Promise<{ product: Product } | { reason: string }>;
}

let db: Promise<IDBDatabase> = getDB().then(db => db);

class DBMethods implements IDBMethods {

    addProduct(product: Product): Promise<{ product: Product }> {

        return new Promise(async (resolve, reject) => {

            if(!isProduct(product)) {
                return reject({ reason: 'invalid_product' });
            }

            const storage: IDBDatabase = await db;
            const store: IDBObjectStore = startTransaction(storage, { objectStoreName: 'products', mode: 'readwrite' });

            const key: IDBKeyRange = IDBKeyRange.only(product.id);
            const reqGET: IDBRequest<Product> = store.get(key);

            reqGET.addEventListener('success', (): void => {

                if(reqGET.result) {
                    return reject({ reason: 'product_already_in_cart' });
                }

                const reqADD = store.add(product);

                reqADD.addEventListener('success', () => {
                    resolve({ product });
                });
            });
        });
    }

    countAddedProducts(): Promise<{ count: number }> {

        return new Promise(async (resolve) => {

            const storage: IDBDatabase = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readonly' });

            const reqCOUNT: IDBRequest<number> = store.count();

            reqCOUNT.addEventListener('success', (): void => {
                resolve({ count: reqCOUNT.result });
            });
        });
    }

    getAllProducts(): Promise<{ data: Product[] }> {

        return new Promise(async (resolve, reject) => {

            const storage: IDBDatabase = await db;
            const store: IDBObjectStore = startTransaction(storage, { objectStoreName: 'products', mode: 'readonly' });

            const reqGET: IDBRequest<Product[]> = store.getAll();

            reqGET.addEventListener('success', (): void => {

                if(!reqGET.result) {
                    return reject(undefined);
                }

                resolve({ data: reqGET.result as Product[] });
            });
        });
    }

    removeProductById(id: string | number): Promise<{ product: Product } | { reason: string }> {

        return new Promise(async (resolve, reject) => {

            const storage: IDBDatabase = await db;
            const store: IDBObjectStore = startTransaction(storage, { objectStoreName: 'products', mode: 'readwrite' });

            const key: IDBKeyRange = IDBKeyRange.only(id);
            const reqGET = store.get(key);

            reqGET.addEventListener('success', (): void => {

                if(!reqGET.result) {
                    return reject({ reason: 'product_does_not_exist' });
                }

                const product: Product = reqGET.result;
                const reqDELETE: IDBRequest = store.delete(key);

                reqDELETE.addEventListener('success', (): void => {
                    if(typeof reqDELETE.result === 'undefined') {
                        resolve({ product });
                    }
                });
            });
        });
    }
}

export default DBMethods;