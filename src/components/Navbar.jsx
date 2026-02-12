import { useState } from 'react';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-otto-dark shadow-xl sticky top-0 z-40 border-b border-gray-700">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <a href="/" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} className="text-2xl md:text-3xl font-extrabold text-white flex items-center group">
            <div className="mr-2 p-1.5 bg-white/10 rounded-lg group-hover:bg-otto-orange transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-otto-orange group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
            </div>
            <span className="font-heading tracking-tight">Aluminios<span className="text-otto-orange">OTTO</span></span>
        </a>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6 items-center">
            {['Inicio', 'Productos', 'Servicios', 'Contacto'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 text-sm font-semibold hover:text-white transition duration-300 uppercase tracking-wide relative group">
                    {item}
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-otto-orange scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </a>
            ))}
            
            <div className="w-px h-6 bg-gray-600 mx-2"></div>

            {/* Badge Cotización (Botón que abre el Drawer) */}
            <button onClick={onOpenCart} className="relative text-white p-2 rounded-full hover:bg-white/10 transition-colors group" aria-label="Ver cotización">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:text-otto-orange transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-otto-orange text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-otto-dark animate-scaleIn">
                        {cartCount}
                    </span>
                )}
            </button>

            <a href="#contacto" className="px-5 py-2 bg-otto-orange text-white text-sm font-bold rounded-full shadow-lg hover:bg-orange-600 transition duration-300 hover:-translate-y-0.5">
                Cotizar Ahora
            </a>
        </div>

        {/* Boton Hamburguesa */}
        <button onClick={toggleMenu} className="md:hidden text-white focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                )}
            </svg>
        </button>
      </nav>

      {/* Menu Movil */}
      {isOpen && (
        <div className="md:hidden bg-otto-panel absolute w-full z-40 shadow-xl border-t border-gray-700 animate-fadeIn">
           <div className="flex flex-col p-4 space-y-3">
             {['Inicio', 'Productos', 'Servicios', 'Contacto'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={toggleMenu} className="text-gray-300 text-lg py-2 border-b border-gray-700 hover:text-white hover:border-otto-orange transition duration-300">{item}</a>
             ))}
             <button onClick={() => { onOpenCart(); toggleMenu(); }} className="flex justify-between items-center text-white py-2 border-b border-gray-700">
                <span>Ver Mi Cotización</span>
                <span className="bg-otto-orange px-2 py-0.5 rounded-full text-xs font-bold">{cartCount}</span>
             </button>
           </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;