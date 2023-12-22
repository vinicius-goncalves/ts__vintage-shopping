"use strict";
function request(mode, url, options) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            resolve(xhr.response);
        });
        if (options) {
            if ('responseType' in options) {
                xhr.responseType = options.responseType;
            }
        }
        xhr.open(mode, url);
        xhr.send();
    });
}
