import { clsx, type ClassValue } from "clsx";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPrice(price: number) {
  return `${price.toLocaleString("en-EG")} EGP`;
}

export function getDiscountPercent(price: number, priceAfter?: number) {
  if (!priceAfter || priceAfter >= price) return null;
  return Math.round(((price - priceAfter) / price) * 100);
}

export function getUserIdFromToken(token: string): string | null {
  try {
    const decoded = jwtDecode<{ id: string }>(token);
    return decoded.id;
  } catch {
    return null;
  }
}
