import { flatProducts } from '../features/storage/utils.js';
import CacheMethods from '../features/cache/cache-methods.js';
const cache = new CacheMethods();
async function insertImagesIntoCache() {
    const products = flatProducts();
    for (const product of products) {
        await cache.add(`${product.image_src}`, `./${product.image_src}`, true);
    }
}
insertImagesIntoCache();
export default {};
