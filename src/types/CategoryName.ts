import type Categories from './enums/Categories.js';

type CategoryName = keyof typeof Categories;

export default CategoryName;