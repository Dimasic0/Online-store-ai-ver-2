import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store';
import Header from './components/Header';
import AppNotification from './components/AppNotification';
import CatalogPage from './page/CatalogPage';
import ProductPage from './page/ProductPage';
import CartPage from './page/CartPage';
import './App.css';

function AppContent() {
  return (
    <BrowserRouter>
      <div className="app">
        <AppNotification />
        <Header />
        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
