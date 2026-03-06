import { createAction } from '@reduxjs/toolkit';

export const addCart = createAction('cart/add', (product, quantity = 1) => ({
  payload: { ...product, quantity },
}));

export const removeCartItem = createAction('cart/remove');
export const setQuantity = createAction('cart/setQuantity', (id, quantity) => ({
  payload: { id, quantity },
}));
export const clearCart = createAction('cart/clear');
