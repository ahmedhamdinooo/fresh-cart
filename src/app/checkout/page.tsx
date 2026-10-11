"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import EmptyState from "@/components/ui/EmptyState";
import { useCart } from "@/contexts/CartContext";
import { ordersApi } from "@/lib/api";
import { formatPrice } from "@/lib/utils";

const schema = z.object({
  details: z.string().min(5, "Address details are required"),
  phone: z
    .string()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number"),
  city: z.string().min(2, "City is required"),
});

type FormValues = z.infer<typeof schema>;

function CheckoutContent() {
  const router = useRouter();
  const { cart, cartId, numOfCartItems, refreshCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  if (!cart?.products?.length || !cartId) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <EmptyState
          title="Nothing to checkout"
          description="Add products to your cart first."
          actionLabel="Go to cart"
          actionHref="/cart"
        />
      </div>
    );
  }

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      if (paymentMethod === "cash") {
        await ordersApi.cash(cartId, values);
        toast.success("Order placed successfully!");
        await refreshCart();
        router.push("/allorders");
      } else {
        const url = window.location.origin;
        const { data } = await ordersApi.checkoutSession(cartId, url, values);
        window.location.href = data.session.url;
      }
    } catch {
      toast.error("Checkout failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-2xl border border-slate-100 bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-slate-900">
            Shipping Address
          </h2>

          <Input
            id="details"
            label="Address Details"
            placeholder="Street, building, apartment..."
            error={errors.details?.message}
            {...register("details")}
          />
          <Input
            id="phone"
            label="Phone"
            placeholder="01xxxxxxxxx"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            id="city"
            label="City"
            placeholder="Cairo"
            error={errors.city?.message}
            {...register("city")}
          />

          <div>
            <p className="mb-3 text-sm font-medium text-slate-700">
              Payment Method
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("cash")}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  paymentMethod === "cash"
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                Cash on Delivery
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                  paymentMethod === "card"
                    ? "border-brand bg-brand/5 text-brand"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                Online Payment
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full" isLoading={submitting}>
            {paymentMethod === "cash" ? "Place Order" : "Pay Online"}
          </Button>
        </form>

        <aside className="h-fit rounded-2xl border border-slate-100 bg-white p-6">
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
        </aside>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <CheckoutContent />
    </ProtectedRoute>
  );
}
