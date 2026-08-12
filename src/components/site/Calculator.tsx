import { useState, useEffect, useMemo } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import CountryFlag, { CountryCode } from '@/components/site/CountryFlag';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { trackGoal, goals } from '@/lib/analytics';
import { catalogEntries, CatalogEntry } from '@/data/catalogCars';
import { buildCarContent } from '@/lib/carContent';
import {
  calcDuty,
  calcUtilFee,
  calcClearanceFee,
  deliveryByCountry,
  SERVICE_FEE,
  SERVICE_FEE_TOOLTIP,
  EUR_RATE,
  CountryCalcKey,
} from '@/lib/customs';

const countries: { value: CountryCode; label: string; delivery: number }[] = (
  [
    { value: 'china', label: 'Китай' },
    { value: 'japan', label: 'Япония' },
    { value: 'korea', label: 'Корея' },
    { value: 'europe', label: 'Европа' },
    { value: 'usa', label: 'США' },
    { value: 'uae', label: 'ОАЭ' },
  ] as { value: CountryCode; label: string }[]
).map((c) => ({ ...c, delivery: deliveryByCountry[c.value as CountryCalcKey] }));

const ageBands = [
  { value: 'new', label: 'До 3 лет' },
  { value: 'mid', label: '3–5 лет' },
  { value: 'old', label: 'Старше 5 лет' },
];

interface CalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Предзаполнить калькулятор конкретной машиной из каталога */
  presetEntry?: CatalogEntry | null;
}

const Row = ({
  label,
  value,
  accent,
  hint,
}: {
  label: string;
  value: string;
  accent?: boolean;
  hint?: string;
}) => (
  <div className="flex items-center justify-between py-2 text-sm border-b border-border/60 last:border-0">
    <span className="text-muted-foreground flex items-center gap-1.5">
      {label}
      {hint && (
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label="Пояснение"
              className="text-muted-foreground/70 hover:text-primary transition-colors"
            >
              <Icon name="Info" size={14} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="text-sm leading-relaxed w-72">{hint}</PopoverContent>
        </Popover>
      )}
    </span>
    <span className={accent ? 'font-display font-bold text-primary text-base' : 'font-semibold'}>
      {value}
    </span>
  </div>
);

const Calculator = ({ open, onOpenChange, presetEntry = null }: CalculatorProps) => {
  const [carPickerOpen, setCarPickerOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CatalogEntry | null>(null);
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [engineCm3, setEngineCm3] = useState('');
  const [power, setPower] = useState('');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState<null | {
    price: number;
    duty: number;
    utilFee: number;
    clearanceFee: number;
    delivery: number;
    service: number;
    total: number;
  }>(null);

  /** Заполняет поля характеристиками выбранного автомобиля */
  const applyCar = (entry: CatalogEntry, targetCountry?: string) => {
    const c = buildCarContent(entry);
    const use = targetCountry ?? c.best?.country ?? entry.country;
    const quote = c.quotes.find((q) => q.country === use);

    setSelectedCar(entry);
    setCountry(use);
    setAge('new');
    setEngineCm3(c.cm3 > 0 ? String(c.cm3) : '');
    setPower(c.hp > 0 ? String(c.hp) : '');
    setPrice(String(quote ? quote.carPrice : c.basePrice));
    setResult(null);
  };

  /** Смена страны при выбранной машине пересчитывает цену для этого рынка */
  const handleCountryChange = (value: string) => {
    setCountry(value);
    setResult(null);
    if (!selectedCar) return;
    const c = buildCarContent(selectedCar);
    const quote = c.quotes.find((q) => q.country === value);
    if (quote) setPrice(String(quote.carPrice));
  };

  const clearCar = () => {
    setSelectedCar(null);
    setResult(null);
  };

  useEffect(() => {
    if (open && presetEntry) applyCar(presetEntry);
  }, [open, presetEntry]);

  /** Страны, где реально продаётся выбранная машина */
  const availableCountries = useMemo(() => {
    if (!selectedCar) return countries;
    const allowed = new Set(buildCarContent(selectedCar).quotes.map((q) => q.country));
    return countries.filter((c) => allowed.has(c.value));
  }, [selectedCar]);

  const isElectricCar = selectedCar
    ? /электро/i.test(selectedCar.variant.specs.engine)
    : false;

  const isValid =
    country &&
    age &&
    (isElectricCar || Number(engineCm3) > 0) &&
    Number(power) > 0 &&
    Number(price) > 0;

  const handleCalculate = () => {
    if (!isValid) return;
    const priceNum = Number(price);
    const engineNum = isElectricCar ? 0 : Number(engineCm3);
    const powerNum = Number(power);
    const countryData = countries.find((c) => c.value === country)!;

    const duty = calcDuty(priceNum, age, engineNum);
    const utilFee = calcUtilFee(age, powerNum);
    const clearanceFee = calcClearanceFee(priceNum);
    const total = priceNum + duty + utilFee + clearanceFee + countryData.delivery + SERVICE_FEE;

    setResult({
      price: priceNum,
      duty,
      utilFee,
      clearanceFee,
      delivery: countryData.delivery,
      service: SERVICE_FEE,
      total,
    });
    trackGoal(goals.CALCULATOR_CALCULATE, { country });
  };

  const handleReset = () => {
    setResult(null);
    setSelectedCar(null);
    setCountry('');
    setAge('');
    setEngineCm3('');
    setPower('');
    setPrice('');
  };

  const fmt = (n: number) => n.toLocaleString('ru-RU') + ' ₽';

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) handleReset();
      }}
    >
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Калькулятор стоимости</DialogTitle>
          <DialogDescription>
            Расчёт по методике ФТС: пошлина, утильсбор и таможенный сбор. Точную стоимость назовёт менеджер.
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Автомобиль из каталога
                <span className="text-muted-foreground font-normal"> — необязательно</span>
              </label>

              {selectedCar ? (
                <div className="flex items-center gap-3 rounded-lg border border-primary/40 bg-primary/5 p-2.5">
                  <img
                    src={selectedCar.variant.sideImage}
                    alt={selectedCar.variant.model}
                    className="w-16 h-11 object-cover rounded-md bg-secondary shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm truncate">
                      {selectedCar.variant.model}
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {selectedCar.variant.specs.engine} · {selectedCar.variant.specs.power}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearCar}
                    aria-label="Убрать автомобиль"
                    className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              ) : (
                <Popover open={carPickerOpen} onOpenChange={setCarPickerOpen}>
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full h-11 flex items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-sm text-muted-foreground hover:border-primary transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Icon name="Search" size={15} />
                        Выбрать машину — подставим характеристики
                      </span>
                      <Icon name="ChevronDown" size={15} />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
                    <Command>
                      <CommandInput placeholder="Марка или модель..." />
                      <CommandList>
                        <CommandEmpty>Ничего не найдено</CommandEmpty>
                        <CommandGroup>
                          {catalogEntries.map((e) => (
                            <CommandItem
                              key={`${e.country}-${e.slug}`}
                              value={`${e.variant.model} ${e.model.brand} ${e.searchIndex}`}
                              onSelect={() => {
                                applyCar(e);
                                setCarPickerOpen(false);
                              }}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <CountryFlag
                                  country={e.country as CountryCode}
                                  className="w-4 h-auto rounded-[2px] shrink-0"
                                />
                                <span className="truncate">{e.variant.model}</span>
                                <span className="text-xs text-muted-foreground shrink-0">
                                  {e.variant.specs.power}
                                </span>
                              </div>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Страна покупки
                {selectedCar && (
                  <span className="text-muted-foreground font-normal">
                    {' '}— доступные для этой модели
                  </span>
                )}
              </label>
              <Select value={country} onValueChange={handleCountryChange}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  {availableCountries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      <span className="flex items-center gap-2">
                        <CountryFlag country={c.value} className="w-5 h-auto rounded-[2px]" />
                        {c.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Возраст автомобиля</label>
              <Select value={age} onValueChange={setAge}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Выберите возраст" />
                </SelectTrigger>
                <SelectContent>
                  {ageBands.map((a) => (
                    <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Объём двигателя, см³</label>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder={isElectricCar ? 'Электромобиль' : 'Например, 1998'}
                  value={isElectricCar ? '' : engineCm3}
                  disabled={isElectricCar}
                  onChange={(e) => setEngineCm3(e.target.value)}
                  className="h-11"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Мощность, л.с.</label>
                <Input
                  type="number"
                  inputMode="numeric"
                  placeholder="Например, 150"
                  value={power}
                  onChange={(e) => setPower(e.target.value)}
                  className="h-11"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Цена авто за рубежом, ₽</label>
              <Input
                type="number"
                inputMode="numeric"
                placeholder="Например, 2 500 000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-11"
              />
            </div>

            <Button
              onClick={handleCalculate}
              disabled={!isValid}
              size="lg"
              className="w-full h-12 font-semibold"
            >
              Рассчитать стоимость
            </Button>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="rounded-xl bg-secondary/60 p-4 mb-2">
              <Row label="Цена авто" value={fmt(result.price)} />
              <Row label="Таможенная пошлина" value={fmt(result.duty)} />
              <Row label="Утилизационный сбор" value={fmt(result.utilFee)} />
              <Row label="Таможенный сбор (оформление)" value={fmt(result.clearanceFee)} />
              <Row label="Доставка" value={fmt(result.delivery)} />
              <Row
                label="Комплексное сопровождение сделки"
                value={fmt(result.service)}
                hint={SERVICE_FEE_TOOLTIP}
              />
              <Row label="Итого под ключ" value={fmt(result.total)} accent />
            </div>

            <div className="flex gap-3 mt-4">
              <Button variant="outline" className="flex-1 h-12" onClick={handleReset}>
                <Icon name="RotateCcw" size={16} />
                Пересчитать
              </Button>
              <Button
                asChild
                className="flex-1 h-12 font-semibold"
                onClick={() => {
                  trackGoal(goals.CTA_BUTTON_CLICK, { label: 'Оставить заявку (калькулятор)' });
                  onOpenChange(false);
                }}
              >
                <a href="#cta">Оставить заявку</a>
              </Button>
            </div>
            <p className="flex items-start gap-1.5 text-xs text-muted-foreground mt-3">
              <Icon name="Info" size={13} className="mt-0.5 shrink-0" />
              Расчёт ориентировочный (курс ~{EUR_RATE} ₽/€), точную сумму подтвердит менеджер
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Calculator;