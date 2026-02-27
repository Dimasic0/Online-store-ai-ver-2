import { useSelector } from 'react-redux';
import { selectProducts } from '../store/selectors/productsSelectors';
import ProductCard from '../components/ProductCard';
import './CatalogPage.css';

export default function CatalogPage() {
  const products = useSelector(selectProducts);

  return (
    <main className="catalog">
      <div className="catalog__inner">
        <h1 className="catalog__title">Каталог товаров</h1>
        <ul className="catalog__grid">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
