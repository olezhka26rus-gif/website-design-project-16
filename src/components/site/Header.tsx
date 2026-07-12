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
        <a href="#top" className="flex items-center">
          <img
            src="https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/bucket/f3e958f1-99ac-4f04-83cc-7fb354c3e05d.png"
            alt="REGION LOGISTIK"
            className="h-10 w-auto"
          />
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