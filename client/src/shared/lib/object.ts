export const objectValues = <T extends object>(obj: T) => {
    return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
};

export const objectKeys = <T extends object>(obj: T) => {
    return Object.keys(obj).map((objKey) => objKey as keyof T);
};
