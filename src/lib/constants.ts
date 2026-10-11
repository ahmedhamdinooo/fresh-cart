export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ecommerce.routemisr.com/api/v1";
export const TOKEN_KEY = "freshcart_token";
export const USER_KEY = "freshcart_user";
export const APP_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
