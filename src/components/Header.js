import { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCartCount } from '../store/hooks';
import './Header.css';

/**
 * Верхняя панель навигации приложения.
 * Отображает ссылки на каталог, корзину и счетчик товаров.
 */
function Header() {
  const cartCount = useCartCount();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Магазин
        </Link>
        <nav className="header__nav" aria-label="Основная навигация">
          <ul className="header__menu">
            <li className="header__menu-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `header__link ${isActive ? 'header__link--active' : ''}`.trim()
                }
              >
                Каталог
              </NavLink>
            </li>
            <li className="header__menu-item">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `header__link header__link--cart ${isActive ? 'header__link--active' : ''}`.trim()
                }
              >
                Корзина
                {cartCount > 0 && <span className="header__badge">{cartCount}</span>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);
