import Icon from '@/components/ui/icon';
import VkIcon from '@/components/icons/VkIcon';

const Footer = () => {
  return (
    <footer className="bg-foreground text-white/70">
      <div className="container py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo-mark.png" alt="" className="h-10 w-auto" />
            <div className="leading-none text-white">
              <div className="font-display font-extrabold text-lg">REGION</div>
              <div className="text-[10px] tracking-[0.3em] text-white/50">LOGISTIK</div>
            </div>
          </div>
          <p className="text-sm">Подбор, проверка и доставка автомобилей со всего мира под ключ.</p>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Страны</h4>
          <ul className="space-y-2 text-sm">
            {['Китай', 'Япония', 'Корея', 'Европа', 'США'].map((c) => (
              <li key={c}><a href="#catalog" className="hover:text-primary transition-colors">{c}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Компания</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#cases" className="hover:text-primary transition-colors">Кейсы</a></li>
            <li><a href="#reviews" className="hover:text-primary transition-colors">Отзывы</a></li>
            <li><a href="#cta" className="hover:text-primary transition-colors">Контакты</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-display font-bold mb-4">Контакты</h4>
          <a href="tel:+79153977087" className="block text-white font-display font-bold text-lg mb-1">+7 (915) 397-70-87</a>
          <p className="text-sm mb-4">Пн-Пт 9:00 – 18:00</p>
          <div className="flex gap-3">
            <a href="https://vk.com/region_logistik" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <VkIcon size={18} />
            </a>
            <a href="https://t.me/region_logistik" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
              <Icon name="Send" size={18} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-5 text-xs text-white/50">
          © {new Date().getFullYear()} REGION LOGISTIK. Все права защищены.
        </div>
      </div>
    </footer>
  );
};

export default Footer;