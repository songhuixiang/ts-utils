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
