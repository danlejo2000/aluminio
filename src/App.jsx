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

  // Enviar page_view a Google Analytics en cada cambio de ruta (SPA hash-based)
  useEffect(() => {
    const sendPageView = () => {
      try {
        if (window.gtag && typeof window.gtag === 'function') {
          const page_path = window.location.pathname + window.location.hash;
          window.gtag('event', 'page_view', { page_path });
        }
      } catch (err) {
        // noop - evitar romper la app si gtag no está disponible
      }
    };

    // Enviar al cargar la app y en cada cambio de hash
    sendPageView();
    window.addEventListener('hashchange', sendPageView);
    return () => window.removeEventListener('hashchange', sendPageView);
  }, []);

  // Envío de evento de prueba automático en entorno de desarrollo (solo localhost)
  useEffect(() => {
    try {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      if (isLocal && import.meta.env.DEV && window.gtag && typeof window.gtag === 'function') {
        window.gtag('event', 'integration_test', {
          send_to: 'G-ZJDJJ5QM3P',
          debug_mode: true,
          origin: 'local_dev_auto_test'
        });
        console.log('GA integration_test event sent (dev)');
      }
    } catch (err) {
      console.warn('GA test event failed', err);
    }
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