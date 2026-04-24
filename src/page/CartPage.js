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
        <header className="cart__header">
          <h1 className="cart__title">Корзина</h1>
          <span className="cart__count">{cartCount} товар(ов)</span>
        </header>
        <div className="cart__table-wrap">
          <table className="cart__table">
            <caption className="visually-hidden ">
              Список товаров в корзине с ценой, количеством, суммой и действиями
            </caption>
            <thead>
              <tr>
                <th className="cart__head-cell" scope="col">
                  Товар
                </th>
                <th className="cart__head-cell" scope="col">
                  Цена
                </th>
                <th className="cart__head-cell" scope="col">
                  Количество
                </th>
                <th className="cart__head-cell" scope="col">
                  Сумма
                </th>
                <th className="cart__head-cell cart__head-cell--actions" scope="col">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
        </div>
        <footer className="cart__footer">
          <section className="cart__promo" aria-label="Промокод">
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
                role="status"
                aria-live="polite"
              >
                {promoStatus}
              </p>
            ) : null}
          </section>
          <section aria-label="Итог по корзине">
            <dl className="cart__totals" aria-label="Итоговые суммы корзины">
              <div className="cart__total cart__total--before">
                <dt>Сумма до скидки:</dt>
                <dd>
                  <strong>{formatPrice(cartTotal)}</strong>
                </dd>
              </div>
              <div className="cart__total">
                <dt>Сумма после скидки:</dt>
                <dd>
                  <strong>{formatPrice(totalAfterDiscount)}</strong>
                </dd>
              </div>
            </dl>
          </section>
          <section className="cart__actions" aria-label="Действия с корзиной">
            <button type="button" className="cart__btn cart__btn--secondary" onClick={handleClearCart}>
              Очистить корзину
            </button>
            <button type="button" className="cart__btn cart__btn--primary">
              Оформить заказ
            </button>
          </section>
        </footer>
      </div>
    </main>
  );
}
