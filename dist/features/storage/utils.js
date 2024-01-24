import products from '../../products/products-list.js';
function flatProducts() {
    const productsFlatted = Object.entries(products).map(([_, product]) => product).flat();
    return productsFlatted;
}
function findProductById(id) {
    return new Promise((resolve, reject) => {
        const productFound = flatProducts().find((product) => product.id === id);
        return productFound ? resolve(productFound) : reject(undefined);
    });
}
function isProduct(product) {
    return product.id !== undefined;
}
function startTransaction(db, options) {
    const transaction = db.transaction(options.objectStoreName, options.mode);
    const p0 = performance.now();
    transaction.addEventListener('complete', () => {
        const p1 = performance.now();
        const transactionSeconds = (p1 - p0).toFixed(2);
        console.log('Transaction completed: %s', transactionSeconds.concat('ms'));
    });
    const objectStore = transaction.objectStore(options.objectStoreName);
    return objectStore;
}
export { flatProducts, findProductById, isProduct, startTransaction };
