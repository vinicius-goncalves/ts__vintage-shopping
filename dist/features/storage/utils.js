import products from '../../products/products-list.js';
function flatProducts() {
    const productsFlatted = Object.entries(products).map(([_, product]) => product).flat();
    return productsFlatted;
}
function findProductById(id) {
    return flatProducts().find((product) => product.id === id);
}
function startTransaction(db, options) {
    const transaction = db.transaction(options.objectStoreName, options.mode);
    transaction.addEventListener('complete', (event) => {
        console.log('Transaction completed', event.timeStamp.toString().concat('ms'));
    });
    const objectStore = transaction.objectStore(options.objectStoreName);
    return objectStore;
}
export { flatProducts, findProductById, startTransaction };
