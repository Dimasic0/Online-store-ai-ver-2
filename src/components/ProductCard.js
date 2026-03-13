import { memo } from 'react';
import { Link } from 'react-router-dom';
import AddCartButton from './AddCartButton';
import { formatPrice } from '../const/format';
import './ProductCard.css';

function ProductCard({ product }) {
  const { id, title, price, image, description, discount } = product;
  const hasDiscount = discount != null && discount > 0;
  const discountedPrice = hasDiscount
    ? Math.round(price * (1 - discount / 100))
    : price;

  return (
    <article className="product-card">
      <Link to={`/product/${id}`} className="product-card__image-wrap">
        <img className="product-card__image" src={image} alt={title} />
      </Link>
      <div className="product-card__body">
        <h3 className="product-card__title">
          <Link to={`/product/${id}`} className="product-card__title-link">
            {title}
          </Link>
        </h3>
        <p className="product-card__description">{description}</p>
        <div className="product-card__footer">
          <div className="product-card__prices">
            {hasDiscount && (
              <span className="product-card__price-old">{formatPrice(price)}</span>
            )}
            <span className="product-card__price">{formatPrice(discountedPrice)}</span>
          </div>
          <AddCartButton
            product={product}
            className="product-card__btn"
            
          />
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
