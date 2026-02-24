import { useCart } from '../context/CartContext';
import './CartItem.css';

export default function CartItem({ item }) {
  const { removeFromCart, setQuantity } = useCart();
  const { id, title, price, image, quantity } = item;

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
      <td className="cart-item__cell">{price.toLocaleString('ru-RU')} ₽</td>
      <td className="cart-item__cell">
        <div className="cart-item__quantity">
          <button
            type="button"
            className="cart-item__qty-btn"
            onClick={() => setQuantity(id, quantity - 1)}
            aria-label="Уменьшить количество"
          >
            −
          </button>
          <span className="cart-item__qty-value">{quantity}</span>
          <button
            type="button"
            className="cart-item__qty-btn"
            onClick={() => setQuantity(id, quantity + 1)}
            aria-label="Увеличить количество"
          >
            +
          </button>
        </div>
      </td>
      <td className="cart-item__cell cart-item__cell--total">
        {(price * quantity).toLocaleString('ru-RU')} ₽
      </td>
      <td className="cart-item__cell">
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => removeFromCart(id)}
          aria-label="Удалить из корзины"
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}
