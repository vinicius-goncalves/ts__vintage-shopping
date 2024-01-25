import { buildElement } from '../utils/utils.js';
const MAX_TOASTS = 5;
const MAX_MILLISECONDS_DURATION = 2000;
const toastsCreated = [];
const toastsContainer = document.querySelector('[data-temp="toasts-container"]');
const toastSent = new CustomEvent('toastsent');
function createToast(toast) {
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
function sendToast(toast) {
    const newToast = createToast(toast);
    toastsContainer.append(newToast);
    toastsContainer.dispatchEvent(toastSent);
}
function removeOldestToast() {
    const oldestToast = toastsCreated.shift();
    oldestToast?.remove();
}
window.addEventListener('DOMContentLoaded', () => {
    if (!toastsContainer) {
        return;
    }
    toastsContainer.addEventListener('toastsent', () => {
        if (toastsCreated.length >= MAX_TOASTS) {
            removeOldestToast();
        }
        setTimeout(() => {
            removeOldestToast();
        }, toastsCreated.length * MAX_MILLISECONDS_DURATION);
    });
});
export default sendToast;
