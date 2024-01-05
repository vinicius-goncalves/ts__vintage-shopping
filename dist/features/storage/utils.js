import products from '../../products/products-list.js';
function flatProducts() {
    const productsFlatted = Object.entries(products).map(([_, product]) => product).flat();
    return productsFlatted;
}
function startTransaction(db, options) {
    const transaction = db.transaction(options.objectStoreName, options.mode);
    const objectStore = transaction.objectStore(options.objectStoreName);
    return objectStore;
}
export { flatProducts, startTransaction };
