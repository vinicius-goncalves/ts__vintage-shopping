import CartMethods from './cart-methods.js';
const addedProductsContainer = document.querySelector('section[data-cart="cart-products"]');
const cm = new CartMethods();
async function handleCartMutation(mutation) {
    const hasRemovedCartProducts = mutation.removedNodes.length > 0;
    if (!hasRemovedCartProducts) {
        return;
    }
    await cm.updateCart();
}
const observer = new MutationObserver(mutations => mutations.forEach(handleCartMutation));
observer.observe(addedProductsContainer, { childList: true });
export default {};
