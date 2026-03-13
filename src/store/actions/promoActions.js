import { createAction } from '@reduxjs/toolkit';

export const applyPromoCode = createAction('promo/apply');
export const clearPromoCode = createAction('promo/clear');
