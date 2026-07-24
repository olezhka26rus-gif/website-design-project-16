import Icon from '@/components/ui/icon';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';

const reviews: { name: string; rating: number; date: string; text: string }[] = [
  {
    name: 'Джек Уайлдер',
    rating: 5,
    date: '15 июля 2026',
    text: 'Впервые заказывал авто. Менеджер Тимур все точно рассказал. Машина пришла точно в срок. По документам без нареканий.',
  },
  {
    name: 'Ансель Хантимиров',
    rating: 5,
    date: '16 июня 2026',
    text: 'Долго думал о покупке авто, в итоге обратился к ребятам, проконсультировали, сказали сколько по времени будет идти авто, предварительно предоставили полный отчёт по авто, который удовлетворил мои пожелания! Заключили договор и спокойно ждал, когда придёт авто, менеджер всегда на связи, все вопросы которые возникали решали оперативно. Стоит обращаться, рекомендую.',
  },
  {
    name: 'Даниил Петровский',
    rating: 5,
    date: '16 июня 2026',
    text: 'Хорошее место, сотрудники профессионалы, Александр грамотный специалист, помог и проконсультировал, доступным образом объяснил что и как устроено.',
  },
  {
    name: 'Dmitry Bardin',
    rating: 5,
    date: '15 мая 2026',
    text: 'Александр, спасибо за доставку авто Honda из Китая. Всё чётко по цене и срокам.',
  },
  {
    name: 'Валерия К.',
    rating: 5,
    date: '15 мая 2026',
    text: 'Спасибо большое ребятам. Выполняют свою работу качественно и очень трепетно!',
  },
  {
    name: 'Виталий К.',
    rating: 5,
    date: '15 мая 2026',
    text: 'Отличный индивидуальный подход! Внимательно подошли к потребностям и сделали лучшее предложение! Остался доволен!',
  },
  {
    name: 'Андрей С.',
    rating: 5,
    date: '15 мая 2026',
    text: 'Хочу поблагодарить компанию «Регион Логистик» за безупречную работу по приобретению автомобиля под заказ. Изначально искал надёжного партнёра для покупки машины из-за рубежа — и не ошибся с выбором. Особенно отмечу прозрачность процесса: на каждом этапе я получал чёткие отчёты и обновления о статусе заказа — от подбора авто до прохождения таможни.',
  },
  {
    name: 'Леша Багаев',
    rating: 5,
    date: '2 апреля 2026',
    text: 'Нашёл ребят через Авито, общался с Александром. Он очень хорош в своём деле, всегда на связи, всё понятно объяснял, предлагал кучу вариантов на любой вкус и цвет. Однозначно советую!',
  },
  {
    name: 'Никита Николаевич',
    rating: 5,
    date: '26 февраля 2026',
    text: 'Все супер! Брал у ребят автомобиль, доехал в целости и сохранности. Абсолютно адекватные менеджеры, предложили лучшую цену за автомобиль из всех компаний, что я перепробовал. Дают гарантию на мотор и коробку целый год — настоятельно рекомендую.',
  },
  {
    name: 'Андрей Миролевич',
    rating: 5,
    date: '26 февраля 2026',
    text: 'Крайне доволен работой сотрудников данной компании. Несмотря на ограниченный бюджет привезли отличный автомобиль, персонал вежлив, цены приятные, по всем вопросам быстро сориентировали.',
  },
];

const Reviews = () => {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-2">Отзывы клиентов</h2>
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="Star" size={16} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9 · отзывы на Яндекс Картах</span>
            </div>
          </div>
          <a
            href="https://yandex.ru/maps/org/region_logistik/154073392322/reviews/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            Все отзывы на Яндекс Картах
            <Icon name="ExternalLink" size={14} />
          </a>
        </div>

        <Carousel opts={{ align: 'start', loop: false }} className="relative">
          <CarouselContent>
            {reviews.map((r) => (
              <CarouselItem key={r.name + r.date} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <div className="h-full rounded-2xl border border-border p-6 hover-lift flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-xl shrink-0">👤</div>
                    <div className="min-w-0">
                      <div className="font-display font-bold text-sm truncate">{r.name}</div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={13} className="fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-6 flex-1">{r.text}</p>
                  <div className="text-xs text-muted-foreground">{r.date}</div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden sm:block">
            <CarouselPrevious className="-left-4 lg:-left-12" />
            <CarouselNext className="-right-4 lg:-right-12" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default Reviews;
