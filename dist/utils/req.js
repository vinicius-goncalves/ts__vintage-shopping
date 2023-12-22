"use strict";
function req(mode, url, options) {
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
req('GET', '../dist/assets/fonts/showguide.TTF', { responseType: 'arraybuffer' }).then(a => {
    console.log(a);
});
