"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import ProductGrid from "@/components/product/ProductGrid";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useWishlist } from "@/contexts/WishlistContext";

function WishlistContent() {
  const { wishlist, isLoading } = useWishlist();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Wishlist</h1>
        <p className="mt-1 text-sm text-slate-500">
          {wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}
        </p>
      </div>

      {wishlist.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Save products you love for later."
          actionLabel="Browse products"
          actionHref="/products"
        />
      ) : (
        <ProductGrid products={wishlist} />
      )}
    </div>
  );
}

export default function WishlistPage() {
  return (
    <ProtectedRoute>
      <WishlistContent />
    </ProtectedRoute>
  );
}
