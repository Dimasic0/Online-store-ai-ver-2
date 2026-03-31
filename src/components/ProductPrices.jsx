import { formatPrice } from '../const/format';
import { getDiscountedPrice } from '../const/format';

export default function ProductPrices({ be, product }) {
  const { price, discount } = product;
  const discountedPrice = getDiscountedPrice(price, discount);
  const beArr = be.split('__');
  const block = beArr[0];

  return (
    <div className={ beArr.length > 1 ? `${be}-prices` : `${block}__prices`}>
      {discount && (
        <del className={`${block}__price-old`}>{formatPrice(price)}</del>
      )}
      <ins className={`${block}__price`}> {formatPrice(discountedPrice)}</ins>
    </div>
  );
}