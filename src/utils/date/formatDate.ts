/**
 * 时间格式化
 * @param fmt 'yyyy-MM-dd hh:mm:ss'
 * @param date millisecond or date object
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
