import { Primitive } from "../lang/isPrimitive";

export type DeepReadonly<T> = T extends ((...args: any[]) => any) | Primitive ? T : T extends _DeepReadonlyArray<infer U> ? _DeepReadonlyArray<U> : T extends _DeepReadonlyObject<infer V> ? _DeepReadonlyObject<V> : T;
interface _DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}
type _DeepReadonlyObject<T> = { readonly [P in keyof T]: DeepReadonly<T[P]> };
