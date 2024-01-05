import getDB from './storage.js';
class DBMethods {
    async putProduct(id) {
        const db = await getDB();
        console.log(db);
    }
    removeProduct(id) {
    }
}
