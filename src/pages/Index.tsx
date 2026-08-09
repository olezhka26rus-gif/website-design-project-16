import { Helmet } from 'react-helmet-async';
import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import Catalog from '@/components/site/Catalog';
import About from '@/components/site/About';
import Steps from '@/components/site/Steps';
import Trust from '@/components/site/Trust';
import Cases from '@/components/site/Cases';
import Reviews from '@/components/site/Reviews';
import Faq from '@/components/site/Faq';
import CtaForm from '@/components/site/CtaForm';
import Footer from '@/components/site/Footer';

const Index = () => {
  const pageUrl = 'https://rlogistik.ru/';

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Регион Логистик (Region Logistik) — авто из Китая, Японии, Кореи, Европы, США и ОАЭ под ключ</title>
        <meta
          name="description"
          content="Регион Логистик (ООО «РегионЛогистик») — подбор, проверка и доставка автомобилей под ключ из Китая, Японии, Кореи, Европы, США и ОАЭ. Более 500 доставленных авто. Расчёт стоимости за 15 минут."
        />
        <meta
          name="keywords"
          content="авто под ключ, доставка авто из Китая, доставка авто из Японии, доставка авто из Кореи, доставка авто из ОАЭ, растаможка авто, подбор автомобиля из-за рубежа, Регион Логистик, Region Logistik, РегионЛогистик, автоброкер Москва, доставка автомобилей компания"
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Регион Логистик (Region Logistik) — авто из-за рубежа под ключ" />
        <meta
          property="og:description"
          content="Подбор, проверка и доставка автомобилей под ключ из Китая, Японии, Кореи, Европы, США и ОАЭ. Более 500 доставленных авто."
        />
        <meta property="og:image" content="https://rlogistik.ru/og-cover.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="ru_RU" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Регион Логистик (Region Logistik) — авто из-за рубежа под ключ" />
        <meta
          name="twitter:description"
          content="Подбор, проверка и доставка автомобилей под ключ из Китая, Японии, Кореи, Европы, США и ОАЭ."
        />
        <meta name="twitter:image" content="https://rlogistik.ru/og-cover.png" />
      </Helmet>

      <Header />
      <main>
        <Hero />
        <Catalog />
        <About />
        <Steps />
        <Trust />
        <Cases />
        <Reviews />
        <Faq />
        <CtaForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;