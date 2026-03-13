import { createReducer } from '@reduxjs/toolkit';
import { applyPromoCode, clearPromoCode } from '../actions/promoActions';
import { VALID_PROMO_CODE, PROMO_DISCOUNT_PERCENT } from '../../const/promo';

const initialState = {
  code: null,
  isValid: false,
  discount: 0,
};

const promoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(applyPromoCode, (state, action) => {
      const code = action.payload;
      const isValid = code === VALID_PROMO_CODE;
      state.code = code;
      state.isValid = isValid;
      state.discount = isValid ? PROMO_DISCOUNT_PERCENT : 0;
    })
    .addCase(clearPromoCode, () => initialState);
});

export default promoReducer;
