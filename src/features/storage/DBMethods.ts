import('./storage.js');

import type Product from '../../products/interfaces/Product.js';
import { getDB } from './storage.js';

import { startTransaction, findProductById, isProduct } from './utils.js'

type DBMethodsReturnType = Promise<{ [key: string]: unknown, data: Product | Product[] } | undefined>;

interface IDBMethods {
    addProduct(product: Product): DBMethodsReturnType;
    getAllProducts(): DBMethodsReturnType;
    removeProductById(id: string | number): DBMethodsReturnType;
}

let db = getDB().then(db => db);

class DBMethods implements IDBMethods {

    addProduct(product: Product): DBMethodsReturnType {

        return new Promise(async (resolve, reject): Promise<void> => {

            if(!isProduct(product)) {
                return resolve(undefined)
            }

            const storage = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readwrite' });

            const key = IDBKeyRange.only(product.id);
            const reqGET = store.get(key);

            reqGET.addEventListener('success', () => {

                if(reqGET.result) {
                    return (void reject('The product already exists.'));
                }

                const reqADD = store.add(product);
                reqADD.addEventListener('success', () => {
                    resolve({ put: true, data: product });
                });
            });

            reqGET.addEventListener('error', () => {
                console.log('Error')
            })
        });
    }

    getAllProducts(): DBMethodsReturnType {

        return new Promise(async (resolve, reject) => {

            const storage: IDBDatabase = await db;
            const store: IDBObjectStore = startTransaction(storage, { objectStoreName: 'products', mode: 'readonly' });

            const reqGET: IDBRequest<Product[]> = store.getAll();

            reqGET.addEventListener('success', (): void => {

                if(!reqGET.result) {
                    return (void reject(undefined));
                }

                resolve({ data: reqGET.result as Product[] });
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

    removeProductById(id: string | number): DBMethodsReturnType {

        return new Promise(async (resolve) => {

            const storage = await db;
            const store = startTransaction(storage, { objectStoreName: 'products', mode: 'readwrite' });

            const key = IDBKeyRange.only(id);
            const reqGET = store.get(key);

            reqGET.addEventListener('success', (): void => {

                if(!reqGET.result) {
                    return (void resolve(undefined));
                }

                const product: Product = reqGET.result;
                const reqDELETE: IDBRequest = store.delete(key);

                reqDELETE.addEventListener('success', (): void => {
                    if(typeof reqDELETE.result === 'undefined') {
                        resolve({ deleted: true, data: product });
                    }
                });
            });
        });
    }
}

export default DBMethods;