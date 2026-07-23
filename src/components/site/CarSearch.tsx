import { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import CountryFlag from '@/components/site/CountryFlag';
import LeadFormModal from '@/components/site/LeadFormModal';
import { catalogEntries } from '@/data/catalogCars';
import { trackGoal, goals } from '@/lib/analytics';

interface CarSearchProps {
  variant?: 'header' | 'page';
  placeholder?: string;
  className?: string;
}

const CarSearch = ({ variant = 'page', placeholder = 'Найти автомобиль, например BMW X5', className = '' }: CarSearchProps) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [leadOpen, setLeadOpen] = useState(false);
  const navigate = useNavigate();
  const wrapRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    return catalogEntries
      .filter((e) => {
        const haystack = `${e.model.brand} ${e.variant.model}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
      .slice(0, 8);
  }, [normalizedQuery]);

  const showNoResults = normalizedQuery.length >= 2 && results.length === 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (country: string, slug: string) => {
    setOpen(false);
    setQuery('');
    navigate(`/catalog/${country}/${slug}`);
  };

  const handleRequestCar = () => {
    trackGoal(goals.CTA_BUTTON_CLICK, { label: `Запрос авто вне каталога: ${query}` });
    setOpen(false);
    setLeadOpen(true);
  };

  return (
    <div ref={wrapRef} className={`relative ${className}`}>
      <div className="relative">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className={
            variant === 'header'
              ? 'w-full h-10 pl-10 pr-4 rounded-lg border border-border bg-secondary/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:bg-white transition-colors'
              : 'w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-white text-base focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors'
          }
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Очистить"
          >
            <Icon name="X" size={16} />
          </button>
        )}
      </div>

      {open && normalizedQuery.length >= 2 && (
        <div className="absolute z-50 mt-2 w-full bg-white rounded-xl border border-border shadow-lg overflow-hidden animate-fade-in">
          {results.length > 0 ? (
            <div className="max-h-80 overflow-y-auto">
              {results.map((e) => (
                <button
                  key={`${e.country}-${e.slug}`}
                  onClick={() => handleSelect(e.country, e.slug)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-secondary/60 transition-colors text-left border-b border-border last:border-0"
                >
                  <div className="w-12 h-9 rounded-md overflow-hidden bg-secondary shrink-0">
                    <img src={e.variant.sideImage} alt={e.variant.model} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{e.variant.model}</div>
                    <div className="text-xs text-muted-foreground">{e.variant.bodyType} · {e.countryName}</div>
                  </div>
                  <CountryFlag country={e.country} className="w-5 h-auto rounded-[2px] shrink-0" />
                  <div className="text-xs font-bold text-primary shrink-0">{e.variant.price}</div>
                </button>
              ))}
            </div>
          ) : showNoResults ? (
            <div className="p-5 text-center">
              <Icon name="SearchX" size={28} className="mx-auto text-muted-foreground mb-2" />
              <p className="font-semibold text-sm mb-1">«{query}» нет в нашем каталоге</p>
              <p className="text-xs text-muted-foreground mb-4">
                Но мы можем привезти практически любой автомобиль под заказ — уточните детали у менеджера.
              </p>
              <button
                onClick={handleRequestCar}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Icon name="MessageCircle" size={15} />
                Уточнить у менеджера
              </button>
            </div>
          ) : null}
        </div>
      )}

      <LeadFormModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        source="car-search-not-found"
        defaultCar={query}
      />
    </div>
  );
};

export default CarSearch;
