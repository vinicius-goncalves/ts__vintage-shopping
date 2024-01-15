function findDOMElement(selector, root = document.body) {
    return new Promise(resolve => {
        const elFound = root.querySelector(selector);
        return resolve(elFound?.matches(selector) ? elFound : undefined);
    });
}
function removeDOMElement(selector, root = document.body) {
    findDOMElement(selector, root).then(DOMElement => {
        if (DOMElement) {
            DOMElement.remove();
        }
    });
}
export { findDOMElement, removeDOMElement };
