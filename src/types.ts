import { Primitive } from "./utils/lang/isPrimitive";

export type DeepReadonly<T> = T extends ((...args: any[]) => any) | Primitive ? T : T extends _DeepReadonlyArray<infer U> ? _DeepReadonlyArray<U> : T extends _DeepReadonlyObject<infer V> ? _DeepReadonlyObject<V> : T;
interface _DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
type _DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };

export type DeepNonNullable<T> = T extends (...args: any[]) => any ? T : T extends any[] ? _DeepNonNullableArray<T[number]> : T extends object ? _DeepNonNullableObject<T> : T;
export interface _DeepNonNullableArray<T> extends Array<DeepNonNullable<NonNullable<T>>> {}
export type _DeepNonNullableObject<T> = { [P in keyof T]-?: DeepNonNullable<NonNullable<T[P]>> };

export type DeepRequired<T> = T extends (...args: any[]) => any ? T : T extends any[] ? _DeepRequiredArray<T[number]> : T extends object ? _DeepRequiredObject<T> : T;
export type NonUndefined<T> = T extends undefined ? never : T;
export interface _DeepRequiredArray<T> extends Array<DeepRequired<NonUndefined<T>>> {}
export type _DeepRequiredObject<T> = { [P in keyof T]-?: DeepRequired<NonUndefined<T[P]>> };

export type DeepPartial<T> = T extends Function ? T : T extends Array<infer U> ? _DeepPartialArray<U> : T extends object ? _DeepPartialObject<T> : T | undefined;
export interface _DeepPartialArray<T> extends Array<DeepPartial<T>> {}
export type _DeepPartialObject<T> = { [P in keyof T]?: DeepPartial<T[P]> };

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * type NameType = ElementType<Props, "name">; // Expect: string
 *
 * type Tuple = [boolean, number];
 * type A = ElementType<Tuple, 0>; // Expect: boolean
 * type B = ElementType<Tuple, 1>; // Expect: number
 *
 * type Arr = boolean[];
 * type ItemsType = ElementType<Arr, number>; // Expect: boolean
 *
 * type Obj = { [key: string]: number };
 * type ValuesType = ElementType<Obj, string>; // Expect: number
 */
export type ElementType<T extends { [P in K & any]: any }, K extends keyof T | number> = T[K];

/**
 * @example
 * type USD = Brand<number, "USD">
 * type EUR = Brand<number, "EUR">
 *
 * const tax = 5 as USD;
 * const usd = 10 as USD;
 * const eur = 10 as EUR;
 *
 * function gross(net: USD): USD {
 *   return (net + tax) as USD;
 * }
 *
 * gross(usd); // Expect: No compile error
 * gross(eur); // Expect: Compile error (Type '"EUR"' is not assignable to type '"USD"'.)
 */
export type Brand<T, U> = T & { __brand: U };

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * type PropsKeys = Keys<Props>; // Expect: "name" | "age" | "visible"
 */
export type Keys<T extends object> = keyof T;

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * type PropsValues = Values<Props>; // Expect: string | number | boolean
 */
export type Values<T extends object> = T[keyof T];

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * type DefaultProps = { age: number };
 * type RequiredProps = Diff<Props, DefaultProps>; // Expect: { name: string; visible: boolean; }
 */
export type Diff<T extends U, U extends object> = Pick<T, Exclude<keyof T, keyof U>>;

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * type DefaultProps = { age: number };
 * type DuplicateProps = Intersection<Props, DefaultProps>; // Expect: { age: number; }
 */
export type Intersection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * type DefaultProps = { age: number };
 * type RestProps = Subtract<Props, DefaultProps>; // Expect: { name: string; visible: boolean; }
 */
export type Subtract<T extends U, U extends object> = Pick<T, Exclude<keyof T, keyof U>>;

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean; };
 * type Props = Optional<Props> // Expect: { name?: string; age?: number; visible?: boolean; }
 * type Props = Optional<Props, 'age' | 'visible'>; // Expect: { name: string; age?: number; visible?: boolean; }
 */
export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
