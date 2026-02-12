import { useEffect, useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "¿Qué tipos de sistemas de aluminio ofrecen?",
      answer: "Ofrecemos sistemas completos: ventanas corredizas (Astral 345), ventanas/puertas corredizas (Kimbaya), ventanas oscilo-batientes (Zinu), puertas corredizas (Tairona), puertas plegables (Colosal), perfiles arquitectónicos, accesorios (bisagras, rodamientos, cierres, empaques) y herrajes. Todos con certificación europea."
    },
    {
      question: "¿Cuánto cuesta una ventana de aluminio en Colombia?",
      answer: "El precio depende del sistema, medidas y acabado. Una ventana corrediza estándar (2.40 m²) puede costar desde $800.000 a $1.500.000 COP con instalación. Los sistemas oscilo-batientes de alta gama van desde $1.200.000 a $2.500.000 COP. Contáctanos por WhatsApp para una cotización exacta según tus necesidades."
    },
    {
      question: "¿Realizan envíos a toda Colombia?",
      answer: "Sí, nuestra sede está en Bogotá (Calle 68 #28a-31, La Soledad) pero despachamos a todo el país: Medellín, Cali, Barranquilla, Cartagena, Bucaramanga, Pereira, Manizales, Ibagué, Pasto, Cúcuta, Villavicencibo y todas las ciudades de Colombia. Los costos de envío se calculan según destino y volumen."
    },
    {
      question: "¿Cuál es la diferencia entre ventana corrediza y oscilo-batiente?",
      answer: "Las ventanas corredizas (Astral 345, Kimbaya) se deslizan horizontalmente sobre rieles, ideales para espacios reducidos. Las oscilo-batientes (Zinu) permiten apertura doble: inclinación superior para ventilación y apertura lateral completa para limpieza. Estas últimas ofrecen mayor hermeticidad (Clase AEV 3-A1-W1A) y aislamiento acústico."
    },
    {
      question: "¿Qué acabados de aluminio tienen disponibles?",
      answer: "Manejamos acabados en aluminio natural (plateado), blanco, negro mate, anodizado bronce, y bajo pedido podemos conseguir colores personalizados mediante pintura electrostática. El anodizado ofrece mayor durabilidad y resistencia a la corrosión en zonas costeras o húmedas."
    },
    {
      question: "¿Hacen corte y fabricación a medida?",
      answer: "Sí, ofrecemos servicios de corte a medida, laminado, doblado y ensamble de perfiles. Puedes comprar el material y nosotros lo cortamos según tus especificaciones, o solicitar un sistema completo fabricado e instalado. Contamos con maquinaria de precisión para cortes a 45° y ensambles profesionales."
    },
    {
      question: "¿Qué garantía tienen los sistemas de aluminio?",
      answer: "Los perfiles de aluminio tienen garantía de por vida contra oxidación y corrosión. Los accesorios (rodamientos, bisagras, cierres) tienen garantía de 2 a 5 años según la marca. Los sistemas completos instalados por nosotros incluyen garantía de 1 año en mano de obra y ensamble."
    },
    {
      question: "¿Cuánto tiempo demora la fabricación e instalación?",
      answer: "La fabricación de ventanas/puertas estándar toma de 5 a 10 días hábiles. Proyectos grandes (edificios, conjuntos residenciales) pueden tomar de 2 a 4 semanas. La instalación de una ventana promedio toma 2-3 horas. Para proyectos completos, coordinamos cronogramas de obra según tus necesidades."
    },
    {
      question: "¿Qué espesor de vidrio recomiendan para ventanas de aluminio?",
      answer: "Para ventanas corredizas estándar recomendamos vidrio de 4mm a 6mm. Para sistemas de alta gama como Kimbaya aceptan vidrios de 6mm a 10mm o cámaras térmicas hasta 22mm. Para puertas recomendamos mínimo 6mm. En zonas con mucho ruido, recomendamos doble vidriado (DVH) con cámara de aire."
    },
    {
      question: "¿El aluminio es mejor que el PVC para ventanas?",
      answer: "El aluminio ofrece mayor resistencia estructural, durabilidad (50+ años), no se deforma con el sol ni la lluvia, es 100% reciclable y permite grandes dimensiones sin deformarse. El PVC es más económico pero menos duradero en climas tropicales. Para clima colombiano, el aluminio es superior por su resistencia a rayos UV y humedad."
    },
    {
      question: "¿Necesito contratar instalación o puedo hacerlo yo mismo?",
      answer: "Puedes comprar solo los materiales si tienes experiencia en instalación. Sin embargo, recomendamos instalación profesional para garantizar hermeticidad, alineación correcta y funcionamiento óptimo. Ofrecemos asesoría técnica gratuita y podemos cotizar solo materiales o proyecto completo (material + instalación)."
    },
    {
      question: "¿Tienen sistemas para proyectos comerciales o edificios?",
      answer: "Sí, manejamos proyectos residenciales, comerciales e industriales. Hemos trabajado en edificios, oficinas, centros comerciales, hospitales y colegios. Ofrecemos descuentos por volumen, asesoría de ingeniería, planos técnicos y coordinación con constructoras. Contamos con capacidad de producción para grandes volúmenes."
    }
  ];

  useEffect(() => {
    // Generar Schema.org FAQPage
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqData.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const scriptId = 'faq-schema';
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(faqSchema);

    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-otto-dark mb-4">
            Preguntas <span className="text-otto-orange">Frecuentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Resolvemos tus dudas sobre sistemas de aluminio, precios, instalación y envíos a toda Colombia
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center gap-4 hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-lg font-bold text-otto-dark pr-4">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-otto-orange/10 text-otto-orange transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
              >
                <div className="px-8 pb-6 pt-2">
                  <p className="text-gray-700 leading-relaxed border-l-4 border-otto-orange pl-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bottom */}
        <div className="mt-16 text-center bg-otto-dark text-white rounded-2xl p-10">
          <h3 className="text-2xl font-bold mb-4">¿Aún tienes dudas?</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Nuestro equipo técnico está disponible para resolver cualquier consulta sobre sistemas de aluminio, cotizaciones y proyectos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://wa.me/573167700403?text=Hola,%20tengo%20una%20consulta%20sobre%20sistemas%20de%20aluminio" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#20ba5a] transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
            <a 
              href="#contacto" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-otto-dark font-bold rounded-full hover:bg-gray-100 transition-all transform hover:-translate-y-1 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Formulario
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
