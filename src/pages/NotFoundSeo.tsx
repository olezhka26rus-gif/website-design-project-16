import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const countries = [
  { name: 'Китай', hash: '/#catalog-china' },
  { name: 'Япония', hash: '/#catalog-japan' },
  { name: 'Корея', hash: '/#catalog-korea' },
  { name: 'Европа', hash: '/#catalog-europe' },
  { name: 'США', hash: '/#catalog-usa' },
  { name: 'ОАЭ', hash: '/#catalog-uae' },
];

const NotFoundSeo = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404: страница не найдена —', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Helmet>
        <title>Страница не найдена | Region Logistik</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <Header />

      <main className="flex-1 container py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-secondary mb-8">
            <Icon name="Compass" size={40} className="text-primary" />
          </div>

          <p className="font-display font-extrabold text-6xl sm:text-7xl text-primary mb-4 leading-none">
            404
          </p>

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl mb-4 leading-tight">
            Такой страницы не существует
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground mb-10">
            Возможно, страница была перемещена или в адресе допущена ошибка. Но нужный автомобиль мы
            всё равно поможем подобрать.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Button asChild size="lg">
              <Link to="/catalog">
                <Icon name="Car" size={18} className="mr-2" />
                Перейти в каталог
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/">
                <Icon name="Home" size={18} className="mr-2" />
                На главную
              </Link>
            </Button>
          </div>

          <div className="border-t pt-10">
            <p className="text-sm font-semibold text-muted-foreground mb-4">
              Автомобили по странам
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {countries.map((c) => (
                <a
                  key={c.name}
                  href={c.hash}
                  className="px-4 py-2 rounded-lg border text-sm font-medium hover:border-primary hover:text-primary transition-colors"
                >
                  {c.name}
                </a>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center text-sm">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon name="BookOpen" size={15} />
                Блог о доставке авто
              </Link>
              <a
                href="tel:+79106926276"
                className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon name="Phone" size={15} />
                +7 (910) 692-62-76
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundSeo;
