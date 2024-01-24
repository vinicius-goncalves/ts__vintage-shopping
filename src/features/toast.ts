import buildElement from '../utils/element-builder.js';

interface Toast {
    title: string;
    body: string;
}

const MAX_TOASTS = 5;
const MAX_MILLISECONDS_DURATION = 2000;

const toastsCreated: Array<Element> = [];
const toastsContainer = document.querySelector('[data-temp="toasts-container"]') as HTMLDivElement;
const toastSent: CustomEvent = new CustomEvent('toastsent');

function createToast(toast: Toast): HTMLElement {

    const toastWrapper = buildElement('aside')
        .addClasses('toast', 'active')
        .build();

    const toastTitle = buildElement('h2')
        .setCustomAttribute('data-toast', 'title')
        .setText(toast.title)
        .appendOn(toastWrapper)
        .build();

    const toastBody = buildElement('p')
        .setCustomAttribute('data-toast', 'body')
        .setText(toast.body)
        .build();

    toastWrapper.append(toastTitle, toastBody);
    toastsCreated.push(toastWrapper);

    return toastWrapper;
}

function sendToast(toast: Toast): void {

    const newToast: HTMLElement = createToast(toast);

    toastsContainer.append(newToast);
    toastsContainer.dispatchEvent(toastSent);
}

function removeOldestToast(): void {
    const oldestToast = toastsCreated.shift();
    oldestToast?.remove();
}

window.addEventListener('DOMContentLoaded', (): void => {

    if(!toastsContainer) {
        return;
    }

    toastsContainer.addEventListener('toastsent', (): void => {

        if(toastsCreated.length >= MAX_TOASTS) {
            removeOldestToast();
        }

        setTimeout(() => {
            removeOldestToast();
        }, toastsCreated.length * MAX_MILLISECONDS_DURATION);
    });
});

export default sendToast;