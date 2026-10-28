import { CarVariant, findEntryByVariant } from '@/data/catalogCars';
import { cardPriceLabel } from '@/lib/carPricing';

interface CarCardPriceProps {
  variant: CarVariant;
  compact?: boolean;
  className?: string;
}

const CarCardPrice = ({ variant, compact = false, className = '' }: CarCardPriceProps) => {
  const entry = findEntryByVariant(variant);
  const label = entry ? cardPriceLabel(entry) : null;

  if (compact) {
    return (
      <div className={`text-xs font-bold text-primary shrink-0 text-right ${className}`}>
        {label ? label.price : variant.price}
        {label && <div className="text-[10px] font-normal text-muted-foreground">под ключ</div>}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="text-sm font-bold text-primary">{label ? label.price : variant.price}</div>
      <div className="text-[11px] text-muted-foreground">{label ? label.note : 'цена авто без доставки'}</div>
    </div>
  );
};

export default CarCardPrice;
