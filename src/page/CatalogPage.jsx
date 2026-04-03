import { useProducts } from '../store/hooks';
import ProductCard from '../components/ProductCard';
import './CatalogPage.css';

export default function CatalogPage() {
  const products = useProducts();

  return (
    <main className="catalog page">
      <section className="catalog__inner page__inner">
        <h1 className="catalog__title">Каталог товаров</h1>
        <ul className="catalog__grid">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
