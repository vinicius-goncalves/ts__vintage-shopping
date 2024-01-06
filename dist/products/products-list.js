const products = {
    CANNED_GOODS: [
        {
            id: 1,
            name: 'Canned Vitamin',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: (Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0'),
            image_src: 'assets/images/products/CANNED_GOODS/CANNED_GOODS-1.png'
        },
        {
            id: 2,
            name: 'Canned Meat',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/CANNED_GOODS/CANNED_GOODS-2.png'
        },
        {
            id: 3,
            name: 'Canned Chicken',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/CANNED_GOODS/CANNED_GOODS-3.png'
        },
        {
            id: 4,
            name: 'Tomato Sauce',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/CANNED_GOODS/CANNED_GOODS-4.png'
        }
    ],
    BAKERY: [
        {
            id: 5,
            name: 'Crackers',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BAKERY/BAKERY-1.png'
        },
        {
            id: 6,
            name: 'Large Biscuits',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BAKERY/BAKERY-2.png'
        },
        {
            id: 7,
            name: 'Biscuits',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BAKERY/BAKERY-3.png'
        },
        {
            id: 8,
            name: 'Potato Chips',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BAKERY/BAKERY-4.png'
        },
        {
            id: 9,
            name: 'Ham Sandwich',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BAKERY/BAKERY-5.png'
        },
        {
            id: 10,
            name: 'Donuts',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BAKERY/BAKERY-6.png'
        }
    ],
    BEVERAGES: [
        {
            id: 11,
            name: 'Lemon Soda',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BEVERAGES/BEVERAGES-1.png'
        },
        {
            id: 12,
            name: 'Orange Soda',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BEVERAGES/BEVERAGES-2.png'
        },
        {
            id: 13,
            name: 'Coca Cola',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BEVERAGES/BEVERAGES-3.png'
        },
        {
            id: 14,
            name: 'Beer',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `${(Math.random() * (9.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: 'assets/images/products/BEVERAGES/BEVERAGES-4.png'
        }
    ]
};
export default products;
