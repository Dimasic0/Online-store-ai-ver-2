import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store';
import Header from './components/Header';
import CartLimitBanner from './components/CartLimitBanner';
import CatalogPage from './page/CatalogPage';
import ProductPage from './page/ProductPage';
import CartPage from './page/CartPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="app">
          <CartLimitBanner />
          <Header />
          <Routes>
            <Route path="/" element={<CatalogPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
