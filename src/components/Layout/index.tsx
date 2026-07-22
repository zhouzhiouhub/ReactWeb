import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';

export default function Layout() {
  return (
    <div className="min-h-screen bg-brand-paper text-brand-ink dark:bg-[#101514] dark:text-white">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
