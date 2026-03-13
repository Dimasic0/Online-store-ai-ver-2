import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hideCartLimitMessage } from '../store/actions/notificationActions';
import { MAX_PER_PRODUCT } from '../const/cart';
import './CartLimitBanner.css';

export default function CartLimitBanner() {
  const dispatch = useDispatch();
  const { cartLimitShownAt } = useSelector(
    (state) => state.notification,
  );

  const cartLimitVisible = cartLimitShownAt !== null;

  useEffect(() => {
    if (!cartLimitVisible) return;
    const timer = setTimeout(() => {
      dispatch(hideCartLimitMessage());
    }, 2000);
    return () => clearTimeout(timer);
  }, [cartLimitVisible]);

  if (!cartLimitVisible) return null;

  return (
    <div className="cart-limit-banner" role="alert">
      Максимум {MAX_PER_PRODUCT} шт. одного товара
    </div>
  );
}
