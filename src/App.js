import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './store';
import { hideNotification } from './store/actions/notificationActions';
import { useAppDispatch, useNotification } from './store/hooks';
import Header from './components/Header';
import CatalogPage from './page/CatalogPage';
import ProductPage from './page/ProductPage';
import CartPage from './page/CartPage';
import './App.css';

function AppContent() {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  useEffect(() => {
    if (!notification.visible) {
      return undefined;
    }
    const timeoutId = setTimeout(() => {
      dispatch(hideNotification());
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [notification.visible]);

  return (
    <BrowserRouter>
      <div className="app">
        {notification.visible && (
          <div className="app-notification" role="status" aria-live="polite">
            {notification.message}
          </div>
        )}
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
