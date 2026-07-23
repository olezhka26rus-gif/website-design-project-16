import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import { articles } from '@/data/articles';

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Блог о доставке автомобилей из-за рубежа | Регион Логистик (Region Logistik)</title>
        <meta
          name="description"
          content="Полезные статьи о растаможке, доставке, проверке автомобилей из Китая, Японии, Кореи, Европы, США и ОАЭ, а также инструкция по калькулятору стоимости авто."
        />
        <meta
          name="keywords"
          content="блог о доставке авто, растаможка авто статьи, калькулятор стоимости авто, доставка авто из-за рубежа, доставка авто из ОАЭ, Регион Логистик, Region Logistik"
        />
        <link rel="canonical" href="https://rlogistik.ru/blog" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Блог о доставке автомобилей из-за рубежа | Регион Логистик" />
        <meta
          property="og:description"
          content="Полезные статьи о растаможке, доставке и проверке автомобилей из Китая, Японии, Кореи, Европы, США и ОАЭ."
        />
        <meta property="og:image" content="https://rlogistik.ru/logo-mark.png" />
        <meta property="og:url" content="https://rlogistik.ru/blog" />
        <meta property="og:locale" content="ru_RU" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://rlogistik.ru/' },
              { '@type': 'ListItem', position: 2, name: 'Блог', item: 'https://rlogistik.ru/blog' },
            ],
          })}
        </script>
      </Helmet>

      <Header />

      <main className="container py-16">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl mb-3">
          Блог о доставке автомобилей
        </h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Рассказываем, как устроена растаможка, доставка и проверка автомобилей из-за рубежа — на реальных примерах и цифрах.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link
              key={a.slug}
              to={`/blog/${a.slug}`}
              className="rounded-2xl border border-border overflow-hidden hover-lift bg-white flex flex-col"
            >
              <div className="h-40 bg-secondary overflow-hidden">
                <img src={a.cover} alt={a.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h2 className="font-display font-bold text-lg mb-2 leading-snug">{a.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 flex-1">{a.description}</p>
                <span className="text-xs text-muted-foreground">{a.readTime} чтения</span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;