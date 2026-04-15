import { createAction } from '@reduxjs/toolkit';

/**
 * Создает action показа уведомления.
 */
export const showNotification = createAction('notification/show');
/**
 * Создает action скрытия уведомления.
 */
export const hideNotification = createAction('notification/hide');
