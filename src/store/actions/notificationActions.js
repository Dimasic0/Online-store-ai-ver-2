import { createAction } from '@reduxjs/toolkit';

export const showCartLimitMessage = createAction('notification/showCartLimit');
export const hideCartLimitMessage = createAction('notification/hideCartLimit');
