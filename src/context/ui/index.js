import { createContext, useContext, useState } from "react";

export const UIContext = createContext({});
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(false);
  // NEW: add to cart
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  
  const value = {
    drawerOpen,
    setDrawerOpen,
    showSearchBox,
    setShowSearchBox,
    cart,
    setCart,
    showCart,
    setShowCart,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};
