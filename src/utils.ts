/**
 * 模拟延迟
 */
export function delay(timeSecond: number) {
    return new Promise<void>((resolve) => {
        const timeoutHandle = setTimeout(() => {
            clearTimeout(timeoutHandle);
            resolve();
        }, timeSecond * 1000);
    });
}

/**
 * 为 Promise 添加超时限制
 */
export function timeoutPromise<T extends Promise<T extends PromiseLike<infer U> ? U : T>>(targetPromise: T, timeSecond: number) {
    let timeoutHandle: NodeJS.Timeout;
    const timeoutLimitPromise = new Promise((res, rej) => {
        timeoutHandle = setTimeout(() => rej(new Error("Timeout exceeded")), timeSecond * 1000);
    });
    // Promise.race([p1, p2, p3])里面哪个结果获得的快，就返回那个结果，不管结果本身是成功状态还是失败状态。
    return Promise.race([targetPromise, timeoutLimitPromise]).then((res) => {
        clearTimeout(timeoutHandle);
        return res;
    }) as T;
}
