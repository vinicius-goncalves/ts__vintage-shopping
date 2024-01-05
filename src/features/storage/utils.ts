import products from '../../products/products-list.js';

function flatProducts() {
    const productsFlatted = Object.entries(products).map(([ _, product ]) => product).flat();
    return productsFlatted;
}

function startTransaction(db: IDBDatabase, options: { objectStoreName: string, mode: 'readwrite' | 'readonly' }): IDBObjectStore {
    const transaction: IDBTransaction = db.transaction(options.objectStoreName, options.mode);
    const objectStore: IDBObjectStore = transaction.objectStore(options.objectStoreName);
    return objectStore;
}

export {
    flatProducts,
    startTransaction
};