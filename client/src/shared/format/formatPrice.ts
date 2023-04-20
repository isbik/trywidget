export const formatPrice = (price?: number | null) => {
    if (!price) return '';

    return price
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$& ')
        .slice(0, -3);
};
