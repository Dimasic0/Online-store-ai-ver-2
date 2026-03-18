import { formatPrice } from '../const/format';

export default function CartTotal({ amount }) {
  return (
    <div className="cart__total">
      Итого: <strong>{formatPrice(amount)}</strong>
    </div>
  );
}

