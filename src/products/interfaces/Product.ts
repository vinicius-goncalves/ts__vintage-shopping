import { Categories } from './Category.js';

interface Product {
    id: string | number;
    name: string;
    description: string;
    price: `$${string | number}`;
    image_src: string;
}

export default Product;