import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from '../store/selectors/cartSelectors';
import { addToCart } from '../store/actions/cartActions';
import './ProductCard.css';

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { id, title, price, image, description } = product;
  const inCart = cart.find((item) => item.id === id);
  const quantity = inCart ? inCart.quantity : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

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
          <button
            type="button"
            className="product-card__btn"
            onClick={handleAddToCart}
            aria-label={quantity ? `В корзине ${quantity} шт.` : `Добавить ${title} в корзину`}
          >
            {quantity ? `В корзине: ${quantity}` : 'В корзину'}
          </button>
        </div>
      </div>
    </article>
  );
}

export default memo(ProductCard);
