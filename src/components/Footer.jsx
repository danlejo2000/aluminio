const Footer = () => {
  return (
    <footer className="bg-otto-dark py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        <div className="mb-6 flex justify-center space-x-8">
            <a href="https://www.facebook.com/groups/495654765639023/?locale=es_LA" target="_blank" rel="noopener noreferrer" className="text-white hover:text-otto-orange transition duration-300 transform hover:scale-110" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.016 3.65 9.18 8.438 9.878v-7.05h-2.54V12h2.54V9.797c0-2.515 1.536-3.89 3.774-3.89 1.074 0 2.002.198 2.27.287v2.668h-1.583c-1.248 0-1.487.594-1.487 1.464V12h3.04l-.49 3.23h-2.55V21.878C18.35 21.18 22 17.016 22 12c0-5.523-4.477-10-10-10z"/></svg>
            </a>
            <a href="#" className="text-white hover:text-otto-orange transition duration-300 transform hover:scale-110" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.071 1.17.06 1.743.231 2.224.402.479.172.884.408 1.25.774.366.366.602.771.774 1.25.17.481.341 1.054.402 2.224.06 1.266.071 1.646.071 4.85s-.012 3.584-.071 4.85c-.06 1.17-.231 1.743-.402 2.224-.172.479-.408.884-.774 1.25-.366.366-.771.602-1.25.774-.481.17-1.054.341-2.224.402-1.266.06-1.646.071-4.85.071zm0-2.163c-3.259 0-3.667.014-4.945.072-1.378.067-2.366.29-3.203.626-.838.337-1.554.795-2.261 1.502-.707.707-1.173 1.423-1.502 2.261-.336.837-.559 1.825-.626 3.203-.058 1.278-.072 1.687-.072 4.945s.014 3.667.072 4.945c.067 1.378.29 2.366.626 3.203.337.838.795 1.554 1.502 2.261.707.707 1.423 1.173 2.261 1.502.837.336 1.825.559 3.203.626 1.278.058 1.687.072-4.945-.072zm0 5.838c-3.41 0-6.175 2.766-6.175 6.175s2.766 6.175 6.175 6.175 6.175-2.766 6.175-6.175-2.766-6.175-6.175-6.175zm0 10.163c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.471-11.455c0 1.236-.999 2.235-2.235 2.235s-2.235-.999-2.235-2.235c0-1.236.999-2.235 2.235-2.235s2.235.999 2.235 2.235z"/></svg>
            </a>
        </div>
        <p className="text-base">&copy; 2024 Aluminios OTTO. Todos los derechos reservados.</p>
        <p className="mt-2 text-sm text-gray-500">Transformando ideas con la resistencia y belleza del aluminio.</p>
      </div>
    </footer>
  );
};
export default Footer;