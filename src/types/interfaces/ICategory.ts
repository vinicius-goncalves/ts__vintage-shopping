import type Categories from '../enums/Categories.js';

interface Category {
    id: string | number;
    type: Categories;
}

export { Categories, Category };