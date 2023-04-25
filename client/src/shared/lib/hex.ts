export const hex = (size = 16) =>
    [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
