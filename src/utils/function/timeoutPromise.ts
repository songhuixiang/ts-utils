/**
 * 为 Promise 添加超时限制
 * @example
const doSomething = function () {
    return new Promise<string>((resolve, reject) => {
        delay(3).then(() => {
            resolve("done");
        });
    });
};

// Apply a timeout of 5 seconds to doSomething
let doIt = timeoutPromise(doSomething(), 5);

// Wait for the promise to get resolved
doIt.then((response) => {
    // Use response
    console.log("doSomething completed");
});

// Wait for the promise to get rejected or timed out
doIt.catch((error) => {
    // Deal with error
    console.log("Timeout exceeded");
});
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
