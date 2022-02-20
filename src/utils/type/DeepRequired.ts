export type DeepRequired<T> = T extends (...args: any[]) => any ? T : T extends any[] ? _DeepRequiredArray<T[number]> : T extends object ? _DeepRequiredObject<T> : T;
type NonUndefined<T> = T extends undefined ? never : T;
interface _DeepRequiredArray<T> extends Array<DeepRequired<NonUndefined<T>>> {}
type _DeepRequiredObject<T> = { [P in keyof T]-?: DeepRequired<NonUndefined<T[P]>> };
