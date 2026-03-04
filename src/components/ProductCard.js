import { memo } from 'react';
import { Link } from 'react-router-dom';
import AddCartButton from './AddCartButton';
import './ProductCard.css';

function ProductCard({ product }) {
  const { id, title, price, image, description } = product;

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
          <span className="product-card__price">{price.toLocaleString('ru-RU')} ₽</span>
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
