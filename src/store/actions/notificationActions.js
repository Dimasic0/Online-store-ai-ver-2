import { createAction } from '@reduxjs/toolkit';

export const showNotification = createAction('notification/show');
export const hideNotification = createAction('notification/hide');
