import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Прокручивает страницу наверх при переходе на новый маршрут SPA (кроме навигации по якорям) */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
