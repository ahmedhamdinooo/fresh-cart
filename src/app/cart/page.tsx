"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

function CartContent() {
  const {
    cart,
    numOfCartItems,
    isLoading,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  if (isLoading) return <LoadingSpinner />;

  if (!cart?.products?.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <EmptyState
          title="Your cart is empty"
          description="Looks like you haven't added anything yet."
          actionLabel="Start shopping"
          actionHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="mt-1 text-sm text-slate-500">
            {numOfCartItems} item{numOfCartItems !== 1 ? "s" : ""} in your cart
          </p>
        </div>
        <Button variant="danger" onClick={() => void clearCart()}>
          <Trash2 className="h-4 w-4" />
          Clear Cart
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {cart.products.map((item) => {
            const product = item.product;
            const productId = product._id || product.id;
            return (
              <div
                key={item._id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/products/${productId}`}
                  className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-50 sm:mx-0"
                >
                  <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="112px"
                    className="object-contain p-2"
                  />
                </Link>

                <div className="min-w-0 flex-1">
                  <Link
                    href={`/products/${productId}`}
                    className="line-clamp-2 font-semibold text-slate-900 hover:text-brand"
                  >
                    {product.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-500">
                    {product.category?.name}
                  </p>
                  <p className="mt-2 font-bold text-slate-900">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center gap-2 rounded-xl border border-slate-200 p-1">
                    <button
                      type="button"
                      className="rounded-lg p-1.5 hover:bg-slate-50"
                      onClick={() =>
                        void updateQuantity(
                          productId,
                          Math.max(1, item.count - 1),
                        )
                      }
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.count}
                    </span>
                    <button
                      type="button"
                      className="rounded-lg p-1.5 hover:bg-slate-50"
                      onClick={() =>
                        void updateQuantity(productId, item.count + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => void removeFromCart(productId)}
                    className="inline-flex items-center gap-1 text-sm text-red-500 hover:underline"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Items</span>
              <span>{numOfCartItems}</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-base font-bold text-slate-900">
              <span>Total</span>
              <span>{formatPrice(cart.totalCartPrice)}</span>
            </div>
          </div>
          <Link href="/checkout" className="mt-6 block">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
          <Link
            href="/products"
            className="mt-3 block text-center text-sm font-medium text-brand hover:underline"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default function CartPage() {
  return (
    <ProtectedRoute>
      <CartContent />
    </ProtectedRoute>
  );
}
