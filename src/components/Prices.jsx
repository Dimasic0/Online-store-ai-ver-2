import { formatPrice, getDiscountedPrice } from '../const/format';
import './prices.css';

export default function Prices({ be, product }) {
  const { price, discount } = product;
  const discountedPrice = getDiscountedPrice(price, discount);

  return (
    <div className={be + ' prices'}>
      {discount && (
        <del className='prices__price-old'>{formatPrice(price)}</del>
      )}
      <ins className='prices__price'> {formatPrice(discountedPrice)}</ins>
    </div>
  );
}