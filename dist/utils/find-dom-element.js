function findDOMElement(selector, root = document.body) {
    return new Promise(resolve => {
        const elFound = root.querySelector(selector);
        return resolve(elFound?.matches(selector) ? elFound : undefined);
    });
}
export default findDOMElement;
