"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface CartContextProps {
  cart: Item[];
  addToCart: (item: Item) => void;
  removeFromCart: (itemId: number) => void;
  viewFromCart: () => Item[];
}

interface CartProviderProps {
  children: React.ReactNode;
}

const CART_STORAGE_KEY = "cart";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Item[]>(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }
  }, [cart]);

  const viewFromCart = () => {
    const cartItemsArray = [...cart];
    return cartItemsArray;
  };

  const addToCart = (item: Item) => {
    const isItemInCart = cart.some((cartItem) => cartItem.id === item.id);
    if (isItemInCart) {
      alert("This item is already in your cart!");
      return;
    }
    setCart((prevCart) => [...prevCart, item]);
    alert("Added Successfully!");
  };

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const cartContextValue: CartContextProps = {
    cart,
    addToCart,
    removeFromCart,
    viewFromCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};
