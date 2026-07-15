import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

/** Отправляет просмотр страницы в Яндекс Метрику при каждой смене маршрута SPA */
const RouteTracker = () => {
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    trackPageView(location.pathname + location.search + location.hash);
  }, [location.pathname, location.search, location.hash]);

  return null;
};

export default RouteTracker;
