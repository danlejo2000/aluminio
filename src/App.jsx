import { ShopProvider } from './context/ShopContext';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';

// Si en el futuro instalas 'react-router-dom', aquí importarías { BrowserRouter, Routes, Route }
// y envolverías el MainLayout con las rutas.

function App() {
  return (
    // 1. Proveedor de Estado Global (Carrito)
    <ShopProvider>
      
      {/* 2. Layout Principal (Navbar + Footer + Modals) */}
      <MainLayout>
        
        {/* 3. Página Actual (Aquí irían tus rutas <Routes> si las tuvieras) */}
        <HomePage />
        
      </MainLayout>
      
    </ShopProvider>
  );
}

export default App;