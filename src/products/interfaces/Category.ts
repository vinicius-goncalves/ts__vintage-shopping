enum Categories {
    CANNED_GOODS = 'Canned Goods',
    BEVERAGES = 'Beverages',
    BAKERY = 'Bakery',
}

interface Category {
    id: string | number;
    type: Categories;
}

export { Categories, Category };