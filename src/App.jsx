import { ShopProvider } from './context/ShopContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import SitemapPage from './pages/SitemapPage';
import { useState, useEffect } from 'react';

// Routing simple basado en hash
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remueve el #
      if (hash === 'sitemap' || hash === '/sitemap') {
        setCurrentPage('sitemap');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange(); // Ejecutar al cargar
    window.addEventListener('hashchange', handleHashChange);
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <ShopProvider>
      <MainLayout>
        {currentPage === 'sitemap' ? <SitemapPage /> : <HomePage />}
      </MainLayout>
    </ShopProvider>
  );
}

export default App;