import { createReducer } from '@reduxjs/toolkit';
import { addCart, removeCartItem, setQuantity, clearCart } from '../actions/cartActions';
import { MAX_PRODUCT_QUANTITY } from '../../const/cart';

const initialState = [];

/**
 * Редьюсер корзины: добавление, удаление, изменение количества и очистка.
 */
const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addCart, (state, action) => {
      const { id, quantity = 1, ...product } = action.payload;
      const existing = state.find((i) => i.id === id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, MAX_PRODUCT_QUANTITY);
        return;
      }
      state.push({ id, ...product, quantity: Math.min(quantity, MAX_PRODUCT_QUANTITY) });
    })
    .addCase(removeCartItem, (state, action) => {
      return state.filter((i) => i.id !== action.payload);
    })
    .addCase(setQuantity, (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return state.filter((i) => i.id !== id);
      }
      const item = state.find((i) => i.id === id);
      if (item) item.quantity = Math.min(quantity, MAX_PRODUCT_QUANTITY);
    })
    .addCase(clearCart, () => []);
});

export default cartReducer;
