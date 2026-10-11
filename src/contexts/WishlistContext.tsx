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
import { wishlistApi } from "@/lib/api";
import type { Product } from "@/types";
import { useAuth } from "./AuthContext";

interface WishlistContextValue {
  wishlist: Product[];
  wishlistIds: Set<string>;
  isLoading: boolean;
  refreshWishlist: () => Promise<void>;
  toggleWishlist: (productId: string) => Promise<void>;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refreshWishlist = useCallback(async () => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await wishlistApi.get();
      setWishlist(data.data || []);
    } catch {
      setWishlist([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!authLoading) {
      void refreshWishlist();
    }
  }, [authLoading, refreshWishlist]);

  const wishlistIds = useMemo(
    () => new Set(wishlist.map((item) => item._id || item.id)),
    [wishlist],
  );

  const isInWishlist = useCallback(
    (productId: string) => wishlistIds.has(productId),
    [wishlistIds],
  );

  const toggleWishlist = useCallback(
    async (productId: string) => {
      if (!isAuthenticated) {
        toast.error("Please login to manage wishlist");
        return;
      }
      try {
        if (wishlistIds.has(productId)) {
          await wishlistApi.remove(productId);
          setWishlist((prev) =>
            prev.filter((item) => (item._id || item.id) !== productId),
          );
          toast.success("Removed from wishlist");
        } else {
          await wishlistApi.add(productId);
          await refreshWishlist();
          toast.success("Added to wishlist");
        }
      } catch {
        toast.error("Failed to update wishlist");
      }
    },
    [isAuthenticated, wishlistIds, refreshWishlist],
  );

  const value = useMemo(
    () => ({
      wishlist,
      wishlistIds,
      isLoading,
      refreshWishlist,
      toggleWishlist,
      isInWishlist,
    }),
    [
      wishlist,
      wishlistIds,
      isLoading,
      refreshWishlist,
      toggleWishlist,
      isInWishlist,
    ],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
