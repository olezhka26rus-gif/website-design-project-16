import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import LeadFormModal from '@/components/site/LeadFormModal';
import Calculator from '@/components/site/Calculator';
import { CarModel, CarVariant, findEntryByVariant } from '@/data/catalogCars';
import { trackGoal, goals } from '@/lib/analytics';
import { buildCarContent } from '@/lib/carContent';
import { formatRub } from '@/lib/customs';

const SPEC_ROWS: { key: keyof CarVariant['specs']; label: string; icon: string }[] = [
  { key: 'engine', label: 'Двигатель', icon: 'Fuel' },
  { key: 'power', label: 'Мощность', icon: 'Gauge' },
  { key: 'drive', label: 'Привод', icon: 'MoveHorizontal' },
  { key: 'transmission', label: 'Коробка', icon: 'Cog' },
  { key: 'year', label: 'Год выпуска', icon: 'Calendar' },
  { key: 'consumption', label: 'Расход', icon: 'Droplet' },
];

interface CarDetailModalProps {
  carModel: CarModel | null;
  initialVariant?: CarVariant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CarDetailModal = ({ carModel, initialVariant, open, onOpenChange }: CarDetailModalProps) => {
  const [selectedVariant, setSelectedVariant] = useState<CarVariant | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  useEffect(() => {
    if (carModel) {
      setSelectedVariant(initialVariant ?? carModel.variants[0]);
    }
  }, [carModel, initialVariant]);

  if (!carModel || !selectedVariant) return null;

  const entry = findEntryByVariant(selectedVariant);
  const content = entry ? buildCarContent(entry) : null;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl p-0 overflow-y-auto">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-display text-2xl">{selectedVariant.model}</DialogTitle>
          </DialogHeader>

          <div className="grid sm:grid-cols-2 gap-6 p-6 pt-4">
            <div>
              <div className="rounded-xl overflow-hidden bg-secondary h-64 sm:h-72">
                <img
                  key={selectedVariant.sideImage}
                  src={selectedVariant.sideImage}
                  alt={selectedVariant.model}
                  className="w-full h-full object-cover animate-fade-in"
                  decoding="async"
                />
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-5 text-sm">
                {SPEC_ROWS.map((row) => (
                  <div key={row.key} className="flex items-center gap-2 text-muted-foreground">
                    <Icon name={row.icon} size={14} className="shrink-0" />
                    <span className="truncate">
                      {row.label}: <span className="text-foreground font-medium">{selectedVariant.specs[row.key]}</span>
                    </span>
                  </div>
                ))}
                {content && content.cm3 > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon name="Cylinder" size={14} className="shrink-0" />
                    <span className="truncate">
                      Объём: <span className="text-foreground font-medium">{content.cm3} см³</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              {content?.cost ? (
                <>
                  <div className="text-2xl font-display font-extrabold text-primary">
                    от {formatRub(content.cost.total)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ориентировочная цена под ключ: автомобиль {formatRub(content.cost.price)},
                    пошлина, утильсбор, доставка и услуги компании
                    {content.best ? ` — по выгодному маршруту из ${content.best.countryGen}` : ''}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-2xl font-display font-extrabold text-primary">
                    {selectedVariant.price}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Стоимость автомобиля без учёта доставки и таможенного оформления
                  </p>
                </>
              )}

              <div className="mt-6">
                <div className="text-sm font-semibold mb-2">Выберите кузов</div>
                <div className="flex flex-wrap gap-2">
                  {carModel.variants.map((variant) => (
                    <button
                      key={variant.model}
                      onClick={() => setSelectedVariant(variant)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                        selectedVariant.model === variant.model
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-white text-foreground/80 border-border hover:border-primary'
                      }`}
                    >
                      {variant.bodyType}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-6">
                <Button
                  size="lg"
                  className="w-full h-12 font-semibold text-base hover-lift"
                  onClick={() => {
                    trackGoal(goals.CTA_BUTTON_CLICK, { label: `Получить расчёт на ${selectedVariant.model}` });
                    setLeadOpen(true);
                  }}
                >
                  Получить расчёт на {selectedVariant.model}
                </Button>
                {entry && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full h-11 font-semibold mb-4"
                    onClick={() => {
                      trackGoal(goals.CTA_BUTTON_CLICK, {
                        label: `Калькулятор (${selectedVariant.model})`,
                      });
                      setCalcOpen(true);
                    }}
                  >
                    <Icon name="Calculator" size={16} />
                    Рассчитать растаможку
                  </Button>
                )}

                {content && content.quotes.length > 1 && (
                  <div className="mb-4 rounded-xl bg-secondary/60 p-3">
                    <div className="text-xs font-semibold mb-1.5">Возим из нескольких стран</div>
                    <div className="flex flex-wrap gap-1.5">
                      {content.quotes.map((q) => (
                        <span
                          key={q.country}
                          className={`text-[11px] rounded-md px-2 py-1 ${
                            q.isBest
                              ? 'bg-primary/10 text-primary font-semibold'
                              : 'bg-white text-foreground/70'
                          }`}
                        >
                          {q.countryName}
                          {q.isBest ? ' — выгоднее' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {entry && (
                  <Link
                    to={`/catalog/${entry.country}/${entry.slug}`}
                    onClick={() => onOpenChange(false)}
                    className="mt-3 flex items-center justify-center gap-1.5 h-11 rounded-lg border border-border text-sm font-semibold text-foreground/80 hover:border-primary hover:text-primary transition-colors"
                  >
                    <Icon name="FileText" size={16} />
                    Подробнее: расчёт, сроки и вопросы
                  </Link>
                )}
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
                  <Icon name="Lock" size={13} />
                  Ваши данные защищены и не передаются третьим лицам
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Calculator open={calcOpen} onOpenChange={setCalcOpen} presetEntry={entry ?? null} />

      <LeadFormModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        source="catalog"
        defaultCar={`${selectedVariant.model} (${selectedVariant.bodyType})`}
      />
    </>
  );
};

export default CarDetailModal;