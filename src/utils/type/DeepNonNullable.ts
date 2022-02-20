export type DeepNonNullable<T> = T extends (...args: any[]) => any ? T : T extends any[] ? _DeepNonNullableArray<T[number]> : T extends object ? _DeepNonNullableObject<T> : T;
interface _DeepNonNullableArray<T> extends Array<DeepNonNullable<NonNullable<T>>> {}
type _DeepNonNullableObject<T> = { [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>> };
