import Product from '../../products/interfaces/Product.js';
import products from '../../products/products-list.js';

function flatProducts(): Array<Product> {
    const productsFlatted: Array<Product> = Object.entries(products).map(([ _, product ]) => product).flat();
    return productsFlatted;
}

function findProductById(id: string | number): Promise<Product | undefined> {
    return new Promise((resolve, reject): void => {
        const productFound = flatProducts().find((product: Product) => product.id === id);
        return productFound ? resolve(productFound) : reject(undefined);
    });
}

function isProduct(product: Product): product is Product {
    return (product as Product).id !== undefined;
}

function startTransaction(db: IDBDatabase, options: { objectStoreName: string, mode: 'readwrite' | 'readonly' }): IDBObjectStore {

    const transaction: IDBTransaction = db.transaction(options.objectStoreName, options.mode);

    const p0: number = performance.now();

    transaction.addEventListener('complete', () => {

        const p1: number = performance.now();

        const transactionSeconds = (p1 - p0).toFixed(2);
        console.log('Transaction completed: %s', transactionSeconds.concat('ms'));
    });

    const objectStore: IDBObjectStore = transaction.objectStore(options.objectStoreName);
    return objectStore;
}

export {
    flatProducts,
    findProductById,
    isProduct,
    startTransaction
};