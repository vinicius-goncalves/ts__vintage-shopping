function findDOMElement(selector: string, root: Element = document.body): Promise<Element | undefined> {
    return new Promise(resolve => {
        const elFound: Element | null = root.querySelector(selector);
        return resolve(elFound?.matches(selector) ? elFound : undefined);
    })
}

function removeDOMElement(selector: string, root: Element = document.body): void {
    findDOMElement(selector, root).then(DOMElement => {
        if(DOMElement) {
            DOMElement.remove();
        }
    });
}

export { findDOMElement, removeDOMElement };