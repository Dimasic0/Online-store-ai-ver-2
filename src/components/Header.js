import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../store/selectors/cartSelectors';
import './Header.css';

export default function Header() {
  const cartCount = useSelector(selectCartCount);
  const location = useLocation();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Магазин
        </Link>
        <nav className="header__nav">
          <Link
            to="/"
            className={`header__link ${location.pathname === '/' ? 'header__link--active' : ''}`}
          >
            Каталог
          </Link>
          <Link
            to="/cart"
            className={`header__link header__link--cart ${location.pathname === '/cart' ? 'header__link--active' : ''}`}
          >
            Корзина
            {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
