import { memo } from 'react';
import { useAppDispatch } from '../store/hooks';
import { removeCartItem, setQuantity } from '../store/actions/cartActions';
import { showCartLimitMessage } from '../store/actions/notificationActions';
import { formatPrice, getDiscountedPrice } from '../const/format';
import { MAX_PER_PRODUCT } from '../const/cart';
import './CartItem.css';
import ProductPrices from './ProductPrices';

function CartItem({ item }) {
  const dispatch = useAppDispatch();
  const { id, title, price, image, discount, quantity } = item;
  const discountedPrice = getDiscountedPrice(price, discount);

  const handleDecrease = () => {
    dispatch(setQuantity(id, quantity - 1));
  };

  const handleIncrease = () => {
    if (quantity >= MAX_PER_PRODUCT) {
      dispatch(showCartLimitMessage());
      return;
    }
    dispatch(setQuantity(id, quantity + 1));
  };

  return (
    <tr className="cart-item">
      <th className="cart-item__cell cart-item__cell--product">
          <div className="cart-item__image-wrap">
            <img className="cart-item__image" src={image} alt={title} />
          </div>
          <span className="cart-item__title">{title}</span>
      </th>
      <td className="cart-item__cell">
        <ProductPrices be="cart-item__" product={item} />
      </td>
      <td className="cart-item__cell">
        <div className="cart-item__quantity">
          <button
            type="button"
            className="cart-item__qty-btn"
            onClick={handleDecrease}
            aria-label="Уменьшить количество"
          >
            −
          </button>
          <span className="cart-item__qty-value">{quantity}</span>
          <button
            type="button"
            className="cart-item__qty-btn"
            onClick={handleIncrease}
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>
      </td>
      <td className="cart-item__cell cart-item__cell--total">
        {formatPrice(discountedPrice * quantity)}
      </td>
      <td className="cart-item__cell">
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => dispatch(removeCartItem(id))}
          aria-label="Удалить из корзины"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

export default memo(CartItem);
