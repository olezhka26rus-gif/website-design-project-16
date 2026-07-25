import { Helmet } from 'react-helmet-async';
import NotFound from './NotFound';

const NotFoundSeo = () => (
  <>
    <Helmet>
      <title>Страница не найдена | Region Logistik</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <NotFound />
  </>
);

export default NotFoundSeo;
