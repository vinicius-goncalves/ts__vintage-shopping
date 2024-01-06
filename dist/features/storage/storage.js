const DB_NAME = 'cart';
const DB_VERSION = 1;
const dbRequest = indexedDB.open(DB_NAME, DB_VERSION);
dbRequest.addEventListener('upgradeneeded', (event) => {
    const db = event.target.result;
    const objectStoreNames = db.objectStoreNames;
    if (objectStoreNames.contains('products')) {
        return;
    }
    db.createObjectStore('products', { keyPath: 'id' });
});
async function getDB() {
    return new Promise(resolve => {
        dbRequest.addEventListener('success', () => {
            const db = dbRequest.result;
            resolve(db);
        });
    });
}
export default getDB;
