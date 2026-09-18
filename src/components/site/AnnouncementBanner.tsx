import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { trackGoal, goals } from '@/lib/analytics';

const STORAGE_KEY = 'announcement_utilsbor_2027_closed';

const AnnouncementBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) !== '1') {
      setVisible(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="relative bg-primary text-primary-foreground">
      <div className="container flex items-center gap-3 py-2.5 pr-10 sm:pr-4">
        <Icon name="AlertTriangle" size={18} className="shrink-0 hidden sm:block" />
        <p className="text-xs sm:text-sm leading-snug">
          <span className="font-semibold">С 1 января 2027 года повышается утильсбор</span>
          {' '}и меняются условия ввоза авто — успейте оформить машину по текущим ставкам.{' '}
          <Link
            to="/blog/izmenenie-uslovij-vvoza-avto-i-utilsbor-2027"
            onClick={() => trackGoal(goals.CTA_BUTTON_CLICK, { label: 'Баннер: утильсбор 2027' })}
            className="font-semibold underline underline-offset-2 hover:no-underline whitespace-nowrap"
          >
            Подробнее
          </Link>
        </p>
        <button
          onClick={handleClose}
          aria-label="Закрыть уведомление"
          className="absolute right-3 sm:static sm:ml-auto shrink-0 w-7 h-7 rounded-md flex items-center justify-center hover:bg-white/15 transition-colors"
        >
          <Icon name="X" size={16} />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
