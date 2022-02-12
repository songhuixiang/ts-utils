/**
 * 检查 val 是否在 start 与 end 之间，但不包括 end。 如果 end 没有指定，那么 start 设置为0。 如果 start 大于 end，那么参数会交换以便支持负范围。
 * @param val
 * @param start
 * @param end
 * @returns val >= start && val < end
 */
export function inRange(val: number, start: number, end?: number) {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    return val >= Math.min(start, end) && val < Math.max(start, end);
}
