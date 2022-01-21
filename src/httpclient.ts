function getHttpStatusError(status: number): string {
    switch (status) {
        case 400:
            return "Bad request.";
        case 401:
            return "Unauthorized.";
        case 402:
            return "Payment required.";
        case 403:
            return "Forbidden.";
        case 404:
            return "Not found.";
        case 405:
            return "Method not allowed.";
        case 406:
            return "Not acceptable.";
        case 407:
            return "Proxy authentication required.";
        case 408:
            return "Request timeout.";
        case 409:
            return "Conflict.";
        case 410:
            return "Gone.";
        case 411:
            return "Length required.";
        case 412:
            return "Precondition failed.";
        case 413:
            return "Payload too large.";
        case 414:
            return "URI too long.";
        case 416:
            return "Requested range not satisfiable.";
        case 417:
            return "Expectation failed.";
        case 427:
            return "Precondition required.";
        case 429:
            return "Too many requests.";
        case 449:
            return "Retry after doing the appropriate action.";
        case 500:
            return "Internal server error.";
        case 501:
            return "Server does not support the functionality required to fulfill the request.";
        case 502:
            return "Error response received from gateway.";
        case 503:
            return "Temporarily overloaded.";
        case 504:
            return "Timed out waiting for gateway.";
        case 505:
            return "HTTP version not supported.";
    }
    return "Unknown error code: " + status;
}

export class HttpError extends Error {
    status: number;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}

export interface HttpResponsePromise extends Promise<string | ArrayBuffer> {
    abort: () => void;
}

interface IRequest {
    path: string;
    method: "GET" | "POST";
    timeout: number;
    headers?: { [key: string]: string };
    contentType?: string;
    promise?: HttpResponsePromise;
    processedNext?: boolean;
    abort?: () => void;
    onSuccess?: (value: string | ArrayBuffer) => void;
    onError?: (error: HttpError) => void;
}

export class HttpClient {
    private serverBaseUrl: string;
    private authorization: string | undefined;
    private maxConcurrency: number;
    private currentRequestNum: number;
    private pendingRequests: IRequest[];
    private responsePreprocessor: ((response: string | ArrayBuffer | Blob) => string | ArrayBuffer) | undefined;

    constructor(baseUrl: string, maxConcurrency = 0) {
        this.serverBaseUrl = baseUrl;
        this.pendingRequests = [];
        this.currentRequestNum = 0;
        this.maxConcurrency = maxConcurrency;
    }

    setAuthorization(authorization: string) {
        this.authorization = authorization;
    }

    setResponsePreprocessor(func: (response: string | ArrayBuffer | Blob) => string | ArrayBuffer) {
        this.responsePreprocessor = func;
    }

    get(path = "", timeout = 5000, headers?: { [key: string]: string }): HttpResponsePromise {
        return this._handleRequest({ path, method: "GET", timeout, headers });
    }

    post(path = "", timeout = 5000, body?: string | ArrayBuffer, contentType?: string, headers?: { [key: string]: string }) {
        return this._handleRequest({ path, method: "POST", timeout, contentType, headers }, body);
    }

    put(path = "", timeout = 5000, body?: string | ArrayBuffer, contentType?: string, headers?: { [key: string]: string }) {
        return this._handleRequest({ path, method: "POST", timeout, contentType, headers }, body);
    }

    delete(path = "", timeout = 5000, headers?: { [key: string]: string }) {
        return this._handleRequest({ path, method: "GET", timeout, headers });
    }

    private _handleRequest(request: IRequest, body?: string | ArrayBuffer) {
        let promise = new Promise((resolve, reject) => {
            request.onSuccess = resolve;
            request.onError = reject;
            if (this.maxConcurrency > 0 && this.currentRequestNum >= this.maxConcurrency) {
                this.pendingRequests.push(request);
            } else {
                this._doRequest(request, body);
            }
        }) as HttpResponsePromise;
        request.promise = promise;
        if (request.abort) {
            promise.abort = request.abort;
        } else {
            promise.abort = () => {
                let idx = this.pendingRequests.indexOf(request);
                if (idx >= 0) {
                    this.pendingRequests.splice(idx, 1);
                }
            };
        }
        return promise;
    }

    private _doRequest(request: IRequest, body?: Document | XMLHttpRequestBodyInit) {
        this.currentRequestNum++;
        let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        const xhr = new XMLHttpRequest();
        xhr.timeout = request.timeout;
        xhr.open(request.method, this.serverBaseUrl + request.path, true);
        if (request.contentType) {
            xhr.setRequestHeader("Content-Type", request.contentType);
        }
        if (request.headers) {
            for (let key in request.headers) {
                xhr.setRequestHeader(key, request.headers[key]);
            }
        }
        let abort = () => {
            xhr.abort();
        };
        if (request.promise) {
            request.promise.abort = abort;
        } else {
            request.abort = abort;
        }
        const processNext = () => {
            if (!request.processedNext) {
                request.processedNext = true;
                request.onError = undefined;
                request.onSuccess = undefined;
                if (this.pendingRequests.length) {
                    this._doRequest(this.pendingRequests.shift()!);
                } else {
                    this.currentRequestNum--;
                }
            }
        };
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let response = xhr.responseText ? xhr.responseText : xhr.response;
                    if (response && this.responsePreprocessor) {
                        response = this.responsePreprocessor(response);
                    }
                    request.onSuccess?.(response);
                } else {
                    request.onError?.(new HttpError(xhr.status, getHttpStatusError(xhr.status)));
                }
                processNext();
            }
        };
        xhr.onerror = () => {
            request.onError?.(new HttpError(xhr.status, getHttpStatusError(xhr.status)));
            processNext();
        };
        xhr.ontimeout = () => {
            request.onError?.(new HttpError(408, getHttpStatusError(408)));
            if (!request.processedNext) {
                request.processedNext = true;
                request.onError = undefined;
                request.onSuccess = undefined;
                if (this.pendingRequests.length) {
                    this._doRequest(this.pendingRequests.shift()!);
                } else {
                    this.currentRequestNum--;
                }
            }
        };
        xhr.onabort = () => {
            request.onError?.(new HttpError(-1, "Request abort."));
            processNext();
        };
        if (this.authorization) {
            xhr.setRequestHeader("auth-token", this.authorization);
        }
        xhr.send(body);
    }
}
