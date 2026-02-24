import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../const/products';
import './ProductPage.css';

export default function ProductPage() {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const product = PRODUCTS.find((p) => p.id === id);
  const inCart = product ? cart.find((item) => item.id === product.id) : null;
  const quantity = inCart ? inCart.quantity : 0;

  if (!product) {
    return (
      <main className="product-page product-page--not-found">
        <div className="product-page__inner">
          <h1>Товар не найден</h1>
          <Link to="/" className="product-page__back">
            Вернуться в каталог
          </Link>
        </div>
      </main>
    );
  }

  const { title, price, image, description } = product;

  return (
    <main className="product-page">
      <div className="product-page__inner">
        <Link to="/" className="product-page__breadcrumb">
          ← Каталог
        </Link>
        <div className="product-page__content">
          <div className="product-page__gallery">
            <img
              className="product-page__image"
              src={image.replace('w=400', 'w=600')}
              alt={title}
            />
          </div>
          <div className="product-page__info">
            <h1 className="product-page__title">{title}</h1>
            <p className="product-page__description">{description}</p>
            <p className="product-page__price">{price.toLocaleString('ru-RU')} ₽</p>
            <button
              type="button"
              className="product-page__btn"
              onClick={() => addToCart(product)}
            >
              {quantity ? `В корзине: ${quantity}` : 'В корзину'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
