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
 * @param number
 * @param no 默认为小数点后2位
 * @returns
 */
export function cutNumber(number: number, no = 2) {
    return Number(number.toFixed(no));
}

/**
 * 浮点数判等
 * @param a
 * @param b
 * @param tolerance 公差默认为 1e-6
 * @returns
 */
export function equals(a: number, b: number, tolerance = 1e-6) {
    // let f1 = 0.1 + 0.2;
    // let f2 = 0.3;
    // console.log(Math.abs(f1 - f2) < Number.EPSILON); // 'True - Yippeee!!!'

    // let f1 = 1000000.1 + 0.2;
    // let f2 = 1000000.3;
    // console.log(Math.abs(f1 - f2) < Number.EPSILON); // '!!!!!! false !!!!!!
    return Math.abs(a - b) < tolerance;
}

/**
 * 时间格式化
 * @param fmt 'yyyy-MM-dd hh:mm:ss'
 * @param date
 * @returns
 */
export function formatDate(fmt: string, date?: number | Date) {
    if (date === undefined) {
        date = new Date();
    } else if (typeof date !== "object") {
        date = !date ? new Date() : new Date(date);
    }
    const o = {
        "M+": date.getMonth() + 1, // 月份
        "d+": date.getDate(), // 日
        "h+": date.getHours(), // 小时
        "m+": date.getMinutes(), // 分
        "s+": date.getSeconds(), // 秒
        "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
        S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            const v = o[k as keyof typeof o] + "";
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? v : ("00" + v).substr(("" + v).length));
        }
    }
    return fmt;
}

/**
 * 去除字符串空格
 * @param str
 * @param type 1-所有空格 2-前后空格 3-前空格 4-后空格
 * @returns
 */
export function trim(str: string, type: number) {
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

/**
 * 常用正则验证
 * @param str
 * @param type
 * @returns
 */
export function checkStr(str: string, type: "phone" | "tel" | "card" | "pwd" | "QQ" | "email" | "money" | "URL" | "IP" | "date" | "number" | "english" | "chinese" | "lower" | "upper") {
    switch (type) {
        case "phone": // 手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case "tel": // 座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case "card": // 身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case "pwd": // 密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str);
        case "QQ": // QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case "email": // 邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case "money": // 金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case "URL": // 网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str);
        case "IP": // IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case "date": // 日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(str);
        case "number": // 数字
            return /^-?\d+$/.test(str);
        case "english": // 英文
            return /^[a-zA-Z]+$/.test(str);
        case "chinese": // 中文
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case "lower": // 小写
            return /^[a-z]+$/.test(str);
        case "upper": // 大写
            return /^[A-Z]+$/.test(str);
        default:
            return true;
    }
}

/**
 * If you need to clamp a number to keep it inside a specific range boundary
 * @param min
 * @param max
 * @param val
 * @returns
 */
export function clamp(min: number, max: number, val: number) {
    return Math.min(Math.max(min, +val), max);
}
