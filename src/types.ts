/**
 * Type representing primitive types in JavaScript, and thus TypeScript: string | number | bigint | boolean | symbol | null | undefined
 */
export type Primitive = string | number | bigint | boolean | symbol | null | undefined;
export const isPrimitive = (val: unknown): val is Primitive => {
    if (val === null || val === undefined) {
        return true;
    }
    switch (typeof val) {
        case "string":
        case "number":
        case "bigint":
        case "boolean":
        case "symbol":
            return true;
        default:
            return false;
    }
};

/**
 * Type representing falsy values in TypeScript: false | "" | 0 | null | undefined
 */
export type Falsy = false | "" | 0 | null | undefined;
export const isFalsy = (val: unknown): val is Falsy => !val;

/**
 * Type representing nullish values in TypeScript: null | undefined
 */
export type Nullish = null | undefined;
export const isNullish = (val: unknown): val is Nullish => val == null;

export type DeepReadonly<T> = T extends ((...args: any[]) => any) | Primitive ? T : T extends _DeepReadonlyArray<infer U> ? _DeepReadonlyArray<U> : T extends _DeepReadonlyObject<infer V> ? _DeepReadonlyObject<V> : T;
interface _DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
type _DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };

export type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object | undefined ? DeepRequired<T[P]> : T[P];
};

/**
 * get the type of elements inside of array, tuple or object of type T, that matches the given index type K
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * // Expect: string
 * type NameType = ElementType<Props, "name">;
 *
 * type Tuple = [boolean, number];
 * // Expect: boolean
 * type A = ElementType<Tuple, 0>;
 * // Expect: number
 * type B = ElementType<Tuple, 1>;
 *
 * type Arr = boolean[];
 * // Expect: boolean
 * type ItemsType = ElementType<Arr, number>;
 *
 * type Obj = { [key: string]: number };
 * // Expect: number
 * type ValuesType = ElementType<Obj, string>;
 */
export type ElementType<T extends { [P in K & any]: any }, K extends keyof T | number> = T[K];

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * // Expect: "name" | "age" | "visible"
 * type PropsKeys = Keys<Props>;
 */
export type Keys<T extends object> = keyof T;

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * // Expect: string | number | boolean
 * type PropsValues = Values<Props>;
 */
export type Values<T extends object> = T[keyof T];

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * type DefaultProps = { age: number };
 * // Expect: { name: string; visible: boolean; }
 * type RequiredProps = Diff<Props, DefaultProps>;
 */
export type Diff<T extends U, U extends object> = Pick<T, Exclude<keyof T, keyof U>>;

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * type DefaultProps = { age: number };
 * // Expect: { age: number; }
 * type DuplicateProps = Intersection<Props, DefaultProps>;
 */
export type Intersection<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean };
 * type DefaultProps = { age: number };
 * // Expect: { name: string; visible: boolean; }
 * type RestProps = Subtract<Props, DefaultProps>;
 */
export type Subtract<T extends U, U extends object> = Pick<T, Exclude<keyof T, keyof U>>;

/**
 * @example
 * type Props = { name: string; age: number; visible: boolean; };
 *
 * // Expect: { name?: string; age?: number; visible?: boolean; }
 * type Props = Optional<Props>
 * // Expect: { name: string; age?: number; visible?: boolean; }
 * type Props = Optional<Props, 'age' | 'visible'>;
 */
export type Optional<T extends object, K extends keyof T = keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
