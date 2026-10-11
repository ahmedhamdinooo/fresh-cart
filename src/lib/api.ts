import { api } from "./axios";
import type {
  ApiItemResponse,
  ApiListResponse,
  AuthResponse,
  Brand,
  CartResponse,
  Category,
  CheckoutSessionResponse,
  Order,
  Product,
  ShippingAddress,
  WishlistResponse,
} from "@/types";

export interface ProductQuery {
  page?: number;
  limit?: number;
  keyword?: string;
  category?: string;
  brand?: string;
  sort?: string;
  "price[gte]"?: number;
  "price[lte]"?: number;
  "category[in]"?: string;
}

export const authApi = {
  signup: (body: {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
  }) => api.post<AuthResponse>("/auth/signup", body),

  signin: (body: { email: string; password: string }) =>
    api.post<AuthResponse>("/auth/signin", body),

  forgotPassword: (email: string) =>
    api.post<{ statusMsg: string; message: string }>("/auth/forgotPasswords", {
      email,
    }),

  verifyResetCode: (resetCode: string) =>
    api.post<{ status: string }>("/auth/verifyResetCode", { resetCode }),

  resetPassword: (body: { email: string; newPassword: string }) =>
    api.put<{ message: string; token: string }>("/auth/resetPassword", body),
};

export const productsApi = {
  getAll: (params?: ProductQuery) => {
    const query: Record<string, string | number> = {};
    if (params?.page) query.page = params.page;
    if (params?.limit) query.limit = params.limit;
    if (params?.keyword) query.keyword = params.keyword;
    if (params?.brand) query.brand = params.brand;
    if (params?.sort) query.sort = params.sort;
    if (params?.["price[gte]"] != null) query["price[gte]"] = params["price[gte]"];
    if (params?.["price[lte]"] != null) query["price[lte]"] = params["price[lte]"];
    if (params?.category) query["category[in]"] = params.category;
    if (params?.["category[in]"]) query["category[in]"] = params["category[in]"];

    return api.get<ApiListResponse<Product>>("/products", { params: query });
  },

  getById: (id: string) =>
    api.get<ApiItemResponse<Product>>(`/products/${id}`),
};

export const categoriesApi = {
  getAll: () => api.get<ApiListResponse<Category>>("/categories"),

  getById: (id: string) =>
    api.get<ApiItemResponse<Category>>(`/categories/${id}`),
};

export const brandsApi = {
  getAll: () => api.get<ApiListResponse<Brand>>("/brands"),

  getById: (id: string) => api.get<ApiItemResponse<Brand>>(`/brands/${id}`),
};

export const cartApi = {
  get: () => api.get<CartResponse>("/cart"),

  add: (productId: string) =>
    api.post<CartResponse>("/cart", { productId }),

  update: (productId: string, count: number) =>
    api.put<CartResponse>(`/cart/${productId}`, { count }),

  remove: (productId: string) =>
    api.delete<CartResponse>(`/cart/${productId}`),

  clear: () => api.delete<{ message: string }>("/cart"),
};

export const wishlistApi = {
  get: () => api.get<WishlistResponse>("/wishlist"),

  add: (productId: string) =>
    api.post<{ status: string; message: string; data: string[] }>(
      "/wishlist",
      { productId },
    ),

  remove: (productId: string) =>
    api.delete<{ status: string; message: string; data: string[] }>(
      `/wishlist/${productId}`,
    ),
};

export const ordersApi = {
  cash: (cartId: string, shippingAddress: ShippingAddress) =>
    api.post<{ status: string; data: Order }>(`/orders/${cartId}`, {
      shippingAddress,
    }),

  checkoutSession: (
    cartId: string,
    url: string,
    shippingAddress: ShippingAddress,
  ) =>
    api.post<CheckoutSessionResponse>(
      `/orders/checkout-session/${cartId}?url=${url}`,
      { shippingAddress },
    ),

  getUserOrders: (userId: string) =>
    api.get<Order[]>(`/orders/user/${userId}`),
};
