import { memo } from 'react';
import { Link } from 'react-router-dom';
import AddCartButton from './AddCartButton';
import Prices from './Prices';
import './ProductCard.css';

function ProductCard({ product }) {
  const { id, title, image, description } = product;
  const productUrl = '/product/' + id;

  return (
    <article className="product-card">
      <Link to={productUrl} className="product-card__image-wrap">
        <img className="product-card__image" src={image} alt={title} />
      </Link>
      <div className="product-card__body">
        <h3 className="product-card__title">
          <Link to={productUrl} className="product-card__title-link">
            {title}
          </Link>
        </h3>
        <p className="product-card__description">{description}</p>
        <div className="product-card__footer">
          <Prices be="product-card__prices" product={product} />
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
