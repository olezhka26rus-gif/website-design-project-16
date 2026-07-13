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

export interface CarData {
  brand: string;
  price: string;
  image: string;
  bodyTypes: string[];
}

const CAR_VIEWS = [
  { label: 'Сбоку', icon: 'Car' },
  { label: 'Спереди', icon: 'ArrowUp' },
  { label: 'Сзади', icon: 'ArrowDown' },
  { label: 'Салон', icon: 'Armchair' },
];

const bodyImages: Record<string, string> = {
  'Седан': 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/80ac2fa1-1b48-4787-b886-08d136a3a58e.jpg',
  'Кроссовер': 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/ddb038c1-f915-4856-937d-8e3b74ce4ab2.jpg',
  'Универсал': 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/2650e492-a7ab-4586-9a57-4a02880bf537.jpg',
  'Внедорожник': 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/35e16f97-bd93-4f45-92f1-ef1ce3f5f2af.jpg',
  'Хэтчбек': 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/9ecb0700-2e91-4edf-b370-723a1a3ed767.jpg',
  'Купе': 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/cc819687-09af-4769-86a0-cd1162d2dc07.jpg',
  'Пикап': 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/1faad728-cd27-4b0a-b4d9-f6a8f179c9af.jpg',
  'Лифтбек': 'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/767a1333-47e5-46e2-8c10-efdd44cd26fb.jpg',
};

const genericViews = [
  '',
  'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/48e3ceeb-85e0-45c7-ab43-c02291dc6994.jpg',
  'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/d64d1eea-6c24-4394-bc1a-e67c7737e419.jpg',
  'https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/7697174c-abf9-47a7-9c3b-906da5681d8d.jpg',
];

interface CarDetailModalProps {
  car: CarData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CarDetailModal = ({ car, open, onOpenChange }: CarDetailModalProps) => {
  const [activeView, setActiveView] = useState(0);
  const [selectedBody, setSelectedBody] = useState('');
  const [leadOpen, setLeadOpen] = useState(false);

  useEffect(() => {
    if (car) {
      setActiveView(0);
      setSelectedBody(car.bodyTypes[0] ?? '');
    }
  }, [car]);

  if (!car) return null;

  const sideView = bodyImages[selectedBody] ?? car.image;
  const views = [sideView, ...genericViews.slice(1)];

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-display text-2xl">{car.brand}</DialogTitle>
          </DialogHeader>

          <div className="grid sm:grid-cols-2 gap-6 p-6 pt-4">
            <div>
              <div className="rounded-xl overflow-hidden bg-secondary h-64 sm:h-72">
                <img
                  src={views[activeView]}
                  alt={`${car.brand} — ${CAR_VIEWS[activeView].label}`}
                  className="w-full h-full object-cover animate-fade-in"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {CAR_VIEWS.map((view, i) => (
                  <button
                    key={view.label}
                    onClick={() => setActiveView(i)}
                    className={`flex flex-col items-center gap-1 py-2 rounded-lg border text-xs font-medium transition-colors ${
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
            </div>

            <div className="flex flex-col">
              <div className="text-2xl font-display font-extrabold text-primary">{car.price}</div>
              <p className="text-sm text-muted-foreground mt-1">
                Цена под ключ с учётом доставки и таможенного оформления
              </p>

              <div className="mt-6">
                <div className="text-sm font-semibold mb-2">Выберите кузов</div>
                <div className="flex flex-wrap gap-2">
                  {car.bodyTypes.map((body) => (
                    <button
                      key={body}
                      onClick={() => {
                        setSelectedBody(body);
                        setActiveView(0);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                        selectedBody === body
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-white text-foreground/80 border-border hover:border-primary'
                      }`}
                    >
                      {body}
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
                  Получить расчёт на {car.brand}
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
        defaultCar={`${car.brand} (${selectedBody})`}
      />
    </>
  );
};

export default CarDetailModal;