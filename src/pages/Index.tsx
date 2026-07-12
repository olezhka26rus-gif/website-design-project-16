import Header from '@/components/site/Header';
import Hero from '@/components/site/Hero';
import Catalog from '@/components/site/Catalog';
import Steps from '@/components/site/Steps';
import Trust from '@/components/site/Trust';
import Cases from '@/components/site/Cases';
import Reviews from '@/components/site/Reviews';
import Faq from '@/components/site/Faq';
import CtaForm from '@/components/site/CtaForm';
import Footer from '@/components/site/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Catalog />
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
