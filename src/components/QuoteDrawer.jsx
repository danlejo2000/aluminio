import { useEffect, useMemo } from 'react';

const QuoteDrawer = ({ isOpen, onClose, cart, onRemoveItem }) => {
  
  // Bloquear scroll del body cuando está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  // Generar link de WhatsApp
  const whatsappLink = useMemo(() => {
    const phone = "573167700403";
    let text = "¡Hola Aluminios OTTO! Me interesa cotizar los siguientes productos:%0A%0A";
    
    cart.forEach((item, index) => {
      text += `*${index + 1}. ${item.nombre}*%0A   Medida: ${item.medida}%0A   Acabado: ${item.acabado}%0A   Cant: ${item.cantidad}%0A%0A`;
    });
    
    text += "Quedo atento a su respuesta para finalizar la cotización.";
    return `https://wa.me/${phone}?text=${text}`;
  }, [cart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay Oscuro */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Panel Lateral */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slideInRight">
        {/* Header */}
        <div className="p-6 bg-otto-dark text-white flex justify-between items-center shadow-md">
          <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-otto-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
            Tu Cotización
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition text-gray-300 hover:text-white">✕</button>
        </div>

        {/* Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 scrollbar-thin">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              <p className="text-xl font-semibold">Tu lista está vacía.</p>
              <p className="text-sm mt-2">Explora nuestro catálogo para agregar perfiles.</p>
              <button onClick={onClose} className="mt-6 px-6 py-2 bg-otto-orange text-white rounded-full font-bold hover:bg-orange-600 transition">
                  Ir al Catálogo
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start group hover:border-otto-orange transition-colors">
                <div>
                  <h4 className="font-bold text-otto-dark text-lg leading-tight">{item.nombre}</h4>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>Acabado: <span className="font-medium text-gray-900">{item.acabado}</span></p>
                      <p>Medida: <span className="font-medium text-gray-900">{item.medida}</span></p>
                  </div>
                  <div className="mt-3 inline-flex items-center px-3 py-1 bg-otto-silver text-otto-dark text-xs font-bold rounded-full">
                    Cantidad: {item.cantidad}
                  </div>
                </div>
                <button onClick={() => onRemoveItem(idx)} className="text-gray-400 hover:text-red-500 transition p-2 hover:bg-red-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-white border-t border-gray-200">
            <div className="flex justify-between items-center mb-4 text-lg font-bold text-otto-dark">
                <span>Total Items:</span>
                <span className="text-2xl text-otto-orange">{cart.reduce((acc, item) => acc + item.cantidad, 0)}</span>
            </div>
            <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 ${cart.length === 0 ? 'bg-gray-300 cursor-not-allowed text-gray-500 pointer-events-none' : 'bg-[#25D366] text-white hover:bg-[#20bd5a]'}`}
            >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Solicitar Cotización
            </a>
            <p className="text-center text-xs text-gray-500 mt-3">Serás redirigido a WhatsApp para enviar el pedido.</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteDrawer;