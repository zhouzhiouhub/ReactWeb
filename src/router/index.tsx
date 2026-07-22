import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import News from '../pages/News';
import NewsDetail from '../pages/NewsDetail';
import NotFound from '../pages/NotFound';
import Product from '../pages/Product';
import ProductDetail from '../pages/ProductDetail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'product', element: <Product /> },
      { path: 'product/:id', element: <ProductDetail /> },
      { path: 'news', element: <News /> },
      { path: 'news/:id', element: <NewsDetail /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

export default router;
