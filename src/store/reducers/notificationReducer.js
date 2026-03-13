import { createReducer } from '@reduxjs/toolkit';
import { showCartLimitMessage, hideCartLimitMessage } from '../actions/notificationActions';

const initialState = {
  cartLimitShownAt: null,
};

const notificationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showCartLimitMessage, (state) => {
      state.cartLimitShownAt = (state.cartLimitShownAt ?? 0) + 1;
    })
    .addCase(hideCartLimitMessage, (state) => {
      state.cartLimitShownAt = null;
    });
});

export default notificationReducer;
