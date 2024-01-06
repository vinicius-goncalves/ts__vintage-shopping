import Product from '../../products/interfaces/Product.js';

import getDB from './storage.js'
import { startTransaction, findProductById } from './utils.js'

type DBMethodsReturnType = Promise<{ [key: string]: unknown, data: Product} | undefined>;

interface IDBMethods {
    addProduct(id: string | number): DBMethodsReturnType;
    removeProduct(id: string | number): DBMethodsReturnType;
}

class DBMethods implements IDBMethods {

    addProduct(id: string | number): DBMethodsReturnType {
        return new Promise(async (resolve, reject) => {

            const db = await getDB();
            const store = startTransaction(db, { objectStoreName: 'products', mode: 'readwrite' });

            const key = IDBKeyRange.only(id);
            const reqGET = store.get(key);

            reqGET.addEventListener('success', () => {

                if(reqGET.result) {
                    return (void reject('The product already exists.'));
                }

                const productFound = findProductById(id);

                if(!productFound) {
                    return (void resolve(undefined));
                }

                const reqADD = store.add(productFound);
                reqADD.addEventListener('success', () => {
                    resolve({ put: true, data: productFound });
                });
            });
        });
    }

    removeProduct(id: string | number): DBMethodsReturnType {
        return new Promise(async (resolve) => {

            const db = await getDB();
            const store = startTransaction(db, { objectStoreName: 'products', mode: 'readwrite' });

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