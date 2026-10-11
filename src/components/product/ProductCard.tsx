"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const productId = product._id || product.id;
  const liked = isInWishlist(productId);
  const discount = getDiscountPercent(product.price, product.priceAfterDiscount);
  const displayPrice = product.priceAfterDiscount ?? product.price;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/10">
      {discount && (
        <span className="absolute left-3 top-3 z-10 rounded-lg bg-red-500 px-2 py-1 text-xs font-bold text-white">
          -{discount}%
        </span>
      )}

      <button
        type="button"
        onClick={() => void toggleWishlist(productId)}
        className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 text-slate-500 shadow-sm transition hover:text-red-500"
        aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart
          className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
        />
      </button>

      <Link href={`/products/${productId}`} className="block p-4 pb-2">
        <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-contain p-3 transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 px-4 pb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand">
          {product.category?.name}
        </p>
        <Link href={`/products/${productId}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold text-slate-900 transition hover:text-brand">
            {product.title}
          </h3>
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <p className="text-base font-bold text-slate-900">
              {formatPrice(displayPrice)}
            </p>
            {product.priceAfterDiscount && (
              <p className="text-xs text-slate-400 line-through">
                {formatPrice(product.price)}
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-amber-400" />
            <span className="font-medium text-slate-700">
              {product.ratingsAverage}
            </span>
            <span className="text-xs text-slate-400">
              ({product.ratingsQuantity})
            </span>
          </div>
        </div>

        <Button
          className="mt-2 w-full"
          onClick={() => void addToCart(productId)}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </article>
  );
}
