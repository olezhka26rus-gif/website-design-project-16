import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import LeadFormModal from '@/components/site/LeadFormModal';
import { CarModel, CarVariant } from '@/data/catalogCars';

const VIEW_TABS = [
  { label: 'Экстерьер', icon: 'Car' },
  { label: 'Салон', icon: 'Armchair' },
];

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
  const [activeView, setActiveView] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<CarVariant | null>(null);
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    if (carModel) {
      setActiveView(0);
      setSelectedVariant(initialVariant ?? carModel.variants[0]);
    }
  }, [carModel, initialVariant]);

  if (!carModel || !selectedVariant) return null;

  const image = activeView === 0 ? selectedVariant.sideImage : selectedVariant.interiorImage;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-display text-2xl">{selectedVariant.model}</DialogTitle>
          </DialogHeader>

          <div className="grid sm:grid-cols-2 gap-6 p-6 pt-4">
            <div>
              <div className="rounded-xl overflow-hidden bg-secondary h-64 sm:h-72">
                <img
                  key={image}
                  src={image}
                  alt={`${selectedVariant.model} — ${VIEW_TABS[activeView].label}`}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {VIEW_TABS.map((view, i) => (
                  <button
                    key={view.label}
                    onClick={() => setActiveView(i)}
                    className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-colors ${
                      activeView === i
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-white text-foreground/70 border-border hover:border-primary'
                    }`}
                  >
                    <Icon name={view.icon} size={16} />
                    {view.label}
                  </button>
                ))}
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
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-2xl font-display font-extrabold text-primary">{selectedVariant.price}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Цена под ключ с учётом доставки и таможенного оформления
              </p>

              <div className="mt-6">
                <div className="text-sm font-semibold mb-2">Выберите кузов</div>
                <div className="flex flex-wrap gap-2">
                  {carModel.variants.map((variant) => (
                    <button
                      key={variant.model}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setActiveView(0);
                      }}
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
                  onClick={() => setLeadOpen(true)}
                >
                  Получить расчёт на {selectedVariant.model}
                </Button>
                <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
                  <Icon name="Lock" size={13} />
                  Ваши данные защищены и не передаются третьим лицам
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
