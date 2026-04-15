import { memo, useEffect } from 'react';
import { hideNotification } from '../store/actions/notificationActions';
import { useAppDispatch, useNotification } from '../store/hooks';
import { MAX_PRODUCT_QUANTITY } from '../const/cart';
import './Notification.css';

/**
 * Всплывающее уведомление о превышении допустимого количества товара.
 * Автоматически скрывается через короткий промежуток времени.
 */
function Notification() {
  const dispatch = useAppDispatch();
  const notification = useNotification();

  useEffect(() => {
    if (!notification) {
      return undefined;
    }
    const timeoutId = setTimeout(() => {
      dispatch(hideNotification());
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  if (!notification) {
    return null;
  }

  return (
    <div className="notification" role="status" aria-live="polite">
      Можно добавить не более {MAX_PRODUCT_QUANTITY} шт. одного товара
    </div>
  );
}

export default Notification;
