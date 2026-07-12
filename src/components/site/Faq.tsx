import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Можно ли проверить автомобиль перед покупкой?',
    a: 'Да. Мы проводим полную проверку по всем базам, аукционную историю и техническое состояние ещё до выкупа автомобиля.',
  },
  {
    q: 'Какие способы оплаты вы принимаете?',
    a: 'Работаем по договору. Возможна оплата безналичным расчётом, а также поэтапная оплата на разных стадиях сделки.',
  },
  {
    q: 'Сколько времени занимает доставка автомобиля?',
    a: 'В среднем от 27 до 40 дней в зависимости от страны и логистического маршрута. Точный срок озвучим при расчёте.',
  },
  {
    q: 'Что делать, если автомобиль не подойдёт?',
    a: 'Мы согласовываем каждый вариант с вами до выкупа, поэтому вы всегда принимаете решение сами. Ничего не покупаем без вашего одобрения.',
  },
  {
    q: 'Входит ли растаможка в стоимость?',
    a: 'Да, в итоговый расчёт «под ключ» входят все таможенные платежи, оформление документов и доставка до вашего города.',
  },
  {
    q: 'Вы помогаете с оформлением документов?',
    a: 'Полностью сопровождаем оформление ЭПТС, СБКТС и сертификацию. Вы получаете автомобиль с полным пакетом документов.',
  },
];

const Faq = () => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-10">Часто задаваемые вопросы</h2>
        <div className="grid md:grid-cols-2 md:gap-x-10">
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(0, 3).map((f, i) => (
              <AccordionItem key={i} value={`a-${i}`}>
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            {faqs.slice(3).map((f, i) => (
              <AccordionItem key={i} value={`b-${i}`}>
                <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Faq;
