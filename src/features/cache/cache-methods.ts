async function getBlob(url: string) {
    const res = await fetch(url);
    return (await res.blob());
}

let cache: any = null;
caches.open('data').then(openedCache => cache = openedCache);

class CacheMethods {

    private createRequest(url: string) {
        const req = new Request(url, { mode: 'same-origin', referrerPolicy: 'same-origin', method: 'GET' });
        return req;
    }

    async has(path: string) {

        const req = this.createRequest(path);
        const data = await cache.match(req);

        return Boolean(data);
    }

    async get(path: string): Promise<Response | undefined> {
        return await this.has(path) ? cache.match(path) : undefined;
    }

    async getAsBlob(path: string): Promise<Blob | undefined> {
        return (await this.get(path))?.blob();
    }

    async createBlobURL(path: string): Promise<string | undefined> {
        const blob = await this.getAsBlob(path);
        return blob ? URL.createObjectURL(blob) : undefined;
    }

    async add(path: string, fromUrl: string, isBlob: boolean = false) {

        const req = this.createRequest(path);

        if(isBlob) {

            const data = await this.has(path);

            if(!data) {
                const blob = await getBlob(fromUrl);
                await cache.put(req, new Response(blob));
            }
        }

        return this.get(path);
    }
}

// const c = new CacheMethods();
// const a = await c.add('/images/bakery/bakery-1.png', './assets/images/products/bakery/bakery-1.png', true);

// c.getAsBlob('/images/bakery/bakery-1.png').then(blob => blob && console.log(URL.createObjectURL(blob)));

export default CacheMethods;