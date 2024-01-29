import { buildElement } from '../utils/utils.js';
import CartMethods from '../cart/cart-methods.js';
import products from '../products/products-list.js';
import CacheMethods from '../features/cache/cache-methods.js';
const cm = new CartMethods();
const cache = new CacheMethods();
class ProductsMethods {
    renderCategory(category) {
        const removeUnderlineRegExp = /_/g;
        const title = category.replace(removeUnderlineRegExp, ' ');
        const div = buildElement('div')
            .setCustomAttribute('class', 'categories')
            .build();
        buildElement('h2')
            .setText(title)
            .setCustomAttribute('class', 'category-title')
            .appendOn(div)
            .build();
        buildElement('div')
            .appendOn(div)
            .build();
        return div;
    }
    async renderProduct(product, type) {
        const productContainer = buildElement('article')
            .setCustomAttribute('data-product-type', type)
            .setCustomAttribute('data-product-id', product.id)
            .on('click', () => cm.addProductIntoCart(product))
            .build();
        const hgroup = buildElement('hgroup')
            .appendOn(productContainer)
            .build();
        buildElement('h2')
            .setText(product.name)
            .appendOn(hgroup)
            .build();
        buildElement('p')
            .setText('Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!')
            .appendOn(hgroup)
            .build();
        const img = await cache.createBlobURL(product.image_src);
        const productImg = buildElement('img')
            .setAttribute('src', img)
            .build();
        const figure = buildElement('figure')
            .append(productImg)
            .build();
        buildElement('figcaption')
            .appendOn(figure)
            .setText(`$${product.price}`)
            .build();
        productContainer.append(hgroup, figure);
        return productContainer;
    }
    loadProducts() {
        const docFragment = document.createDocumentFragment();
        for (const [categoryName, productsList] of Object.entries(products)) {
            const category = this.renderCategory(categoryName);
            const productContainer = category.querySelector('div');
            productsList.forEach(async (product) => {
                const productRendered = await this.renderProduct(product, categoryName);
                productContainer.appendChild(productRendered);
            });
            docFragment.appendChild(category);
        }
        return docFragment;
    }
}
export default ProductsMethods;
