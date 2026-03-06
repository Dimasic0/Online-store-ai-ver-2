import { Link } from 'react-router-dom';
import { clearCart } from '../store/actions/cartActions';
import { useCart, useCartTotal, useCartCount, useAppDispatch } from '../store/hooks';
import CartItem from '../components/CartItem';
import { formatPrice } from '../const/format';
import './CartPage.css';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useCart();
  const cartTotal = useCartTotal();
  const cartCount = useCartCount();

  const handleClearCart = () => dispatch(clearCart());

  if (cart.length === 0) {
    return (
      <main className="cart cart--empty">
        <div className="cart__inner">
          <h1 className="cart__title">Корзина</h1>
          <p className="cart__empty-text">В корзине пока ничего нет.</p>
          <Link to="/" className="cart__link">
            Перейти в каталог
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart">
      <div className="cart__inner">
        <div className="cart__header">
          <h1 className="cart__title">Корзина</h1>
          <span className="cart__count">{cartCount} товар(ов)</span>
        </div>
        <div className="cart__table-wrap">
          <table className="cart__table">
            <thead>
              <tr>
                <th>Товар</th>
                <th>Цена</th>
                <th>Количество</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="cart__footer">
          <div className="cart__total">
            Итого: <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <div className="cart__actions">
            <button type="button" className="cart__btn cart__btn--secondary" onClick={handleClearCart}>
              Очистить корзину
            </button>
            <button type="button" className="cart__btn cart__btn--primary">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
