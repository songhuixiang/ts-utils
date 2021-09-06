/**
 * 防抖：在一定时间间隔内，多次调用一个方法，只会执行一次。
 * @param {Function} func 要进行debouce的函数
 * @param {Number} wait 等待时间，默认100ms
 * @param {Boolean} immediate 是否立即执行
 */
export function debounce<T extends Function>(func: T, wait: number = 100, immediate = false) {
    let timer: any, args: any, context: any, timestamp: number, result: any;

    function later() {
        let last = Date.now() - timestamp;
        if (last < wait && last >= 0) {
            timer = setTimeout(later, wait - last);
        } else {
            timer = null;
            if (!immediate) {
                result = func.apply(context, args);
                context = args = null;
            }
        }
    }

    let debounced = function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        let callNow = immediate && !timer;
        if (!timer) timer = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }
        return result;
    };

    (debounced as any).clear = function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    };

    (debounced as any).flush = function () {
        if (timer) {
            result = func.apply(context, args);
            context = args = null;
            clearTimeout(timer);
            timer = null;
        }
    };

    return debounced as unknown as T & { clear: () => void; flush: () => void };
}
