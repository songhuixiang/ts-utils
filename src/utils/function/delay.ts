/**
 * 模拟延迟
 * @param timeSecond
 * @returns
 */
export function delay(timeSecond: number) {
    return new Promise<void>((resolve) => {
        const timeoutHandle = setTimeout(() => {
            clearTimeout(timeoutHandle);
            resolve();
        }, timeSecond * 1000);
    });
}
