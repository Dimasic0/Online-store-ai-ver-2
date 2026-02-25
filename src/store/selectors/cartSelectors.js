export const selectCart = (state) => state.cart;

export const selectCartCount = (state) =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state) =>
  state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
