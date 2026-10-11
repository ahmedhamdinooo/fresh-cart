"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EmptyState from "@/components/ui/EmptyState";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useAuth } from "@/contexts/AuthContext";
import { ordersApi } from "@/lib/api";
import { formatPrice, getUserIdFromToken } from "@/lib/utils";

function OrdersContent() {
  const { token } = useAuth();
  const userId = useMemo(
    () => (token ? getUserIdFromToken(token) : null),
    [token],
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => (await ordersApi.getUserOrders(userId!)).data,
    enabled: Boolean(userId),
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <p className="py-16 text-center text-red-500">Failed to load orders.</p>
      </div>
    );
  }

  const orders = [...(data || [])].reverse();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Orders</h1>
        <p className="mt-1 text-sm text-slate-500">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="When you place an order, it will show up here."
          actionLabel="Start shopping"
          actionHref="/products"
        />
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <article
              key={order._id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Order #{order.id}
                  </p>
                  <p className="text-xs text-slate-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-brand/10 px-3 py-1 text-brand">
                    {order.paymentMethodType}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 ${
                      order.isPaid
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Unpaid"}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 ${
                      order.isDelivered
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
              </div>

              <div className="space-y-3 p-5">
                {order.cartItems?.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                      <Image
                        src={item.product.imageCover}
                        alt={item.product.title}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900">
                        {item.product.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        Qty: {item.count} · {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 px-5 py-4 text-sm">
                <p className="text-slate-500">
                  {order.shippingAddress?.city} · {order.shippingAddress?.phone}
                </p>
                <p className="font-bold text-slate-900">
                  Total: {formatPrice(order.totalOrderPrice)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AllOrdersPage() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}
