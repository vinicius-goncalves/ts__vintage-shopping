import CartMethods from "./CartMethods.js";

const addedProductsContainer = document.querySelector('section[data-cart="cart-products"]') as HTMLElement;
const cm: CartMethods = new CartMethods();

async function handleCartMutation(mutation: MutationRecord): Promise<void> {

    const hasRemovedCartProducts: boolean = mutation.removedNodes.length > 0;

    if(!hasRemovedCartProducts) {
        return;
    }

    await Promise.all([ cm.updateProductsCount(), cm.updateTotalPrice(), cm.updateCartText() ]);
}

const observer: MutationObserver = new MutationObserver(mutations => mutations.forEach(handleCartMutation));
observer.observe(addedProductsContainer, { childList: true });

export default {};