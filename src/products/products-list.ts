import type Product from '../types/interfaces/IProduct.js';

import { Categories } from '../types/interfaces/ICategory.js';

function generateRandomPrice(): string {
    return (Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0');
}

const products: Record<keyof typeof Categories, Array<Product>> = {
    CANNED_GOODS: [
        {
            id: 1,
            name: 'Canned Vitamin',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: generateRandomPrice(),
            image_src: 'assets/images/products/canned_goods/canned_goods-1.png'
        },
        {
            id: 2,
            name: 'Canned Meat',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/canned_goods/canned_goods-2.png'
        },
        {
            id: 3,
            name: 'Canned Chicken',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/canned_goods/canned_goods-3.png'
        },
        {
            id: 4,
            name: 'Tomato Sauce',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/canned_goods/canned_goods-4.png'
        }
    ],
    BAKERY: [
        {
            id: 5,
            name: 'Crackers',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/bakery/bakery-1.png'
        },
        {
            id: 6,
            name: 'Large Biscuits',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/bakery/bakery-2.png'
        },
        {
            id: 7,
            name: 'Biscuits',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/bakery/bakery-3.png'
        },
        {
            id: 8,
            name: 'Potato Chips',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/bakery/bakery-4.png'
        },
        {
            id: 9,
            name: 'Ham Sandwich',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/bakery/bakery-5.png'
        },
        {

            id: 10,
            name: 'Donuts',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/bakery/bakery-6.png'
        }
    ],
    BEVERAGES: [
        {

            id: 11,
            name: 'Lemon Soda',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/beverages/beverages-1.png'
        },
        {

            id: 12,
            name: 'Orange Soda',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/beverages/beverages-2.png'
        },
        {

            id: 13,
            name: 'Coca Cola',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/beverages/beverages-3.png'
        },
        {

            id: 14,
            name: 'Beer',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${generateRandomPrice()}`,
            image_src: 'assets/images/products/beverages/beverages-4.png'
        }
    ]
};

export default products;