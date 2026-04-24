import { memo } from 'react';
import { useAppDispatch } from '../store/hooks';
import { removeCartItem, setQuantity } from '../store/actions/cartActions';
import { showNotification } from '../store/actions/notificationActions';
import { formatPrice, getDiscountedPrice } from '../const/format';
import { MAX_PRODUCT_QUANTITY } from '../const/cart';
import './CartItem.css';

/**
 * Строка товара в таблице корзины.
 * @param {Object} props
 * @param {Object} props.item - Товар из корзины.
 * @returns {JSX.Element}
 */
function CartItem({ item }) {
  const dispatch = useAppDispatch();
  const { id, title, price, discount = 0, image, quantity } = item;
  const discountedPrice = getDiscountedPrice(price, discount);
  const isLimitReached = quantity >= MAX_PRODUCT_QUANTITY;

  /**
   * Увеличивает количество товара в корзине с проверкой лимита.
   */
  const handleIncrease = () => {
    if (isLimitReached) {
      dispatch(showNotification());
      return;
    }
    dispatch(setQuantity(id, quantity + 1));
  };

  return (
    <tr className="cart-item">
      <th scope="row" className="cart-item__cell cart-item__cell--product">
        <div className="cart-item__product">
          <div className="cart-item__image-wrap">
            <img className="cart-item__image" src={image} alt={title} />
          </div>
          <span className="cart-item__title">{title}</span>
        </div>
      </th>
      <td className="cart-item__cell">
        <div className="cart-item__price-wrap">
          {discount > 0 && <del className="cart-item__old-price">{formatPrice(price)}</del>}
          <data className="cart-item__current-price" value={discountedPrice}>
            {formatPrice(discountedPrice)}
          </data>
        </div>
      </td>
      <td className="cart-item__cell">
        <div className="cart-item__quantity">
          <button
            type="button"
            className="cart-item__qty-btn"
            onClick={() => dispatch(setQuantity(id, quantity - 1))}
            aria-label="Уменьшить количество"
          >
            −
          </button>
          <output className="cart-item__qty-value" aria-live="polite">
            {quantity}
          </output>
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
        <strong className="cart-item__total-price">{formatPrice(discountedPrice * quantity)}</strong>
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
