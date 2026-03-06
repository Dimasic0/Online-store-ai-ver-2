import { memo } from 'react';
import { useAppDispatch, useCartQuantity } from '../store/hooks';
import { addCart } from '../store/actions/cartActions';

export default function AddCartButton({ product, className}) {
  const dispatch = useAppDispatch();
  const quantity = useCartQuantity(product?.id) || 0;

  const handleClick = () => {
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
      {quantity ? `В корзине: ${quantity}` : 'В корзину'}
    </button>
  );
}