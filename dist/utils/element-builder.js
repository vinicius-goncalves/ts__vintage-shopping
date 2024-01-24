function buildElement(element) {
    const el = document.createElement(element);
    return {
        addClasses(...classes) {
            el.classList.add(...classes);
            return this;
        },
        setAttribute(name, value) {
            el.setAttribute(name, value);
            return this;
        },
        setCustomAttribute(name, value) {
            el.setAttribute(name, value);
            return this;
        },
        setText(text) {
            if (text instanceof Text) {
                el.textContent = text.textContent;
                return this;
            }
            el.textContent = text;
            return this;
        },
        addAttributes(attributes) {
            for (const [name, value] of Object.entries(attributes)) {
                el.setAttribute(name, value);
            }
            return this;
        },
        append(...children) {
            el.append(...children);
            return this;
        },
        appendOn(target) {
            target.append(el);
            return this;
        },
        on(event, callback) {
            el.addEventListener(event, callback);
            return this;
        },
        build() {
            return el;
        }
    };
}
export default buildElement;
