import { memo, useEffect } from 'react';
import { hideNotification } from '../store/actions/notificationActions';
import { useAppDispatch, useNotification } from '../store/hooks';

function AppNotification() {
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

  if (!notification.visible) {
    return null;
  }

  return (
    <div className="app-notification" role="status" aria-live="polite">
      {notification.message}
    </div>
  );
}

export default memo(AppNotification);
