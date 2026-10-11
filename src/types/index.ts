export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface PaginationMeta {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

export interface ApiListResponse<T> {
  results: number;
  metadata?: PaginationMeta;
  data: T[];
}

export interface ApiItemResponse<T> {
  data: T;
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface CartProduct {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface CartResponse {
  status: string;
  message?: string;
  numOfCartItems: number;
  cartId?: string;
  data: CartData;
}

export interface WishlistResponse {
  status: string;
  count: number;
  data: Product[];
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface Order {
  _id: string;
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  user: User;
  cartItems: CartProduct[];
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface CheckoutSessionResponse {
  status: string;
  session: {
    url: string;
  };
}
