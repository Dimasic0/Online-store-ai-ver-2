import { useParams, Link } from 'react-router-dom';
import AddCartButton from '../components/AddCartButton';
import { useProductById } from '../store/hooks';
import { formatPrice } from '../const/format';
import './ProductPage.css';

/**
 * Страница детального просмотра товара.
 * Получает товар по id из URL и показывает его карточку.
 * @returns {JSX.Element}
 */
export default function ProductPage() {
  const { id } = useParams();
  const product = useProductById(id);

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
        <nav className="product-page__breadcrumb-nav" aria-label="Хлебные крошки">
          <ol className="product-page__breadcrumb-list">
            <li className="product-page__breadcrumb-item">
              <Link to="/" className="product-page__breadcrumb">
                ← Каталог
              </Link>
            </li>
          </ol>
        </nav>
        <article className="product-page__content">
          <section className="product-page__gallery" aria-label="Изображение товара">
            <img
              className="product-page__image"
              src={image.replace('w=400', 'w=600')}
              alt={title}
            />
          </section>
          <section className="product-page__info" aria-label="Описание товара">
            <h1 className="product-page__title">{title}</h1>
            <p className="product-page__description">{description}</p>
            <p className="product-page__price">{formatPrice(price)}</p>
            <AddCartButton product={product} className="product-page__btn" />
          </section>
        </article>
      </div>
    </main>
  );
}
