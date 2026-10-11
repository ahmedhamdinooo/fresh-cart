# FreshCart — Next.js E-Commerce

Full e-commerce storefront built with **Next.js**, **TypeScript**, and **React**, powered by the [Route Academy E-Commerce API](https://ecommerce.routemisr.com/).

Live reference: [freshcart-route.vercel.app](https://freshcart-route.vercel.app/)  
API docs: [Postman Documentation](https://documenter.getpostman.com/view/5709532/2s93JqTRWN)

## Features

- Home with hero slider, categories, featured products, and brands
- Products listing with search, category/brand filters, sort, and pagination
- Product details with image gallery, cart & wishlist actions
- Categories & Brands browse + filtered product pages
- Auth: login, register, forgot/reset password (JWT via `token` header)
- Cart: add, update quantity, remove, clear
- Wishlist: add / remove favorites
- Checkout: cash on delivery + Stripe online payment
- Orders history (`/allorders`)
- Protected routes for cart, wishlist, checkout, and orders
- Responsive UI with FreshCart green branding

## Tech Stack

- Next.js App Router + TypeScript
- Tailwind CSS v4
- TanStack React Query
- Axios
- React Hook Form + Zod
- Swiper
- Lucide icons
- React Hot Toast

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## API

Base URL: `https://ecommerce.routemisr.com/api/v1`

Protected endpoints require a `token` header (not `Authorization: Bearer`). The JWT is stored in `localStorage` under `freshcart_token`.

## Project Structure

```
src/
  app/           # Pages (App Router)
  components/    # UI, layout, product, home, auth
  contexts/      # Auth, Cart, Wishlist
  lib/           # Axios client, API helpers, utils
  types/         # Shared TypeScript types
```
