import buildElement from '../utils/element-builder.js';
const toastsCreated = [];
const toastsContainer = document.querySelector('[data-temp="toasts-container"]');
const toastSent = new CustomEvent('toastsent');
function createToast(toast) {
    const toastWrapper = buildElement('aside')
        .setCustomAttribute('class', 'toast')
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
    newToast.classList.toggle('active');
    toastsContainer.append(newToast);
    toastsContainer.dispatchEvent(toastSent);
}
window.addEventListener('DOMContentLoaded', () => {
    if (!toastsContainer) {
        return;
    }
    toastsContainer.addEventListener('toastsent', () => {
        setTimeout(() => {
            const oldestToast = toastsCreated.shift();
            oldestToast?.remove();
            toastsCreated.slice(0, 1);
        }, toastsCreated.length * 2000);
    });
});
export default sendToast;
