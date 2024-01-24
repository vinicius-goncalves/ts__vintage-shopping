interface ElementBuilder<T extends keyof HTMLElementTagNameMap = any> {
    addClasses(...classes: string[]): ElementBuilder<T>;
    setAttribute<K extends keyof HTMLElementTagNameMap[T] & string>(
        name: K,
        value: string
    ): ElementBuilder<T>;
    setCustomAttribute(name: string, value: string): ElementBuilder<T>;
    setText(text: Text | string): ElementBuilder<T>;
    addAttributes(attributes: { [name: string]: string }): ElementBuilder<T>;
    append(...children: HTMLElement[]): ElementBuilder<T>;
    appendOn(target: HTMLElement): ElementBuilder<T>;
    on(event: keyof GlobalEventHandlersEventMap, callback: (...args: any[]) => void): ElementBuilder<T>;
    build(): HTMLElementTagNameMap[T];
}

function buildElement<T extends keyof HTMLElementTagNameMap>(element: T & string): ElementBuilder<T> {

    const el = document.createElement(element) as HTMLElementTagNameMap[T];

    return {
        addClasses(...classes) {
            el.classList.add(...classes);
            return this;
        },
        setAttribute<K extends keyof HTMLElementTagNameMap[T]>(name: K, value: string): ElementBuilder<T> {
            el.setAttribute(name as string, value);
            return this;
        },
        setCustomAttribute(name: string, value: string): ElementBuilder<T> {
            el.setAttribute(name, value);
            return this
        },
        setText(text: Text | string): ElementBuilder<T> {

            if(text instanceof Text) {
                el.textContent = text.textContent;
                return this;
            }

            el.textContent = text;
            return this;
        },
        addAttributes(attributes: { [name: string]: string }): ElementBuilder<T> {
            for(const [ name, value ] of Object.entries(attributes)) {
                el.setAttribute(name, value);
            }
            return this;
        },
        append(...children: HTMLElement[]): ElementBuilder<T> {
            el.append(...children);
            return this;
        },
        appendOn(target: HTMLElement): ElementBuilder<T> {
            target.append(el);
            return this;
        },
        on(event: keyof GlobalEventHandlersEventMap, callback: (event: Event) => void): ElementBuilder<T> {
            el.addEventListener(event, callback);
            return this;
        },
        build(): HTMLElementTagNameMap[T] {
            return el;
        }
    };
}

export default buildElement;