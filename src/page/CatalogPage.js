import { PRODUCTS } from '../const/products';
import ProductCard from '../components/ProductCard';
import './CatalogPage.css';

export default function CatalogPage() {
  return (
    <main className="catalog">
      <div className="catalog__inner">
        <h1 className="catalog__title">Каталог товаров</h1>
        <ul className="catalog__grid">
          {PRODUCTS.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
