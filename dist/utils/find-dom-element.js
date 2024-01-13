function findDOMElement(selector, root) {
    if (root) {
        const elFound = root.querySelector(selector);
        return elFound?.matches(selector) ? elFound : undefined;
    }
    const body = document.body;
    const elFound = body.querySelector(selector);
    return elFound?.matches(selector) ? elFound : undefined;
}
export default findDOMElement;
