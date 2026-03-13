import { createReducer } from '@reduxjs/toolkit';
import { addCart, removeCartItem, setQuantity, clearCart } from '../actions/cartActions';
import { MAX_PER_PRODUCT } from '../../const/cart';

const initialState = [];

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addCart, (state, action) => {
      const { id, quantity = 1, ...product } = action.payload;
      const existing = state.find((i) => i.id === id);

      if (existing) {
        const nextQuantity = Math.min(
          existing.quantity + quantity,
          MAX_PER_PRODUCT,
        );
        existing.quantity = nextQuantity;
        return;
      }

      const initialQuantity = Math.min(quantity, MAX_PER_PRODUCT);
      state.push({ id, ...product, quantity: initialQuantity });
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
      if (item) {
        const nextQuantity = Math.min(quantity, MAX_PER_PRODUCT);
        item.quantity = nextQuantity;
      }
    })
    .addCase(clearCart, () => []);
});

export default cartReducer;
