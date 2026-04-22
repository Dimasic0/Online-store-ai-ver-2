import { Link } from 'react-router-dom';
import { useState } from 'react';
import { clearCart } from '../store/actions/cartActions';
import { useCart, useCartTotal, useCartCount, useAppDispatch } from '../store/hooks';
import CartItem from '../components/CartItem';
import { formatPrice } from '../const/format';
import './CartPage.css';

const PROMO_CODE = 'SALE10';
const PROMO_DISCOUNT = 10;
const PROMO_INPUT_PLACEHOLDER = 'Введите промокод';
const PROMO_EMPTY_ERROR = 'Введите промокод.';
const PROMO_NOT_FOUND_ERROR = 'Промокод не найден.';
const PROMO_SUCCESS_MESSAGE = `Промокод применён: скидка ${PROMO_DISCOUNT}%.`;

const getNormalizedPromoCode = (promoCode) => promoCode.trim().toUpperCase();

const getPromoErrorMessage = (normalizedPromoCode) => {
  if (!normalizedPromoCode) return PROMO_EMPTY_ERROR;
  if (normalizedPromoCode !== PROMO_CODE) return PROMO_NOT_FOUND_ERROR;
  return '';
};

/**
 * Страница корзины.
 * Показывает товары, итоговую стоимость и действия с корзиной.
 * @returns {JSX.Element}
 */
export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useCart();
  const cartTotal = useCartTotal();
  const cartCount = useCartCount();
  const [promoStatus, setPromoStatus] = useState('');

  const hasPromoDiscount = promoStatus === PROMO_SUCCESS_MESSAGE;
  const discountAmount = hasPromoDiscount ? cartTotal * (PROMO_DISCOUNT / 100) : 0;
  const totalAfterDiscount = cartTotal - discountAmount;

  const handleClearCart = () => {
    setPromoStatus('');
    dispatch(clearCart());
  };

  const handleApplyPromo = (evt) => {
    evt.preventDefault();
    const promoCode = evt.target.elements['promo-code-input'].value;
    const normalizedPromoCode = getNormalizedPromoCode(promoCode);
    const promoErrorMessage = getPromoErrorMessage(normalizedPromoCode);

    setPromoStatus(promoErrorMessage || PROMO_SUCCESS_MESSAGE);
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
            <form className="cart__promo-controls" onSubmit={handleApplyPromo}>
              <input
                id="promo-code-input"
                name="promo-code-input"
                className="cart__promo-input"
                type="text"
                placeholder={PROMO_INPUT_PLACEHOLDER}
              />
              <button type="submit" className="cart__btn cart__btn--secondary">
                Применить
              </button>
            </form>
            {promoStatus ? (
              <p
                className={`cart__promo-message cart__promo-message--${
                  hasPromoDiscount ? 'success' : 'error'
                }`}
              >
                {promoStatus}
              </p>
            ) : null}
          </div>
          <div className="cart__total cart__total--before">
            Сумма до скидки: <strong>{formatPrice(cartTotal)}</strong>
          </div>
          <div className="cart__total">
            Сумма после скидки:{' '}
            <strong>{formatPrice(totalAfterDiscount)}</strong>
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
