/**
 * Форматирует цену в рублях по русской локали.
 * @param {number} price - Цена без форматирования.
 * @returns {string}
 */
export const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`;

/**
 * Вычисляет цену с учетом процентной скидки.
 * @param {number} price - Базовая цена.
 * @param {number} [discount=0] - Скидка в процентах.
 * @returns {number}
 */
export const getDiscountedPrice = (price, discount = 0) =>
  Math.round(price * (1 - discount / 100));

