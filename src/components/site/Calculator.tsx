import { useState } from 'react';
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
import { trackGoal, goals } from '@/lib/analytics';

/* ============================================================
   Ставки и курс валют — обновляются вручную по мере изменений
   законодательства РФ (ФТС, Постановления Правительства).
   ============================================================ */

// Курс ЦБ РФ, ₽ за 1 EUR
const EUR_RATE = 90;

// Пошлина для авто ДО 3 лет: % от стоимости или мин. ставка за см³ (берётся большее)
const newCarDutyTiers = [
  { maxEur: 8500, percent: 0.54, minPerCm3: 2.5 },
  { maxEur: 16700, percent: 0.48, minPerCm3: 3.5 },
  { maxEur: 42300, percent: 0.48, minPerCm3: 5.5 },
  { maxEur: 84500, percent: 0.48, minPerCm3: 7.5 },
  { maxEur: 169000, percent: 0.48, minPerCm3: 15 },
  { maxEur: Infinity, percent: 0.48, minPerCm3: 20 },
];

// Пошлина для авто 3–5 лет: ставка EUR за см³ (от стоимости не зависит)
const midCarDutyTiers = [
  { maxCm3: 1000, ratePerCm3: 1.5 },
  { maxCm3: 1500, ratePerCm3: 1.7 },
  { maxCm3: 1800, ratePerCm3: 2.5 },
  { maxCm3: 2300, ratePerCm3: 2.7 },
  { maxCm3: 3000, ratePerCm3: 3.0 },
  { maxCm3: Infinity, ratePerCm3: 3.6 },
];

// Пошлина для авто старше 5 лет: ставка EUR за см³ (от стоимости не зависит)
const oldCarDutyTiers = [
  { maxCm3: 1000, ratePerCm3: 3.0 },
  { maxCm3: 1500, ratePerCm3: 3.2 },
  { maxCm3: 1800, ratePerCm3: 3.5 },
  { maxCm3: 2300, ratePerCm3: 4.8 },
  { maxCm3: 3000, ratePerCm3: 5.0 },
  { maxCm3: Infinity, ratePerCm3: 5.7 },
];

// Утилизационный сбор: базовая ставка и льготные фиксированные суммы (мощность ≤160 л.с.)
const UTIL_BASE = 20000;
const utilFlat = { new: 3400, old: 5200 };

// Повышающие коэффициенты утильсбора для мощности >160 л.с.
const utilCoefTiers = [
  { maxPower: 200, new: 6.1, old: 9.6 },
  { maxPower: 300, new: 15, old: 21 },
  { maxPower: Infinity, new: 30, old: 42 },
];

// Таможенный сбор за оформление декларации (от стоимости авто, ₽)
const clearanceFeeTiers = [
  { maxPrice: 200000, fee: 1231 },
  { maxPrice: 450000, fee: 2462 },
  { maxPrice: 1200000, fee: 4924 },
  { maxPrice: 2700000, fee: 13541 },
  { maxPrice: 4200000, fee: 18465 },
  { maxPrice: 5500000, fee: 21344 },
  { maxPrice: 10000000, fee: 49240 },
  { maxPrice: Infinity, fee: 73860 },
];

const countries: { value: CountryCode; label: string; delivery: number }[] = [
  { value: 'china', label: 'Китай', delivery: 180000 },
  { value: 'japan', label: 'Япония', delivery: 220000 },
  { value: 'korea', label: 'Корея', delivery: 160000 },
  { value: 'europe', label: 'Европа', delivery: 260000 },
  { value: 'usa', label: 'США', delivery: 320000 },
  { value: 'uae', label: 'ОАЭ', delivery: 150000 },
];

const ageBands = [
  { value: 'new', label: 'До 3 лет' },
  { value: 'mid', label: '3–5 лет' },
  { value: 'old', label: 'Старше 5 лет' },
];

const SERVICE_FEE = 250000;
const SERVICE_FEE_TOOLTIP =
  'Комплексное сопровождение включает: подбор автомобиля, проверку истории и состояния, участие в торгах (при необходимости), организацию выкупа, взаимодействие с иностранными партнёрами, контроль логистики, сопровождение таможенного оформления и поддержку клиента до получения автомобиля.';

interface CalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

const findTier = <T extends { maxEur?: number; maxCm3?: number; maxPrice?: number; maxPower?: number }>(
  tiers: T[],
  value: number,
  key: 'maxEur' | 'maxCm3' | 'maxPrice' | 'maxPower'
): T => tiers.find((t) => value <= (t[key] as number))! ?? tiers[tiers.length - 1];

const calcDuty = (priceRub: number, age: string, engineCm3: number) => {
  if (age === 'new') {
    const priceEur = priceRub / EUR_RATE;
    const tier = findTier(newCarDutyTiers, priceEur, 'maxEur');
    const byPercent = priceRub * tier.percent;
    const byVolume = engineCm3 * tier.minPerCm3 * EUR_RATE;
    return Math.round(Math.max(byPercent, byVolume));
  }
  const tiers = age === 'mid' ? midCarDutyTiers : oldCarDutyTiers;
  const tier = findTier(tiers, engineCm3, 'maxCm3');
  return Math.round(engineCm3 * tier.ratePerCm3 * EUR_RATE);
};

const calcUtilFee = (age: string, power: number) => {
  const isNew = age === 'new';
  if (power <= 160) return isNew ? utilFlat.new : utilFlat.old;
  const tier = findTier(utilCoefTiers, power, 'maxPower');
  return Math.round(UTIL_BASE * (isNew ? tier.new : tier.old));
};

const calcClearanceFee = (priceRub: number) => findTier(clearanceFeeTiers, priceRub, 'maxPrice').fee;

const Calculator = ({ open, onOpenChange }: CalculatorProps) => {
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

  const isValid =
    country && age && Number(engineCm3) > 0 && Number(power) > 0 && Number(price) > 0;

  const handleCalculate = () => {
    if (!isValid) return;
    const priceNum = Number(price);
    const engineNum = Number(engineCm3);
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
              <label className="text-sm font-medium mb-1.5 block">Страна</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Выберите страну" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
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
                  placeholder="Например, 1998"
                  value={engineCm3}
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