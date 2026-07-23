import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Calculator from './Calculator';
import ContactsModal from './ContactsModal';
import CarSearch from './CarSearch';
import { trackGoal, goals } from '@/lib/analytics';

const navLinks = [
  { label: 'Китай', href: '#catalog-china' },
  { label: 'Япония', href: '#catalog-japan' },
  { label: 'Корея', href: '#catalog-korea' },
  { label: 'Европа', href: '#catalog-europe' },
  { label: 'США', href: '#catalog-usa' },
  { label: 'ОАЭ', href: '#catalog-uae' },
  { label: 'Каталог', href: '/catalog' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Блог', href: '/blog' },
  { label: 'Контакты', href: '#contacts' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [contactsOpen, setContactsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#contacts') {
      e.preventDefault();
      setContactsOpen(true);
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      if (!isHome) {
        navigate(`/${href}`);
        return;
      }
      window.location.hash = href;
      if (href.startsWith('#catalog-')) {
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-[72px]">
        <a href="/" className="flex items-center">
          <img
            src="https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/bucket/f3e958f1-99ac-4f04-83cc-7fb354c3e05d.png"
            alt="REGION LOGISTIK"
            className="h-14 sm:h-16 w-auto"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href.startsWith('#') && !isHome ? `/${link.href}` : link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5 ml-4">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Поиск автомобиля"
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              searchOpen ? 'bg-primary text-primary-foreground' : 'text-foreground/70 hover:bg-secondary'
            }`}
          >
            <Icon name="Search" size={19} />
          </button>
          <div className="text-right leading-tight">
            <a
              href="tel:+79106926276"
              onClick={() => trackGoal(goals.PHONE_CLICK)}
              className="font-display font-bold text-base"
            >
              +7 (910) 692-62-76
            </a>
            <div className="text-[11px] text-muted-foreground">Пн-Пт 9:00 – 18:00</div>
          </div>
          <Button
            className="rounded-lg font-semibold"
            onClick={() => {
              trackGoal(goals.CTA_BUTTON_CLICK, { label: 'Калькулятор стоимости' });
              setCalcOpen(true);
            }}
          >
            Калькулятор стоимости
          </Button>
        </div>

        <button className="md:hidden mr-2" onClick={() => setSearchOpen((v) => !v)} aria-label="Поиск автомобиля">
          <Icon name="Search" size={22} />
        </button>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Меню">
          <Icon name={open ? 'X' : 'Menu'} size={26} />
        </button>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-white animate-fade-in">
          <div className="container py-3">
            <CarSearch variant="header" />
          </div>
        </div>
      )}

      {open && (
        <div className="lg:hidden border-t border-border bg-white animate-fade-in">
          <nav className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href.startsWith('#') && !isHome ? `/${link.href}` : link.href}
                onClick={(e) => {
                  setOpen(false);
                  handleNavClick(e, link.href);
                }}
                className="text-base font-medium py-1"
              >
                {link.label}
              </a>
            ))}
            <Button
              className="mt-2 rounded-lg font-semibold"
              onClick={() => {
                trackGoal(goals.CTA_BUTTON_CLICK, { label: 'Получить расчёт (меню)' });
                setOpen(false);
                setCalcOpen(true);
              }}
            >
              Получить расчёт
            </Button>
          </nav>
        </div>
      )}

      <Calculator open={calcOpen} onOpenChange={setCalcOpen} />
      <ContactsModal open={contactsOpen} onOpenChange={setContactsOpen} />
    </header>
  );
};

export default Header;