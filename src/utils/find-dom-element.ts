function findDOMElement(selector: string, root: Element = document.body): Promise<Element | undefined> {
    return new Promise(resolve => {

        const elFound = root.querySelector(selector);
        return resolve(elFound?.matches(selector) ? elFound : undefined);
    })
}

export default findDOMElement;