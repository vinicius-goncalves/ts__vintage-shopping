import('./features/storage/storage.js');

import DBMethods from './features/storage/DBMethods.js';

import { Categories } from './products/interfaces/Category.js';
import type Product from './products/interfaces/Product.js';

import products from './products/products-list.js';
import buildElement from './utils/element-builder.js';
import sendToast from './features/toast.js';
import { findProductById } from './features/storage/utils.js';

type CategoryName = keyof typeof Categories;

const productsMain = document.querySelector('[data-products="main"]') as HTMLElement;
const db = new DBMethods();

function renderCategory(type: CategoryName): HTMLDivElement {

    const removeUnderlineRegExp = new RegExp(/_/, 'g');
    const title = type.replace(removeUnderlineRegExp, ' ');

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

function renderProduct(product: Product, type: CategoryName) {

    const productContainer = buildElement('article')
        .setCustomAttribute('data-product-type', type)
        .setCustomAttribute('data-product-id', product.id as string)
        .build();

    productContainer.addEventListener('click', async (): Promise<void> => {

        db.addProduct(product)
            .then(() => sendToast({ title: 'Yeah!', body: 'You have added a new product to your cart!' }))
            .catch(() => sendToast({ title: 'Hey!', body: 'This product is already in your cart.' }));
        // a.addProduct(product);
        // db.addProductById(1);
        // db.addProduct(product);
        // const productFound = await findProductById(product.id);

        // if(!productFound) {
        //     return;
        // }

        // console.log(productFound)

        // db.addProduct(productFound);
        // sendToast({ title: 'Yeah!', body: 'You have added a new product to your cart!' });
    });

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

    const productImg = buildElement('img')
        .setAttribute('src', product.image_src)
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

function loadProducts() {

    for(const [ category, productsList ] of Object.entries(products)) {

        const productCategory = renderCategory(category as CategoryName);
        const productContainer = productCategory.querySelector('div') as HTMLDivElement;

        productsList.forEach((product: Product) => {
            const productRendered = renderProduct(product, category as CategoryName);
            productContainer.appendChild(productRendered);
        });

        productsMain?.appendChild(productCategory);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
