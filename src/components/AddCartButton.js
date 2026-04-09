import { memo } from 'react';
import { useAppDispatch, useCartQuantity } from '../store/hooks';
import { addCart } from '../store/actions/cartActions';
import { showNotification } from '../store/actions/notificationActions';
import { CART_LIMIT_MESSAGE, MAX_PRODUCT_QUANTITY } from '../const/cart';

function AddCartButton({ product, className }) {
  const dispatch = useAppDispatch();
  const quantity = useCartQuantity(product?.id) || 0;
  const isLimitReached = quantity >= MAX_PRODUCT_QUANTITY;

  const handleClick = () => {
    if (quantity >= MAX_PRODUCT_QUANTITY) {
      dispatch(showNotification(CART_LIMIT_MESSAGE));
      return;
    }
    dispatch(addCart(product));
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-label={
        quantity
          ? `В корзине ${quantity} шт.`
          : `Добавить ${product.title} в корзину`
      }
    >
      {isLimitReached ? `Лимит: ${MAX_PRODUCT_QUANTITY} шт.` : (quantity ? `В корзине: ${quantity}` : 'В корзину')}
    </button>
  );
}

export default memo(AddCartButton);