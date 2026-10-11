"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { productsApi } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice, getDiscountPercent } from "@/lib/utils";
import Button from "@/components/ui/Button";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => (await productsApi.getById(id)).data.data,
    enabled: Boolean(id),
  });

  if (isLoading) return <LoadingSpinner />;
  if (isError || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-red-500">Product not found.</p>
        <Link href="/products" className="mt-4 inline-block text-brand hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  const productId = product._id || product.id;
  const images = [product.imageCover, ...(product.images || [])].filter(
    (img, i, arr) => arr.indexOf(img) === i,
  );
  const discount = getDiscountPercent(product.price, product.priceAfterDiscount);
  const displayPrice = product.priceAfterDiscount ?? product.price;
  const liked = isInWishlist(productId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-100 bg-white">
            <Image
              src={images[activeImage]}
              alt={product.title}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-contain p-6"
            />
            {discount && (
              <span className="absolute left-4 top-4 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-bold text-white">
                -{discount}%
              </span>
            )}
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {images.map((img, index) => (
              <button
                key={img}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${
                  activeImage === index
                    ? "border-brand"
                    : "border-slate-100 hover:border-slate-300"
                }`}
              >
                <Image src={img} alt="" fill className="object-contain p-1" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand">
            {product.category?.name}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            {product.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-400" />
              <span className="font-semibold text-slate-800">
                {product.ratingsAverage}
              </span>
              <span className="text-slate-400">
                ({product.ratingsQuantity} reviews)
              </span>
            </div>
            {product.brand && (
              <Link
                href={`/brands/${product.brand._id}`}
                className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700 hover:bg-brand/10 hover:text-brand"
              >
                {product.brand.name}
              </Link>
            )}
            <span className="text-slate-500">{product.sold} sold</span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <p className="text-3xl font-bold text-slate-900">
              {formatPrice(displayPrice)}
            </p>
            {product.priceAfterDiscount && (
              <p className="pb-1 text-lg text-slate-400 line-through">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-slate-600">
            {product.description}
          </p>

          <p className="mt-4 text-sm text-slate-500">
            Availability:{" "}
            <span
              className={
                product.quantity > 0
                  ? "font-semibold text-brand"
                  : "font-semibold text-red-500"
              }
            >
              {product.quantity > 0
                ? `${product.quantity} in stock`
                : "Out of stock"}
            </span>
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              className="min-w-[180px]"
              onClick={() => void addToCart(productId)}
              disabled={product.quantity <= 0}
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>
            <Button
              variant="outline"
              onClick={() => void toggleWishlist(productId)}
            >
              <Heart
                className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`}
              />
              {liked ? "Wishlisted" : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
