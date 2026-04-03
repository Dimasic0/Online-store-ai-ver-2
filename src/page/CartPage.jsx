import { Link } from 'react-router-dom';
import { clearCart } from '../store/actions/cartActions';
import { applyPromoCode } from '../store/actions/promoActions';
import { useCart, usePromo, useAppDispatch } from '../store/hooks';
import CartItem from '../components/CartItem';
import CartTotal from '../components/CartTotal';
import { formatPrice, getDiscountedPrice } from '../const/format';
import './CartPage.css';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useCart();

  const cartTotal = cart.reduce(
    (sum, item) =>
      sum + getDiscountedPrice(item.price, item.discount) * item.quantity,
    0,
  );
  const { isValid, discount, code } = usePromo();
  const cartTotalPromo = getDiscountedPrice(cartTotal, discount);

  const handleClearCart = () => dispatch(clearCart());

  const handlePromoSubmit = (evt) => {
      evt.preventDefault();

      const formData = new FormData(evt.currentTarget);
      const promoValue = formData.get('promo').trim();

      dispatch(applyPromoCode(promoValue));
    };

  if (cart.length === 0) {
    return (
      <main className="cart cart--empty page">
        <header className="cart__inner page__inner">
          <h1 className="cart__title">Корзина</h1>
          <p className="cart__empty-text">В корзине пока ничего нет.</p>
          <Link to="/" className="cart__link">
            Перейти в каталог
          </Link>
        </header>
      </main>
    );
  }

  return (
    <main className="cart page">
      <section className="cart__inner page__inner">
        <header className="cart__header">
          <h1 className="cart__title">Корзина</h1>
          <span className="cart__count">{cart.length} товар(ов)</span>
        </header>
        <section className="cart__table-wrap">
          <table className="cart__table">
            <thead className="cart__thead">
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
        </section>

        <section className="cart__promo">
          <form className="cart__promo-form" onSubmit={handlePromoSubmit}>
            <input
              type="text"
              className="cart__promo-input"
              placeholder="Введите промокод"
              name="promo"
              disabled={isValid}
            />
            {!isValid  &&  (
              <button type="submit" className="cart__promo-btn">
                Применить
              </button>
            )}
          </form>
          {code && (
            <p className={`cart__promo-message ${isValid ? 'cart__promo-message--success' : 'cart__promo-message--error'}`}>
              {isValid
                ? `Промокод "${code}" применён! Скидка ${discount}%`
                : `Промокод "${code}" недействителен`}
            </p>
          )}
        </section>

        <section className="cart__footer">
          {isValid ? (
            <div className="cart__total-wrap">
              <div className="cart__total-old">
                Сумма без скидки: <span>{formatPrice(cartTotal)}</span>
              </div>
              <CartTotal amount={cartTotalPromo} />
            </div>
          ) : (
            <CartTotal amount={cartTotal} />
          )}
          <div className="cart__actions">
            <button type="button" className="cart__btn cart__btn--secondary" onClick={handleClearCart}>
              Очистить корзину
            </button>
            <button type="button" className="cart__btn cart__btn--primary">
              Оформить заказ
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
