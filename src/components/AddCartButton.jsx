import { useAppDispatch, useCart } from '../store/hooks';
import { addCart } from '../store/actions/cartActions';
import { showCartLimitMessage } from '../store/actions/notificationActions';
import { MAX_PER_PRODUCT } from '../const/cart';

export default function AddCartButton({ product, className }) {
  const dispatch = useAppDispatch();
  const cart = useCart();
  const quantity = cart.find((item) => item.id === product.id)?.quantity || 0;

  const handleClick = () => {
    if (quantity >= MAX_PER_PRODUCT) {
      dispatch(showCartLimitMessage());
      return;
    }
    dispatch(addCart(product));
  };

  const buttonLabel = quantity
    ? `В корзине ${quantity} шт.`
    : `Добавить ${product.title} в корзину`;

  const buttonText = quantity
    ? `В корзине: ${quantity}`
    : 'В корзину';

  return (
    <button
      type="button"
      className={className}
      onClick={handleClick}
      aria-label={buttonLabel}
    >
      {buttonText}
    </button>
  );
}