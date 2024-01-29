async function getBlob(url) {
    const res = await fetch(url);
    return (await res.blob());
}
let cache = null;
caches.open('data').then(openedCache => cache = openedCache);
class CacheMethods {
    createRequest(url) {
        const req = new Request(url, { mode: 'same-origin', referrerPolicy: 'same-origin', method: 'GET' });
        return req;
    }
    async has(path) {
        const req = this.createRequest(path);
        const data = await cache.match(req);
        return Boolean(data);
    }
    async get(path) {
        return await this.has(path) ? cache.match(path) : undefined;
    }
    async getAsBlob(path) {
        return (await this.get(path))?.blob();
    }
    async createBlobURL(path) {
        const blob = await this.getAsBlob(path);
        return blob ? URL.createObjectURL(blob) : undefined;
    }
    async add(path, fromUrl, isBlob = false) {
        const req = this.createRequest(path);
        if (isBlob) {
            const data = await this.has(path);
            if (!data) {
                const blob = await getBlob(fromUrl);
                await cache.put(req, new Response(blob));
            }
        }
        return this.get(path);
    }
}
export default CacheMethods;
