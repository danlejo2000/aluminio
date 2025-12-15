import { createContext, useContext, useState } from 'react';
import { productData } from '../data/products';

const ShopContext = createContext();

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
};

export const ShopProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productDetail, setProductDetail] = useState(null);

  // Acciones del Carrito
  const addToCart = (item) => {
    setCart([...cart, item]);
    setIsDrawerOpen(true); // Feedback inmediato
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Acciones de Modales
  const openCategory = (categoryName) => setSelectedCategory(categoryName);
  const closeCategory = () => setSelectedCategory(null);
  
  const openProductDetail = (product) => setProductDetail(product);
  const closeProductDetail = () => setProductDetail(null);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  // Datos derivados para los modales
  const currentCategoryProducts = selectedCategory ? productData[selectedCategory] : [];

  return (
    <ShopContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      isDrawerOpen,
      setIsDrawerOpen,
      toggleDrawer,
      selectedCategory,
      openCategory,
      closeCategory,
      currentCategoryProducts,
      productDetail,
      openProductDetail,
      closeProductDetail
    }}>
      {children}
    </ShopContext.Provider>
  );
};