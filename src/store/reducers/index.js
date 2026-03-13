import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import productsReducer from './productsReducer';
import notificationReducer from './notificationReducer';
import promoReducer from './promoReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  notification: notificationReducer,
  promo: promoReducer,
});

export default rootReducer;
