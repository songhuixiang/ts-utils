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

/**
 * 数组的差异
 */
export function arrayDiff<T>(a: T[], b: T[]): T[] {
    const setX = new Set(a);
    const setY = new Set(b);
    return [...a.filter((x) => !setY.has(x)), ...b.filter((x) => !setX.has(x))];
}

/**
 * 数组去重
 */
export function uniqueArray<T>(arr: T[]): T[] {
    return [...new Set(arr)];
}

/**
 * String 是否为 Json
 */
export function isJSON(str: string) {
    try {
        JSON.parse(str);
    } catch {
        return false;
    }
    return true;
}

/**
 * 获取文件后缀名
 */
export function getExt(filename: string) {
    return filename.split(".").pop()?.toLowerCase();
}

/**
 * 深拷贝
 * 缺陷：只拷贝对象、数组以及对象数组，对于大部分场景已经足够
 * If you do not use Maps, Sets, Dates, functions, undefined, Infinity, [NaN], RegExps, Blobs, FileLists, ImageDatas, sparse Arrays, Typed Arrays or other complex types within your object,
 * a very simple one liner to deep clone an object is: JSON.parse(JSON.stringify(object))
 */
export function deepCopy<T extends object>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
}

/**
 * 生成随机id
 * @param length 默认长度为8
 */
export function uuid(length = 8, chars?: string) {
    chars = chars ?? "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}

/**
 * 保留小数点后几位，默认2位
 * @param no 默认为小数点后2位
 */
export function cutNumber(number: number, no = 2) {
    return Number(number.toFixed(no));
}

/**
 * 浮点数判等
 * @param tolerance 公差默认为 Number.EPSILON
 */
export function equals(a: number, b: number, tolerance = Number.EPSILON) {
    // let f1 = 0.1 + 0.2;
    // let f2 = 0.3;
    // console.log(Math.abs(f1 - f2) < Number.EPSILON); // 'True - Yippeee!!!'

    // let f1 = 1000000.1 + 0.2;
    // let f2 = 1000000.3;
    // console.log(Math.abs(f1 - f2) < Number.EPSILON); // '!!!!!! false !!!!!!
    return Math.abs(a - b) < tolerance;
}
