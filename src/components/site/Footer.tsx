import { useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import VkIcon from '@/components/icons/VkIcon';
import { trackGoal, goals } from '@/lib/analytics';

const Footer = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const anchor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <footer className="bg-foreground text-white/70">
      <div className="container py-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
        <div>
          <a href="/" className="flex items-center gap-3 mb-4 w-fit">
            <img src="/logo-mark.png" alt="" className="h-10 w-auto" />
            <div className="leading-none text-white">
              <div className="font-display font-extrabold text-lg">REGION</div>
              <div className="text-[10px] tracking-[0.3em] text-white/50">LOGISTIK</div>
            </div>
          </a>
          <p className="text-sm">Подбор, проверка и доставка автомобилей со всего мира под ключ.</p>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Страны</h4>
          <ul className="space-y-2 text-sm">
            {['Китай', 'Япония', 'Корея', 'Европа', 'США', 'ОАЭ'].map((c) => (
              <li key={c}><a href={anchor('#catalog')} className="hover:text-primary transition-colors">{c}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Компания</h4>
          <ul className="space-y-2 text-sm">
            <li><a href={anchor('#about')} className="hover:text-primary transition-colors">О компании</a></li>
            <li><a href={anchor('#cases')} className="hover:text-primary transition-colors">Кейсы</a></li>
            <li><a href={anchor('#reviews')} className="hover:text-primary transition-colors">Отзывы</a></li>
            <li><a href="/blog" className="hover:text-primary transition-colors">Блог</a></li>
            <li><a href={anchor('#cta')} className="hover:text-primary transition-colors">Контакты</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Контакты</h4>
          <a
            href="tel:+79106926276"
            onClick={() => trackGoal(goals.PHONE_CLICK)}
            className="block text-white font-display font-bold text-lg mb-1"
          >
            +7 (910) 692-62-76
          </a>
          <p className="text-sm mb-4">Пн-Пт 9:00 – 18:00</p>
          <div className="flex gap-3">
            <a
              href="https://vk.com/region_logistik"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal(goals.VK_CLICK)}
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <VkIcon size={18} />
            </a>
            <a
              href="https://t.me/region_logistik"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal(goals.TELEGRAM_CLICK)}
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <Icon name="Send" size={18} />
            </a>
            <a
              href="https://wa.me/79106926276"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGoal(goals.WHATSAPP_CLICK)}
              className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              aria-label="WhatsApp"
            >
              <Icon name="MessageCircle" size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Реквизиты</h4>
          <ul className="space-y-1.5 text-xs leading-relaxed">
            <li className="text-white/90 font-semibold">ООО «РЕГИОНЛОГИСТИК»</li>
            <li>ИНН 2508143154</li>
            <li>ОГРН 1222500012140</li>
            <li>Руководитель: Яриз Пётр Васильевич</li>
            <li className="pt-1.5">
              Юридический адрес: г. Москва, Очаковское шоссе, 34,
              БЦ «WEST PARK», офис а605
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row gap-2 sm:gap-6 justify-between text-xs text-white/50">
          <span>© {new Date().getFullYear()} ООО «РЕГИОНЛОГИСТИК». Все права защищены.</span>
          <span className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Вся информация на сайте предоставлена для ознакомления и не является публичной офертой.</span>
            <a href="/privacy" className="hover:text-primary transition-colors underline underline-offset-2">
              Политика конфиденциальности
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;