/**
 * Assigns own enumerable properties of source object(s) to the destination object for all destination
 * properties that resolve to undefined. Once a property is set, additional values of the same property are
 * ignored.
 *
 * Note: This method mutates object.
 *
 * @param object The destination object.
 * @param sources The source objects.
 * @return The destination object.
 * @example
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
export function defaults(object: any, ...sources: any[]) {
    object = Object(object);
    sources.forEach((source: { [x: string]: any } | null) => {
        if (source != null) {
            source = Object(source);
            for (const key in source) {
                const value = object[key];
                const other = (Object.prototype as any)[key];
                if (value === undefined || ((value === other || (value !== value && other !== other)) && !Object.prototype.hasOwnProperty.call(object, key))) {
                    object[key] = source[key];
                }
            }
        }
    });
    return object;
}
