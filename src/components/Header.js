import { memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
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
          {NAV_ITEMS.map(({ to, label, isCart }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `header__link${isCart ? ' header__link--cart' : ''}${isActive ? ' header__link--active' : ''}`
              }
            >
              {label}
              {isCart && cartCount > 0 && <span className="header__badge">{cartCount}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default memo(Header);
