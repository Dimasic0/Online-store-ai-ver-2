import { createReducer } from '@reduxjs/toolkit';
import { PRODUCTS } from '../../const/products';
import { setProducts } from '../actions/productsActions';

const initialState = PRODUCTS;

/**
 * Редьюсер каталога товаров.
 * Обновляет список товаров действием setProducts.
 */
const productsReducer = createReducer(initialState, (builder) => {
  builder.addCase(setProducts, (state, action) => action.payload);
});

export default productsReducer;

