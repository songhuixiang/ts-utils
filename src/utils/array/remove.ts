/**
 * 移除数组中predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组，这个方法会改变原数组。
 * @param array 要修改的数组。
 * @param predicate 每次迭代调用的函数。
 * @returns 返回移除元素组成的新数组。
 */
export function remove<T>(array: Array<T>, predicate: (value: T, index: number, array: Array<T>) => boolean) {
    const result: Array<T> = [];
    if (!(array != null && array.length)) {
        return result;
    }
    let index = -1;
    const indexes = [];
    const { length } = array;
    while (++index < length) {
        const value = array[index];
        if (predicate(value, index, array)) {
            result.push(value);
            indexes.push(index);
        }
    }

    let indexesLength = indexes.length;
    const lastIndex = indexesLength - 1;
    while (indexesLength--) {
        let previous;
        const index = indexes[indexesLength];
        if (indexesLength === lastIndex || index !== previous) {
            previous = index;
            array.splice(index, 1);
        }
    }
    return result;
}
