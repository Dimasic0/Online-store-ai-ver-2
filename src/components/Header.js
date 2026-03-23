import { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useCart } from '../store/hooks';
import './Header.css';

const NAV_ITEMS = [
  { to: '/', label: 'Каталог' },
  { to: '/cart', label: 'Корзина', isCart: true },
];

function Header() {
  const cart = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          Магазин
        </Link>
        <nav className="header__nav">
          <ul className="header__list">
            {NAV_ITEMS.map(({ to, label, isCart }) => (
              <li key={to} className="header__item">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    clsx('header__link', {'header__link--cart': isCart, 'header__link--active': isActive})
                  }
                >
                  {label}
                  {isCart && cartCount > 0 && <span className="header__badge">{cartCount}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);
