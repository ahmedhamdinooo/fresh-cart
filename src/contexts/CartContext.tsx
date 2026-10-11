"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { cartApi } from "@/lib/api";
import type { CartData } from "@/types";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  cart: CartData | null;
  cartId: string | null;
  numOfCartItems: number;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, count: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [cart, setCart] = useState<CartData | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      setCartId(null);
      setNumOfCartItems(0);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await cartApi.get();
      setCart(data.data);
      setCartId(data.cartId || data.data._id);
      setNumOfCartItems(data.numOfCartItems);
    } catch {
      setCart(null);
      setCartId(null);
      setNumOfCartItems(0);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      void refreshCart();
    }
  }, [authLoading, refreshCart]);

  const addToCart = useCallback(
    async (productId: string) => {
      if (!isAuthenticated) {
        toast.error("Please login to add items to cart");
        return;
      }
      try {
        const { data } = await cartApi.add(productId);
        setCart(data.data);
        setCartId(data.cartId || data.data._id);
        setNumOfCartItems(data.numOfCartItems);
        toast.success("Product added to cart");
      } catch {
        toast.error("Failed to add product to cart");
      }
    },
    [isAuthenticated],
  );

  const updateQuantity = useCallback(async (productId: string, count: number) => {
    try {
      const { data } = await cartApi.update(productId, count);
      setCart(data.data);
      setNumOfCartItems(data.numOfCartItems);
    } catch {
      toast.error("Failed to update quantity");
    }
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    try {
      const { data } = await cartApi.remove(productId);
      setCart(data.data);
      setNumOfCartItems(data.numOfCartItems);
      toast.success("Product removed from cart");
    } catch {
      toast.error("Failed to remove product");
    }
  }, []);

  const clearCart = useCallback(async () => {
    try {
      await cartApi.clear();
      setCart(null);
      setCartId(null);
      setNumOfCartItems(0);
      toast.success("Cart cleared");
    } catch {
      toast.error("Failed to clear cart");
    }
  }, []);

  const value = useMemo(
    () => ({
      cart,
      cartId,
      numOfCartItems,
      isLoading,
      refreshCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [
      cart,
      cartId,
      numOfCartItems,
      isLoading,
      refreshCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
