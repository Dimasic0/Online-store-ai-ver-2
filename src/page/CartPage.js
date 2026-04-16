import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { clearCart } from '../store/actions/cartActions';
import { useCart, useCartTotal, useCartCount, useAppDispatch } from '../store/hooks';
import CartItem from '../components/CartItem';
import { formatPrice } from '../const/format';
import './CartPage.css';

/**
 * Страница корзины.
 * Показывает товары, итоговую стоимость и действия с корзиной.
 * @returns {JSX.Element}
 */
export default function CartPage() {
  const PROMO_CODE = 'SALE10';
  const PROMO_DISCOUNT = 10;
  const dispatch = useAppDispatch();
  const cart = useCart();
  const cartTotal = useCartTotal();
  const cartCount = useCartCount();
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const discountAmount = useMemo(() => {
    if (!promoApplied) return 0;
    return cartTotal * (PROMO_DISCOUNT / 100);
  }, [cartTotal, promoApplied]);

  const totalAfterDiscount = useMemo(() => cartTotal - discountAmount, [cartTotal, discountAmount]);

  /**
   * Полностью очищает корзину.
   */
  const handleClearCart = () => {
    setPromoInput('');
    setPromoApplied(false);
    setPromoError('');
    dispatch(clearCart());
  };

  const handleApplyPromo = () => {
    const normalizedPromo = promoInput.trim().toUpperCase();
    if (!normalizedPromo) {
      setPromoApplied(false);
      setPromoError('Введите промокод.');
      return;
    }
    if (normalizedPromo !== PROMO_CODE) {
      setPromoApplied(false);
      setPromoError('Промокод не найден.');
      return;
    }
    setPromoApplied(true);
    setPromoError('');
  };

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
                <th scope="col">Действия</th>
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
          <div className="cart__promo">
            <label className="cart__promo-label" htmlFor="promo-code-input">
              Промокод
            </label>
            <div className="cart__promo-controls">
              <input
                id="promo-code-input"
                className="cart__promo-input"
                type="text"
                value={promoInput}
                onChange={(event) => setPromoInput(event.target.value)}
                placeholder="Введите промокод"
              />
              <button type="button" className="cart__btn cart__btn--secondary" onClick={handleApplyPromo}>
                Применить
              </button>
            </div>
            {promoError ? <p className="cart__promo-message cart__promo-message--error">{promoError}</p> : null}
            {promoApplied ? (
              <p className="cart__promo-message cart__promo-message--success">
                Промокод применён: скидка {PROMO_DISCOUNT}%.
              </p>
            ) : null}
          </div>
          <div className="cart__total cart__total--before">
            Сумма до скидки: <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <div className="cart__total">
            Сумма после скидки:{' '}
            <strong>{formatPrice(promoApplied ? totalAfterDiscount : cartTotal)}</strong>
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
