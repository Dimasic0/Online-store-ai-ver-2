import { useSelector, useDispatch } from 'react-redux';
import { getDiscountedPrice } from '../const/format';

export const useCart = () =>
  useSelector((state) => state.cart);

export const useCartItem = (id) =>
  useSelector((state) =>
    id == null ? null : state.cart.find((item) => item.id === id),
  );

export const useCartQuantity = (id) => {
  const item = useCartItem(id);
  return item ? item.quantity : null;
};

export const useCartCount = () =>
  useSelector((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );

export const useCartTotal = () =>
  useSelector((state) =>
    state.cart.reduce(
      (sum, item) => sum + getDiscountedPrice(item.price, item.discount) * item.quantity,
      0,
    ),
  );

export const useProducts = () =>
  useSelector((state) => state.products);

export const useProductById = (id) =>
  useSelector((state) =>
    state.products.find((product) => product.id === id),
  );

export const useAppDispatch = () => useDispatch();

