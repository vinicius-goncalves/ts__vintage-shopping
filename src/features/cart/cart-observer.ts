import CartMethods from './cart-methods.js';

const addedProductsContainer = document.querySelector('section[data-cart="cart-products"]') as HTMLElement;
const cm: CartMethods = new CartMethods();

async function handleCartMutation(mutation: MutationRecord): Promise<void> {

    const hasRemovedCartProducts: boolean = mutation.removedNodes.length > 0;

    if(!hasRemovedCartProducts) {
        return;
    }

    await cm.updateCart();
}

const observer: MutationObserver = new MutationObserver(mutations => mutations.forEach(handleCartMutation));
observer.observe(addedProductsContainer, { childList: true });

export default {};