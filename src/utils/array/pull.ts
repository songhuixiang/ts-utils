/**
 * 移除数组array中所有和给定值相等的元素，这个方法会改变原数组。
 * @param array 要修改的数组
 * @param values 要删除的值
 * @returns 返回 array.
 */
export function pull<T>(array: Array<T>, ...values: Array<T>) {
    if (array != null && array.length && values != null && values.length) {
        const length = values.length;
        let index = -1;
        if (array === values) {
            values = [...values];
        }
        while (++index < length) {
            let fromIndex = 0;
            const value = values[index];
            while ((fromIndex = array.indexOf(value, fromIndex)) > -1) {
                array.splice(fromIndex, 1);
            }
        }
        return array;
    }
    return array;
}
