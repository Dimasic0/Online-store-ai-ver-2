export const formatPrice = (price) => `${price.toLocaleString('ru-RU')} ₽`;

export const getDiscountedPrice = (price, discount = 0) =>
  Math.round(price * (1 - discount / 100));

