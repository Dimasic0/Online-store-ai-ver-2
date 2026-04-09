import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import notificationReducer from './notificationReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  notification: notificationReducer,
  products: productsReducer,
});

export default rootReducer;
