import CartMethods from "./CartMethods.js";
const addedProductsContainer = document.querySelector('section[data-cart="cart-products"]');
const cm = new CartMethods();
async function handleCartMutation(mutation) {
    const hasRemovedCartProducts = mutation.removedNodes.length > 0;
    if (!hasRemovedCartProducts) {
        return;
    }
    await Promise.all([cm.updateProductsCount(), cm.updateTotalPrice(), cm.updateCartText()]);
}
const observer = new MutationObserver(mutations => mutations.forEach(handleCartMutation));
observer.observe(addedProductsContainer, { childList: true });
export default {};
