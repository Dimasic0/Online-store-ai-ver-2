import { createReducer } from '@reduxjs/toolkit';
import { hideNotification, showNotification } from '../actions/notificationActions';

/**
 * Редьюсер флага показа уведомления о лимите товара.
 */
const notificationReducer = createReducer(false, (builder) => {
  builder
    .addCase(showNotification, () => true)
    .addCase(hideNotification, () => false);
});

export default notificationReducer;
