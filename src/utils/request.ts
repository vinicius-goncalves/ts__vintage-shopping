type ReqMode = 'GET' | 'POST';

type ReqOptions = {
    responseType: XMLHttpRequestResponseType
};

function request(mode: ReqMode, url: string, options?: Partial<ReqOptions>): Promise<any> {

    return new Promise((resolve) => {

        const xhr = new XMLHttpRequest();

        xhr.addEventListener('load', () => {
            resolve(xhr.response);
        });

        if(options) {

            if('responseType' in options) {
                xhr.responseType = options.responseType as XMLHttpRequestResponseType;
            }
        }

        xhr.open(mode as ReqMode, url);
        xhr.send();
    });
}