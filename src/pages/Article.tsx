import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import LeadFormModal from '@/components/site/LeadFormModal';
import Calculator from '@/components/site/Calculator';
import Icon from '@/components/ui/icon';
import { articles } from '@/data/articles';
import { trackGoal, goals } from '@/lib/analytics';
import NotFound from './NotFound';

const Article = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);
  const [formOpen, setFormOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);

  if (!article) return <NotFound />;

  const isCalculatorArticle = article.slug === 'kak-polzovatsya-kalkulyatorom-stoimosti-avto';

  const pageUrl = `https://rlogistik.ru/blog/${article.slug}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{article.title} | Регион Логистик (Region Logistik)</title>
        <meta name="description" content={article.description} />
        {article.keywords && <meta name="keywords" content={article.keywords} />}
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.cover} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.cover} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.description,
            image: article.cover,
            datePublished: article.date,
            dateModified: article.date,
            author: { '@type': 'Organization', name: 'Регион Логистик' },
            publisher: { '@type': 'Organization', name: 'Регион Логистик' },
            mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://rlogistik.ru/' },
              { '@type': 'ListItem', position: 2, name: 'Блог', item: 'https://rlogistik.ru/blog' },
              { '@type': 'ListItem', position: 3, name: article.title, item: pageUrl },
            ],
          })}
        </script>
        {article.faq && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: article.faq.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            })}
          </script>
        )}
        {article.howTo && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: article.howTo.name,
              step: article.howTo.steps.map((s) => ({
                '@type': 'HowToStep',
                name: s.name,
                text: s.text,
              })),
            })}
          </script>
        )}
      </Helmet>

      <Header />

      <main className="container py-12 max-w-3xl">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <Icon name="ArrowLeft" size={16} />
          Все статьи
        </Link>

        <h1 className="font-display font-extrabold text-2xl sm:text-4xl mb-4 leading-tight">
          {article.title}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">{article.readTime} чтения</p>

        <div className="h-56 sm:h-80 rounded-2xl overflow-hidden mb-8 bg-secondary">
          <img src={article.cover} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {isCalculatorArticle && (
          <button
            onClick={() => {
              trackGoal(goals.CTA_BUTTON_CLICK, { label: 'Открыть калькулятор (статья блога)' });
              setCalcOpen(true);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground font-semibold px-5 py-3 mb-8 hover:opacity-90 transition-opacity"
          >
            <Icon name="Calculator" size={18} />
            Открыть калькулятор стоимости
          </button>
        )}

        <article className="space-y-6">
          {article.content.map((block, i) => (
            <div key={i}>
              {block.heading && (
                <h2 className="font-display font-bold text-xl mb-2">{block.heading}</h2>
              )}
              <p className="text-foreground/90 leading-relaxed">{block.text}</p>
            </div>
          ))}
        </article>

        <div className="mt-12 p-6 rounded-2xl bg-secondary/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display font-semibold text-center sm:text-left">
            Хотите рассчитать стоимость доставки своего автомобиля?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {isCalculatorArticle && (
              <button
                onClick={() => {
                  trackGoal(goals.CTA_BUTTON_CLICK, { label: 'Открыть калькулятор (низ статьи блога)' });
                  setCalcOpen(true);
                }}
                className="whitespace-nowrap rounded-lg border border-primary text-primary font-semibold px-5 py-2.5 hover:bg-primary/5 transition-colors"
              >
                Открыть калькулятор
              </button>
            )}
            <button
              onClick={() => {
                trackGoal(goals.CTA_BUTTON_CLICK, { label: 'Получить расчёт (статья блога)' });
                setFormOpen(true);
              }}
              className="whitespace-nowrap rounded-lg bg-primary text-primary-foreground font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
              Получить расчёт
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <LeadFormModal open={formOpen} onOpenChange={setFormOpen} source={`blog:${article.slug}`} />
      <Calculator open={calcOpen} onOpenChange={setCalcOpen} />
    </div>
  );
};

export default Article;