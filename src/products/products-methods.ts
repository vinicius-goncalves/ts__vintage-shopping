import type Product from '../types/interfaces/IProduct.js';
import type DocFragment from '../types/DocFragment.js';
import type CategoryName from '../types/CategoryName.js';

import { buildElement } from '../utils/utils.js';
import CartMethods from '../cart/cart-methods.js';
import products from '../products/products-list.js';
import IProductsMethods from '../types/interfaces/IProductsMethods.js';
import CacheMethods from '../features/cache/cache-methods.js';

const cm = new CartMethods();
const cache = new CacheMethods();

class ProductsMethods implements IProductsMethods {

    renderCategory(category: CategoryName): HTMLDivElement {

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

    async renderProduct(product: Product, type: CategoryName): Promise<HTMLElement> {

        const productContainer: HTMLElement = buildElement('article')
            .setCustomAttribute('data-product-type', type)
            .setCustomAttribute('data-product-id', product.id as string)
            .on('click', () => cm.addProductIntoCart(product))
            .build();

            const hgroup: HTMLElement = buildElement('hgroup')
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

            const img = await cache.createBlobURL(product.image_src) as string;

            const productImg: HTMLImageElement = buildElement('img')
                .setAttribute('src', img)
                .build();

            const figure: HTMLElement = buildElement('figure')
                .append(productImg)
                .build();

                buildElement('figcaption')
                    .appendOn(figure)
                    .setText(`$${product.price}`)
                    .build();

        productContainer.append(hgroup, figure);

        return productContainer;
    }

    loadProducts(): DocFragment<Product[]> {

        const docFragment = document.createDocumentFragment() as DocFragment<Product[]>;

        for(const [ categoryName, productsList ] of Object.entries(products)) {

            const category = this.renderCategory(categoryName as CategoryName);
            const productContainer = category.querySelector('div') as HTMLDivElement;

            productsList.forEach(async (product: Product) => {
                const productRendered = await this.renderProduct(product, categoryName as CategoryName);
                productContainer.appendChild(productRendered);
            });

            docFragment.appendChild(category);
        }

        return docFragment;
    }
}

export default ProductsMethods;