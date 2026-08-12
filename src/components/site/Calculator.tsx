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