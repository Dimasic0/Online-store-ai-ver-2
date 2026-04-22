import { useSelector, useDispatch } from 'react-redux';
import { getDiscountedPrice } from '../const/format';

/**
 * Возвращает массив товаров в корзине.
 * @returns {Array}
 */
export const useCart = () =>
  useSelector((state) => state.cart);

const useCartReducer = (callback, defaultValue = 0) =>
  useSelector((state) => state.cart.reduce(callback, defaultValue));

/**
 * Возвращает товар из корзины по идентификатору.
 * @param {string|number} id - Идентификатор товара.
 * @returns {Object|null}
 */
export const useCartItem = (id) =>
  useSelector((state) =>
    id == null ? null : state.cart.find((item) => item.id === id),
  );

/**
 * Возвращает количество конкретного товара в корзине.
 * @param {string|number} id - Идентификатор товара.
 * @returns {number|null}
 */
export const useCartQuantity = (id) => {
  const item = useCartItem(id);
  return item ? item.quantity : null;
};

/**
 * Возвращает общее количество товаров в корзине.
 * @returns {number}
 */
export const useCartCount = () =>
  useCartReducer((sum, item) => sum + item.quantity, 0);

/**
 * Возвращает итоговую стоимость корзины с учетом скидок.
 * @returns {number}
 */
export const useCartTotal = () =>
  useCartReducer(
      (sum, item) => sum + getDiscountedPrice(item.price, item.discount) * item.quantity,
      0)

/**
 * Возвращает список всех товаров каталога.
 * @returns {Array}
 */
export const useProducts = () =>
  useSelector((state) => state.products);

/**
 * Возвращает товар из каталога по идентификатору.
 * @param {string|number} id - Идентификатор товара.
 * @returns {Object|undefined}
 */
export const useProductById = (id) =>
  useSelector((state) =>
    state.products.find((product) => product.id === id),
  );

/**
 * Возвращает типизированный dispatch для отправки actions.
 * @returns {Function}
 */
export const useAppDispatch = () => useDispatch();

/**
 * Возвращает состояние уведомления о лимите.
 * @returns {boolean}
 */
export const useNotification = () =>
  useSelector((state) => state.notification);

