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
import Icon from '@/components/ui/icon';
import CountryFlag, { CountryCode } from '@/components/site/CountryFlag';

const countries: { value: CountryCode; label: string; delivery: number }[] = [
  { value: 'china', label: 'Китай', delivery: 180000 },
  { value: 'japan', label: 'Япония', delivery: 220000 },
  { value: 'korea', label: 'Корея', delivery: 160000 },
  { value: 'europe', label: 'Европа', delivery: 260000 },
  { value: 'usa', label: 'США', delivery: 320000 },
];

const ageBands = [
  { value: 'new', label: 'До 3 лет', dutyRate: 0.25 },
  { value: 'mid', label: '3–5 лет', dutyRate: 0.35 },
  { value: 'old', label: 'Старше 5 лет', dutyRate: 0.45 },
];

const engineBands = [
  { value: 'small', label: 'До 2.0 л', extra: 0 },
  { value: 'mid', label: '2.0–3.0 л', extra: 80000 },
  { value: 'big', label: 'От 3.0 л', extra: 150000 },
];

const SERVICE_FEE = 150000;

interface CalculatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex items-center justify-between py-2 text-sm border-b border-border/60 last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className={accent ? 'font-display font-bold text-primary text-base' : 'font-semibold'}>
      {value}
    </span>
  </div>
);

const Calculator = ({ open, onOpenChange }: CalculatorProps) => {
  const [country, setCountry] = useState('');
  const [age, setAge] = useState('');
  const [engine, setEngine] = useState('');
  const [price, setPrice] = useState('');
  const [result, setResult] = useState<null | {
    price: number;
    duty: number;
    engineExtra: number;
    delivery: number;
    service: number;
    total: number;
  }>(null);

  const isValid = country && age && engine && Number(price) > 0;

  const handleCalculate = () => {
    if (!isValid) return;
    const priceNum = Number(price);
    const countryData = countries.find((c) => c.value === country)!;
    const ageData = ageBands.find((a) => a.value === age)!;
    const engineData = engineBands.find((e) => e.value === engine)!;

    const duty = Math.round(priceNum * ageData.dutyRate);
    const total = priceNum + duty + engineData.extra + countryData.delivery + SERVICE_FEE;

    setResult({
      price: priceNum,
      duty,
      engineExtra: engineData.extra,
      delivery: countryData.delivery,
      service: SERVICE_FEE,
      total,
    });
  };

  const handleReset = () => {
    setResult(null);
    setCountry('');
    setAge('');
    setEngine('');
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">Калькулятор стоимости</DialogTitle>
          <DialogDescription>
            Приблизительный расчёт «под ключ». Точную стоимость назовёт менеджер.
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

            <div>
              <label className="text-sm font-medium mb-1.5 block">Объём двигателя</label>
              <Select value={engine} onValueChange={setEngine}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Выберите объём" />
                </SelectTrigger>
                <SelectContent>
                  {engineBands.map((e) => (
                    <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              <Row label="Растаможка" value={fmt(result.duty)} />
              {result.engineExtra > 0 && <Row label="Доп. сбор за объём" value={fmt(result.engineExtra)} />}
              <Row label="Доставка" value={fmt(result.delivery)} />
              <Row label="Услуги компании" value={fmt(result.service)} />
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
                onClick={() => onOpenChange(false)}
              >
                <a href="#cta">Оставить заявку</a>
              </Button>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
              <Icon name="Info" size={13} />
              Расчёт ориентировочный, точную сумму подтвердит менеджер
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Calculator;