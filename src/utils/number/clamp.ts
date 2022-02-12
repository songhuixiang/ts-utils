/**
 * If you need to clamp a number to keep it inside a specific range boundary
 * @param val
 * @param min
 * @param max
 * @returns
 */
export function clamp(val: number, min: number, max: number) {
    return Math.min(Math.max(min, +val), max);
}
