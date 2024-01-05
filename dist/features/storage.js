const DB_NAME = 'cart';
const DB_VERSION = 1;
const db = indexedDB.open(DB_NAME, DB_VERSION);
async function getStorage() {
    return new Promise(resolve => {
        db.addEventListener('success', (event) => {
            const dbResult = event.target;
            resolve(dbResult.result);
        });
    });
}
const openedDb = await getStorage();
db.addEventListener('upgradeneeded', async () => {
    const objectStoreNames = openedDb.objectStoreNames;
    if (!objectStoreNames.contains('products')) {
        return;
    }
    const productsStore = openedDb.createObjectStore('products');
    productsStore.put({ id: 1, });
    // const objectStoreNames = openedDb.;
    // getStorage().then(dbStorage => {
    //     const indexedDBDatabase =
    //     const objectStoreNames = (dbStorage as IDBDatabase).objectStoreNames;
    //     if(objectStoreNames.contains('products')) {
    //         const transaction = (dbStorage as IDBDatabase).cre
    //     }
    // });
    // const dbResult = event.target as IDBOpenDBRequest;
    // console.log(objectStoreNames)
});
class Methods {
    async putProduct(product) {
        // const storage = await getStorage();
        // storage.
    }
}
export {};
// getStorage().then((openedDb: IDBOpenDBRequest | unknown) => {
//     if(!db) {
//         return;
//     }
//     // if(dbOpened instanceof IDBOpenDBRequest) {
//     // }
// })
