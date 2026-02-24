import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart();
  const { id, title, price, image, description } = product;
  const inCart = cart.find((item) => item.id === id);
  const quantity = inCart ? inCart.quantity : 0;

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
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            aria-label={quantity ? `В корзине ${quantity} шт.` : `Добавить ${title} в корзину`}
          >
            {quantity ? `В корзине: ${quantity}` : 'В корзину'}
          </button>
        </div>
      </div>
    </article>
  );
}
