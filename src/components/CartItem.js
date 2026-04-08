import { memo } from 'react';
import { useAppDispatch, useCartQuantity } from '../store/hooks';
import { removeCartItem, setQuantity } from '../store/actions/cartActions';
import { formatPrice, getDiscountedPrice } from '../const/format';
import './CartItem.css';

function CartItem({ item }) {
  const dispatch = useAppDispatch();
  const { id, title, price, discount = 0, image } = item;
  const quantity = useCartQuantity(id) || 0;
  const discountedPrice = getDiscountedPrice(price, discount);

  return (
    <tr className="cart-item">
      <td className="cart-item__cell cart-item__cell--product">
        <div className="cart-item__product">
          <div className="cart-item__image-wrap">
            <img className="cart-item__image" src={image} alt={title} />
          </div>
          <span className="cart-item__title">{title}</span>
        </div>
      </td>
      <td className="cart-item__cell">
        <div className="cart-item__price-wrap">
          {discount > 0 && <span className="cart-item__old-price">{formatPrice(price)}</span>}
          <span>{formatPrice(discountedPrice)}</span>
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
          <span className="cart-item__qty-value">{quantity}</span>
          <button
            type="button"
            className="cart-item__qty-btn"
            onClick={() => dispatch(setQuantity(id, quantity + 1))}
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
