export type Primitive = string | number | bigint | boolean | symbol | null | undefined;
export const isPrimitive = (val: unknown): val is Primitive => {
    if (val === null || val === undefined) return true;
    return ["string", "number", "bigint", "boolean", "symbol"].includes(typeof val);
};
