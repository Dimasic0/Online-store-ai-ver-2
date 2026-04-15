import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store';
import Header from './components/Header';
import Notification from './components/Notification';
import CatalogPage from './page/CatalogPage';
import ProductPage from './page/ProductPage';
import CartPage from './page/CartPage';
import './App.css';

/**
 * Корневой компонент приложения.
 * Подключает Redux Store, роутинг и основные страницы.
 */
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Notification />
        <Header />
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
