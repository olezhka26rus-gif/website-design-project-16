import { CN, JP, KR, EU, US, AE } from 'country-flag-icons/react/3x2';

export type CountryCode = 'china' | 'japan' | 'korea' | 'europe' | 'usa' | 'uae';

const flagComponents: Record<CountryCode, (props: { className?: string }) => React.JSX.Element> = {
  china: CN,
  japan: JP,
  korea: KR,
  europe: EU,
  usa: US,
  uae: AE,
};

interface CountryFlagProps {
  country: CountryCode;
  className?: string;
}

const CountryFlag = ({ country, className = 'w-5 h-auto rounded-[2px]' }: CountryFlagProps) => {
  const Flag = flagComponents[country];
  return <Flag className={className} />;
};

export default CountryFlag;