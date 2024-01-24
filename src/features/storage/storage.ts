const DB_NAME: string = 'cart';
const DB_VERSION: number = 1;

const dbRequest: IDBOpenDBRequest = indexedDB.open(DB_NAME, DB_VERSION);

dbRequest.addEventListener('upgradeneeded', (event: IDBVersionChangeEvent) => {

    const db = (event.target as IDBRequest).result as IDBDatabase;
    const objectStoreNames = db.objectStoreNames;

    if(objectStoreNames.contains('products')) {
        return;
    }

    db.createObjectStore('products', { keyPath: 'id' });
});

async function getDB(): Promise<IDBDatabase> {

    return new Promise(resolve => {
        dbRequest.addEventListener('success', () => {
            const db = dbRequest.result as IDBDatabase;
            resolve(db);
        });
    });
}

export { getDB };