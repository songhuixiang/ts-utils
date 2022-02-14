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
