export interface TruncateOptions {
    length?: number;
    omission?: string;
    separator?: string;
}

/**
 * Truncates string if it’s longer than the given maximum string length. The last characters of the truncated
 * string are replaced with the omission string which defaults to "…".
 *
 * @param string The string to truncate.
 * @param options The options object or maximum string length.
 * @return Returns the truncated string.
 */
export function truncate(string: string, options?: TruncateOptions) {
    let separator;
    let length = 30;
    let omission = "...";

    if (options) {
        separator = options.separator ?? separator;
        length = options.length ?? length;
        omission = options.omission ?? omission;
    }

    let strLength = string.length;

    if (length >= strLength) {
        return string;
    }
    let end = length - omission.length;
    if (end < 1) {
        return omission;
    }
    let result = string.slice(0, end);

    if (separator === undefined) {
        return result + omission;
    }

    if (string.indexOf(separator, end) != end) {
        const index = result.lastIndexOf(separator);
        if (index > -1) {
            result = result.slice(0, index);
        }
    }
    return result + omission;
}

/** Example
console.log(truncate("hi-diddly-ho there, neighborino"));
// => 'hi-diddly-ho there, neighbo...'

console.log(
    truncate("hi-diddly-ho there, neighborino", {
        length: 24,
        separator: " ",
    })
);
// => 'hi-diddly-ho there,...'

console.log(
    truncate("hi-diddly-ho there, neighborino", {
        omission: " [...]",
    })
);
// => 'hi-diddly-ho there, neig [...]'
 */
