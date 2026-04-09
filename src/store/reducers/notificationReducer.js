import { createReducer } from '@reduxjs/toolkit';
import { hideNotification, showNotification } from '../actions/notificationActions';

const initialState = {
  message: '',
  visible: false,
};

const notificationReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showNotification, (state, action) => {
      state.message = action.payload;
      state.visible = true;
    })
    .addCase(hideNotification, (state) => {
      state.visible = false;
      state.message = '';
    });
});

export default notificationReducer;
