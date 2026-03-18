import { useSelector, useDispatch } from 'react-redux';

export const useCart = () =>
  useSelector((state) => state.cart);

export const useNotification = () =>
  useSelector((state) => state.notification);

export const useCartCount = () =>
  useSelector((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0),
  );

export const usePromo = () =>
  useSelector((state) => state.promo);

export const useProducts = (id) =>
  useSelector((state) =>
    id == null ? state.products : state.products.find((product) => product.id === id),
  );

export const useAppDispatch = () => useDispatch();

