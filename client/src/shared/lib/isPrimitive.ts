export type PrimitiveType = string | symbol | number | boolean;

export const isPrimitive = (value: unknown): value is PrimitiveType => {
    return (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'symbol'
    );
};
