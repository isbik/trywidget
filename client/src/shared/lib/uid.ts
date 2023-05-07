export const uid = () => {
    return Date.now().toString(36).slice(6) + Math.random().toString(36).slice(6);
};
