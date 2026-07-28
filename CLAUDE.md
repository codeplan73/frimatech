# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Frima Tech Solutions — an e-commerce platform for PC/laptop repairs, accessories, and swap deals. Built with Next.js 14 App Router, PostgreSQL (Neon), NextAuth v5, shadcn/ui + Tailwind CSS, and Prisma ORM. Includes a blog, product catalog, cart, orders, and an admin dashboard.

## Commands

```bash
npm run dev      # Start dev server (Next.js on port 3000)
npm run build    # Generate Prisma client, then build for production
npm run start    # Start production server
npm run lint     # Run ESLint (extends next/core-web-vitals)
```

No test runner is configured yet.

## Architecture

### Route Groups

- **`app/(public)/`** — Public-facing pages (home, shop, about, contact, cart, blog, auth). Uses `app/(public)/layout.tsx` with Navbar, Footer, SessionProvider, and QueryClientProvider.
- **`app/(protected)/`** — Authenticated pages (dashboard, products CRUD, orders, users, blog management, settings). Uses `app/(protected)/layout.tsx` with Sidebar, Navbar, and SessionProvider.

### Authentication

- **NextAuth v5** (`auth.ts`) with credentials provider and JWT sessions.
- **Middleware** (`middleware.ts`) gates routes based on `routes.ts`: public routes, auth routes, and API auth prefix (`/api/auth`). Unauthenticated users hitting non-public routes are redirected to `/auth/login`. Logged-in users on auth routes are redirected to `/dashboard`.
- Session is enriched with user profile fields (role, address, city, state, gender) via JWT callback that reads from the database.
- **Prisma Adapter** connects NextAuth to the PostgreSQL database.
- Zod schemas for login/register in `schema/index.ts` (`LoginSchema`, `RegisterSchema`).

### Database (Prisma + PostgreSQL)

- **Provider**: PostgreSQL, hosted on Neon. Connection string in `DATABASE_URL` env var.
- **Singleton pattern**: `lib/db.ts` exports a cached PrismaClient instance (avoids hot-reload connection leaks).
- **Models**: User (with roles ADMIN/USER/CLIENT), Product, Order, OrderItem, Category, Blog, Comment, Account, VerificationToken, PasswordResetToken.
- **Data access layer**: Functions in `data/` directory (`data/user.ts`, `data/account.ts`, `data/password-reset-token.ts`, `data/verificiation-token.ts`) encapsulate Prisma queries with try/catch returning null on error.

### State Management

- **Zustand** (`store/cartStore.ts`) — client-side cart with localStorage persistence. Actions: addToCart, reduceFromCart, removeFromCart, clearCart, plus computed `items()` and `total()`.
- **TanStack React Query** (`@tanstack/react-query`) — server state for products and blog posts via custom hooks in `hook/useProductHook.ts` and `hook/useBlogHook.ts`. Data fetched from API routes with `axios`.

### API Routes (Next.js Route Handlers)

All under `app/api/`:
- `auth/[...nextauth]/` — NextAuth handler
- `auth/login/`, `auth/register/` — credential auth endpoints
- `products/`, `products/[id]/` — CRUD for products
- `blog/`, `blog/[id]/` — CRUD for blog posts
- `category/`, `category/[id]/` — CRUD for categories
- `orders/`, `orders/[id]/` — order management
- `users/[id]/`, `users/password/[id]/` — user profile/ password updates
- `logout/` — sign out

Pattern: Zod validation via `schema/index.ts` → Prisma query via `lib/db` → JSON response.

### Validation

All schemas in `schema/index.ts` (Zod): `LoginSchema`, `RegisterSchema`, `ProductSchema`, `ProductUpdateSchema`, `CategorySchema`, `BlogSchema`, `CommentSchema`, `UserSchema`, `PasswordSchema`, `NewPasswordSchema`, `ResetSchema`, `UpdateStaffSchema`.

### UI Components

- **shadcn/ui** components in `components/ui/` (button, card, form, input, select, table, dialog, etc.). Configured via `components.json` with CSS variables.
- **Custom form fields** in `components/form-fields/` wrapping shadcn primitives with react-hook-form integration.
- **Custom components** in `components/` root: ProductCard, CartItem, BlogPostItem, BreadCrumNav, Newsletter, Skeleton, Spinner, ContactCard, page-banner, card-wrapper.
- **Domain-specific components** in subdirs: `components/home/`, `components/auth/`, `components/about/`, `components/table/`.
- Protected layout components in `app/(protected)/_components/`: Sidebar, Navbar, ImageUpload, Card, UserOrder.

### Styling

- **Tailwind CSS** with shadcn/ui CSS variables for theming (light/dark mode tokens in `app/globals.css`).
- Custom brand colors: `textPrimary: #E8D7BD`, `bgPrimary: #345B58`.
- Tailwind plugins: `tailwindcss-animate`, `@tailwindcss/typography`.
- `lib/utils.ts` exports `cn()` for merging Tailwind classes.

### Email

- `lib/mail.ts` — Nodemailer transport (Gmail SMTP) with Handlebars template compilation.
- `lib/resendMail.ts` — Alternative Resend API integration.
- Templates in `lib/templates/` (order confirmation, password reset).
- Server actions in `actions/` trigger emails for contact form, order confirmation, password reset.

### Images

- **Cloudinary** for hosting (`config/cloudinary.ts`). Next.js `next.config.mjs` allows Cloudinary remote patterns.
- `next-cloudinary` package for Next.js Cloudinary components.

### Payments

- **Paystack** integration (`react-paystack`). Keys configured via env vars (`PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY`).

## Key Conventions

- **Path alias**: `@/*` maps to project root (configured in `tsconfig.json`).
- **Server Components by default** — only opt into `"use client"` when needed (interactivity, hooks, browser APIs).
- **ESLint**: extends `next/core-web-vitals` only.
- **Package manager**: pnpm (has `pnpm-lock.yaml` and `pnpm-workspace.yaml`), though `package-lock.json` also exists from npm usage.
- **Environment variables**: `.env` file in project root (gitignored). Required: `AUTH_SECRET`, `DATABASE_URL`, Cloudinary keys, Paystack keys, SMTP credentials.
