import products from './products/products-list.js';
import buildElement from './utils/element-builder.js';
import sendToast from './features/toast.js';
const productsMain = document.querySelector('[data-products="main"]');
function renderCategory(type) {
    const title = type.replace(/_/g, ' ');
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
function renderProduct(product, type) {
    const productContainer = buildElement('article')
        .setCustomAttribute('data-product-type', type)
        .setCustomAttribute('data-product-id', product.id)
        .build();
    productContainer.addEventListener('click', () => {
        sendToast({ title: 'Yeah!', body: 'You have added a new product to your cart!' });
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
    for (const [category, productsList] of Object.entries(products)) {
        const productCategory = renderCategory(category);
        const productContainer = productCategory.querySelector('div');
        productsList.forEach((product) => {
            const productRendered = renderProduct(product, category);
            productContainer.appendChild(productRendered);
        });
        productsMain?.appendChild(productCategory);
    }
}
window.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});
