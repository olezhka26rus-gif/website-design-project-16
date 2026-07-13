import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Icon from '@/components/ui/icon';
import { articles } from '@/data/articles';
import NotFound from './NotFound';

const Article = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <NotFound />;

  const pageUrl = `https://rlogistik.ru/blog/${article.slug}`;

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{article.title} | Region Logistik</title>
        <meta name="description" content={article.description} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.cover} />
        <meta property="og:url" content={pageUrl} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: article.title,
            description: article.description,
            image: article.cover,
            datePublished: article.date,
            author: { '@type': 'Organization', name: 'Region Logistik' },
          })}
        </script>
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
          <a
            href="/#cta"
            className="whitespace-nowrap rounded-lg bg-primary text-primary-foreground font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity"
          >
            Получить расчёт
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Article;
