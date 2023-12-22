const products = {
    CANNED_GOODS: [
        {
            id: 1,
            name: 'Canned Vitamin',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `$${(Math.random() * (5.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: ''
        },
        {
            id: 2,
            name: 'Canned Meat',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `$${(Math.random() * (5.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: ''
        },
        {
            id: 3,
            name: 'Canned Chicken',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `$${(Math.random() * (5.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: ''
        },
        {
            id: 4,
            name: 'Tomato Sauce',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, consequatur laboriosam odio laborum nobis inventore!',
            price: `$${(Math.random() * (5.99 - 0.99) + 0.99).toFixed(2).padStart(2, '0')}`,
            image_src: ''
        }
    ],
    BAKERY: [],
    BEVERAGES: []
};
export {};
