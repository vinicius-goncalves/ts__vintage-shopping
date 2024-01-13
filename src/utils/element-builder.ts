interface ElementBuilder<T extends keyof HTMLElementTagNameMap = any> {
    setAttribute<K extends keyof HTMLElementTagNameMap[T] & string>(
        name: K,
        value: string
    ): ElementBuilder<T>;
    setCustomAttribute(name: string, value: string): ElementBuilder<T>;
    setText(text: Text | string): ElementBuilder<T>;
    addAttributes(attributes: { [name: string]: string }): ElementBuilder<T>;
    append(child: HTMLElement): ElementBuilder<T>;
    appendOn(target: HTMLElement): ElementBuilder<T>;
    on(event: keyof GlobalEventHandlersEventMap, callback: (...args: any[]) => void): ElementBuilder<T>;
    build(): HTMLElementTagNameMap[T];
}

function buildElement<T extends keyof HTMLElementTagNameMap>(element: T & string): ElementBuilder<T> {

    const el = document.createElement(element) as HTMLElementTagNameMap[T];

    return {
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
        append(child: HTMLElement): ElementBuilder<T> {
            el.appendChild(child);
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