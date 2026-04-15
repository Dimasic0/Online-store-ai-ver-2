import { createAction } from '@reduxjs/toolkit';

/**
 * Создает action добавления товара в корзину.
 * @param {Object} product - Данные товара.
 * @param {number} [quantity=1] - Количество для добавления.
 * @returns {{payload: Object}}
 */
export const addCart = createAction('cart/add', (product, quantity = 1) => ({
  payload: { ...product, quantity },
}));

/**
 * Создает action удаления товара из корзины по id.
 */
export const removeCartItem = createAction('cart/remove');
/**
 * Создает action изменения количества товара в корзине.
 * @param {string|number} id - Идентификатор товара.
 * @param {number} quantity - Новое количество.
 * @returns {{payload: {id: string|number, quantity: number}}}
 */
export const setQuantity = createAction('cart/setQuantity', (id, quantity) => ({
  payload: { id, quantity },
}));
/**
 * Создает action полной очистки корзины.
 */
export const clearCart = createAction('cart/clear');
