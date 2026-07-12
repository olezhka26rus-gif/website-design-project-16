import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const navLinks = [
  { label: 'Китай', href: '#catalog' },
  { label: 'Япония', href: '#catalog' },
  { label: 'Корея', href: '#catalog' },
  { label: 'Европа', href: '#catalog' },
  { label: 'США', href: '#catalog' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Отзывы', href: '#reviews' },
  { label: 'Контакты', href: '#cta' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-[72px]">
        <a href="#top" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-display font-black text-xl">
            R
          </div>
          <div className="leading-none">
            <div className="font-display font-extrabold text-lg tracking-tight">REGION</div>
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground">LOGISTIK</div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-5">
          <div className="text-right leading-tight">
            <a href="tel:88003016980" className="font-display font-bold text-base">8 (800) 301-69-80</a>
            <div className="text-[11px] text-muted-foreground">Ежедневно 9:00 – 21:00</div>
          </div>
          <Button asChild className="rounded-lg font-semibold">
            <a href="#cta">Получить расчёт</a>
          </Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Меню">
          <Icon name={open ? 'X' : 'Menu'} size={26} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-white animate-fade-in">
          <nav className="container py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium py-1"
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="mt-2 rounded-lg font-semibold">
              <a href="#cta" onClick={() => setOpen(false)}>Получить расчёт</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
