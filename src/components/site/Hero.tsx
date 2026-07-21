import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import CountryFlag, { CountryCode } from '@/components/site/CountryFlag';
import { trackGoal, goals } from '@/lib/analytics';

const countries: { code: CountryCode; name: string }[] = [
  { code: 'china', name: 'Китай' },
  { code: 'japan', name: 'Япония' },
  { code: 'korea', name: 'Корея' },
  { code: 'europe', name: 'Европа' },
  { code: 'usa', name: 'США' },
  { code: 'uae', name: 'ОАЭ' },
];

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-secondary/60 to-white">
      <div className="hidden lg:block absolute inset-y-0 right-0 w-[68%] animate-fade-in-right">
        <img
          src="https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/678a7afe-d1ec-4366-b5bf-294e4f2edf8d.jpg"
          alt="Премиальный автомобиль"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, hsl(var(--background)) 0%, hsl(var(--background)) 18%, transparent 55%), linear-gradient(0deg, hsl(var(--background)) 0%, transparent 20%), linear-gradient(180deg, hsl(var(--background)) 0%, transparent 15%)',
          }}
        />
      </div>

      <div className="lg:hidden -mx-4 mb-6 animate-fade-in relative">
        <img
          src="https://cdn.poehali.dev/projects/075c969b-4b51-4419-a74f-b3f2f4b044ae/files/678a7afe-d1ec-4366-b5bf-294e4f2edf8d.jpg"
          alt="Премиальный автомобиль"
          className="w-full h-56 sm:h-72 object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(0deg, hsl(var(--background)) 0%, transparent 30%)',
          }}
        />
      </div>

      <div className="container relative py-14 lg:py-24">
        <div className="max-w-xl animate-fade-in">
          <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-4">
            Автомобили со всего мира
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Найдём авто мечты<br />и доставим под ключ
          </h1>
          <p className="mt-6 text-muted-foreground text-lg max-w-md">
            Подберём, проверим и доставим автомобиль из любой страны мира.
            Полностью сопровождаем сделку до передачи ключей.
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-7">
            {countries.map((c) => (
              <div key={c.name} className="flex items-center gap-2 text-sm font-medium">
                <CountryFlag country={c.code} className="w-6 h-auto rounded-[3px] shadow-sm" />
                {c.name}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-8">
            <Button asChild size="lg" className="rounded-lg font-semibold h-14 px-8 text-base hover-lift">
              <a href="#cta" onClick={() => trackGoal(goals.CTA_BUTTON_CLICK, { label: 'Получить бесплатный расчёт (Hero)' })}>
                Получить бесплатный расчёт
              </a>
            </Button>
            <div className="text-sm text-muted-foreground leading-tight">
              Ответим в течение<br />
              <span className="text-foreground font-semibold">15 минут</span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-8">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="Star" size={18} className="fill-amber-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Более 500 автомобилей<br />доставлено клиентам
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;