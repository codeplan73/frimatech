# 0001. Home Page Redesign

**Date**: 2026-07-27
**Status**: In Progress

## Summary

Redesign the Frima Tech public home page with a modern navbar, footer, hero carousel, and eight content sections. The visual direction refines the existing teal (#345B58) and beige (#E8D7BD) brand with gradient accents, glassmorphism, and scroll triggered animations. Dynamic content (featured products, latest blog posts) is fetched from Sanity CMS via ISR. Static content (hero slides, services, training cards, stats, testimonials) is hardcoded. Full SEO infrastructure (metadata, sitemap, robots.txt, JSON-LD structured data) is added. This is the first spec in a phased website redesign.

## Requirements

**User stories**:

- As a visitor, I want to immediately understand what Frima Tech offers (repairs, training, shop, IT support) so that I can find the service I need.
- As a potential student, I want to see available COMPTIA certification courses so that I can decide to enroll.
- As a shopper, I want to browse featured products on the home page so that I can quickly find accessories or parts.
- As a reader, I want to see the latest blog posts so that I can stay informed about tech tips and company news.
- As a business owner, I want the site to rank high in Google so that local customers can find my services.

**Acceptance criteria** (the contract /develop builds to and /check verify checks):

- **AC-1**: The hero section displays an auto playing carousel with 4 slides (Repairs, Training, IT Support, Accessories). Auto advance at 5000ms, pause on hover, dot indicators, left/right arrows, infinite loop. Each slide has a background image, dark overlay with teal to cyan gradient, heading, subtitle, and a CTA button linking to the relevant page. Mobile supports swipe navigation.

- **AC-2**: The navbar is a solid sticky bar with teal (#345B58) background. Desktop shows links (Home, Shop, Blog, Training, About, Contact), a "Get a Quote" CTA button linking to /contact, and a cart icon with item count from Zustand. Mobile shows a hamburger menu with slide in navigation. Authenticated users see a dropdown (My Orders, Settings, Logout). Admin users additionally see a Dashboard link. Unauthenticated users see a Login link.

- **AC-3**: The footer contains a company description paragraph, a Quick Links column (Training, Repairs, Blog, Shop, About, Contact), a Get In Touch column with real contact details, social media icons linking to real Frima Tech profiles, a newsletter signup form (email input + subscribe button), and a copyright bar showing "© 2022–{currentYear} Frima Technology. All rights reserved."

- **AC-4**: A services grid displays 6 cards (Computer Repair, COMPTIA Training, IT Support, Networking, Sales, Custom Solutions). Each card has a lucide-react icon, title, and short description. Cards link to relevant pages. The grid is responsive: 3 columns desktop, 2 tablet, 1 mobile.

- **AC-5**: A featured products section fetches 4 to 8 products from Sanity where `featured: true`. While loading, 8 skeleton cards are shown. If no products exist, a friendly empty state message appears with a link to /shop. If the Sanity fetch fails, the section hides gracefully. Each product card shows the image, product name, price in NGN, and an Add to Cart button. Grid: 4 columns desktop, 2 tablet, 1 mobile.

- **AC-6**: A latest blog posts section fetches 3 to 4 posts from Sanity ordered by `publishedAt` descending. While loading, 3 skeleton cards are shown. If no posts exist, a friendly empty state appears. If the Sanity fetch fails, the section hides gracefully. Each card shows the cover image, category tag, title, excerpt (first 150 characters of body text), published date, and a Read More link to /blog/[slug].

- **AC-7**: A training highlights section displays 3 certification cards for COMPTIA A+, Network+, and Security+. Each card has a COMPTIA badge or icon, course name, level label (Beginner or Intermediate), a short description, and a "Learn More" CTA linking to /training. Responsive: 3 columns desktop, stacked on mobile.

- **AC-8**: A stats counter section displays 4 animated counters: "500+ Repairs Completed", "200+ Students Trained", "50+ Corporate Clients", "15+ Years Experience". Numbers animate from 0 to target on scroll into view using Framer Motion. Responsive: 4 columns desktop, 2 tablet, 1 mobile.

- **AC-9**: A testimonials section displays 3 to 5 customer quotes with the quote text, customer name, and role or company. Displayed as a rotating carousel or static grid.

- **AC-10**: A newsletter CTA section has a heading, subtext, an email input with client side email format validation, and a subscribe button. The button shows a loading spinner while submitting. On success, a toast message confirms the subscription. On failure, a toast shows the error. Posts to the newsletter API endpoint.

- **AC-11**: The page exports proper Next.js metadata (title, description, keywords), OpenGraph metadata (title, description, type, URL, 1200×630 image), and a Twitter summary_large_image card. JSON-LD structured data includes Organization (name, URL, logo, contactPoint, sameAs) and WebSite (name, URL, SearchAction). The page uses semantic HTML5 landmarks (header, main, nav, section, article, footer). The project gains a robots.ts and a dynamic sitemap.ts.

- **AC-12**: All sections stack vertically on mobile without horizontal overflow at 320px width. The carousel supports touch swipe. The hamburger menu works on small screens. Text sizes scale down appropriately. All interactive elements have touch targets of at least 44×44px.

- **AC-13**: Cumulative Layout Shift is prevented by using aspect ratio containers on all images (next/image with fill and sizes). Static sections render immediately. Dynamic sections show skeleton placeholders, not blank space. If the Sanity fetch fails, static sections still render. ISR revalidation is set to 60 seconds.

- **AC-14**: The Sanity product schema (product document type with name, slug, description, price, compareAtPrice, images, category reference, inStock, featured, specifications, createdAt) and productCategory schema are deployed to the Sanity project. The Sanity Studio sidebar is updated to show Products and Categories. The existing blog schemas remain unchanged.

## Decision

**Chosen option**: Option 1: Refined brand with the existing palette (teal + beige), modern interactions

Redesign the home page with the current brand colors refined through modern UI patterns (gradient accents, glassmorphism, scroll animations), an Embla Carousel hero, hybrid content (static sections plus Sanity for dynamic data), ISR data fetching, and full SEO infrastructure.

**Implementation skills**: `sanity-best-practices` (sanity-io/sanity, `.claude/skills/sanity-best-practices/`) · `vercel-react-best-practices` (vercel/vercel, `.claude/skills/vercel-react-best-practices/`) · `frontend-design` (anthropic/claude-code, `.claude/skills/frontend-design/`)

## Feature design

**Data model sketch**:

Sanity documents (new, to deploy):

```
product {
  _id: string (auto)
  name: string (required)
  slug: { current: string } (required, unique)
  description: portable text
  price: number (required, stored in kobo or lowest currency unit)
  compareAtPrice: number (optional, for sale pricing)
  images: array of { asset: image, alt: string } (required, min 1)
  category: reference → productCategory
  inStock: boolean (default true)
  featured: boolean (default false)
  specifications: array of { key: string, value: string }
  createdAt: datetime (auto)
}

productCategory {
  _id: string (auto)
  title: string (required)
  slug: { current: string } (required, unique)
  description: text
  image: { asset: image, alt: string }
}
```

Static content types (TypeScript, hardcoded):

```
HeroSlide {
  image: string           // Unsplash URL
  imageAlt: string
  heading: string
  subtitle: string
  ctaText: string
  ctaLink: string         // e.g. "/shop", "/training", "/contact"
}

Service {
  icon: LucideIcon        // from lucide-react
  title: string
  description: string
  link: string
}

TrainingCard {
  badgeIcon: LucideIcon
  certificationName: string  // "COMPTIA A+", etc.
  level: "Beginner" | "Intermediate" | "Advanced"
  description: string
}

Stat {
  value: number           // final count, e.g. 500
  suffix: string          // "+" or "%"
  label: string           // "Repairs Completed"
}

Testimonial {
  quote: string
  name: string
  role: string
}
```

**API surface**:

| Query / Endpoint | Method | Source | Key inputs | Key outputs | Auth | Key errors |
|---|---|---|---|---|---|---|
| Featured products (GROQ) | read | Sanity CDN | `filter: featured == true`, `limit: 8` | Array of product objects | none | Sanity unavailable → hide section |
| Latest blog posts (GROQ) | read | Sanity CDN | `order: publishedAt desc`, `limit: 4` | Array of post objects | none | Sanity unavailable → hide section |
| Newsletter subscribe | POST | `/api/newsletter` (new) | `{ email: string }` | `{ success: true }` or error | none | 400 invalid email, 500 server error |

**Value sourcing**:

| Action | Value produced / displayed | Source |
|---|---|---|
| Render hero slide | Background image URL | Hardcoded TypeScript config array |
| Render hero slide | Heading, subtitle, CTA text | Hardcoded TypeScript config array |
| Render services grid | Icon, title, description, link | Hardcoded TypeScript config array |
| Render featured products | Product name, price, image, slug | Sanity product document |
| Render featured products | Add to Cart action | Zustand cartStore.addToCart(product) |
| Render blog posts | Post title, excerpt, date, slug, cover image | Sanity post document |
| Render blog posts | Excerpt text | First 150 characters of body Portable Text, stripped of markup |
| Render training cards | Certification name, level, description | Hardcoded TypeScript config array |
| Render stats counter | Target value, suffix, label | Hardcoded TypeScript config array |
| Render stats animation | Animated count from 0 to target | Framer Motion useInView + useMotionValue |
| Render testimonials | Quote, name, role | Hardcoded TypeScript config array |
| Render newsletter form | Validation rules | Client side: zod email schema |
| Submit newsletter | Email value | Form input state (client component) |
| Render page metadata | Title, description, keywords | Hardcoded metadata export in page.tsx |
| Render JSON-LD | Organization name, URL, logo, contact | Hardcoded config object |
| Render cart count in navbar | Number of items | Zustand cartStore.items() |
| Render auth state in navbar | User name, role, avatar | NextAuth useSession() hook |
| Format product price | NGN formatted price string | Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }) |

**Key invariants**:

- Product prices are always displayed in NGN format using the browser's Intl API
- The hero carousel must have exactly 4 slides (the section layout depends on it)
- Featured products query returns at most 8 items; the grid is capped
- Blog posts query returns at most 4 items; the section is capped
- All Sanity queries use the CDN (`useCdn: true`) for speed; stale data for up to 60 seconds is acceptable
- The newsletter email must pass zod email validation before the API call is made

**Security model**:

- All home page content is public; no authentication is required to view any section
- The Add to Cart button modifies the client side Zustand store only; no server request is made until checkout
- The newsletter form validates email format client side before POSTing; the API endpoint does not expose whether an email is already subscribed (same response for new and existing)
- No PII is stored or displayed on the home page beyond what the user voluntarily enters in the newsletter form

**Configuration required**:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: already set, used by Sanity client
- `NEXT_PUBLIC_SANITY_DATASET`: already set, used by Sanity client
- `NEXT_PUBLIC_SANITY_API_VERSION`: already set, used by Sanity client
- No new environment variables are needed for the home page itself
- The newsletter API endpoint needs the existing email infrastructure (Resend or Nodemailer SMTP credentials already configured)

**Critical test scenarios** (each maps to an acceptance criterion in Requirements):

- Happy path: A visitor loads the home page. The hero carousel begins auto playing. All static sections render immediately. Featured products and blog posts load within the skeleton placeholder time, then display. The visitor can click any CTA, add a product to cart, and see the cart count update in the navbar. Verifies **AC-1**, **AC-2**, **AC-4**, **AC-5**, **AC-6**, **AC-7**, **AC-8**, **AC-9**.

- Mobile experience: A visitor loads the home page on a 375px wide phone. No horizontal scroll appears. The hamburger menu opens and closes. The carousel swipes with touch. All sections stack vertically and remain readable. Touch targets are easy to tap. Verifies **AC-12**.

- Loading and empty states: When Sanity has no featured products, the products section shows the empty state message with a link to /shop. When Sanity has no blog posts, the blog section shows its empty state. While data loads, skeleton cards are visible. Verifies **AC-5**, **AC-6**.

- Graceful degradation: The Sanity CDN is unreachable. The home page still renders the hero, services, training, stats, testimonials, and footer. The products and blog sections are hidden (not broken, not blank with a spinner). The newsletter form still works. Verifies **AC-13**.

- Newsletter submit: A visitor enters a valid email and clicks subscribe. The button shows a spinner. The API returns success. A toast confirms the subscription. The input is cleared. Verifies **AC-10**.

## Build plan

The project uses the Tracer Bullet build approach (default, inferred from no recorded approach). For this spec, Tracer Bullet means standing up a thin end to end slice first (Sanity schemas → one data driven section working), then adding the remaining sections.

1. Deploy Sanity product and productCategory schemas. Update the Studio sidebar structure to show Products and Categories. Verify schemas appear in the Sanity Studio. Satisfies **AC-14**.

2. Create the Sanity data fetching layer: GROQ query helper functions for `getFeaturedProducts()` and `getLatestPosts()`. Configure ISR revalidation (60s). Satisfies **AC-5**, **AC-6**, **AC-13**.

3. Redesign the Navbar component: solid sticky teal bar, Training link, Get a Quote CTA button, cart icon with count, auth state dropdown, mobile hamburger menu. Move from `app/(public)/Navbar.tsx` to `components/Navbar.tsx`. Satisfies **AC-2**.

4. Redesign the Footer component: company description, Quick Links, Get In Touch with real contact info, real social links, newsletter signup form, copyright bar. Move from `app/(public)/Footer.tsx` to `components/Footer.tsx`. Satisfies **AC-3**.

5. Install Embla Carousel (`embla-carousel-react`, `embla-carousel-autoplay`). Build the Hero carousel component: 4 auto playing slides with Unsplash backgrounds, gradient overlays, dot indicators, arrows, pause on hover, infinite loop, mobile swipe. Satisfies **AC-1**.

6. Build the Services grid section with 6 service cards using lucide-react icons. Satisfies **AC-4**.

7. Build the Featured Products section: GROQ query via the helper, product card grid, skeleton loading state, empty state, graceful degradation on fetch failure. Add to Cart button wired to Zustand. Satisfies **AC-5**.

8. Build the Latest Blog Posts section: GROQ query via the helper, blog card grid, skeleton loading state, empty state, graceful degradation. Satisfies **AC-6**.

9. Build the Training Highlights section: 3 COMPTIA certification cards with icons, levels, descriptions, and CTAs linking to /training. Satisfies **AC-7**.

10. Build the Stats Counter section: Framer Motion animated counters triggering on scroll into view. Satisfies **AC-8**.

11. Build the Testimonials section: rotating or static testimonial cards. Satisfies **AC-9**.

12. Build the Newsletter CTA section: email input with zod validation, submit handler posting to /api/newsletter, loading spinner, success and error toasts via existing ToastContainer. Create the /api/newsletter route handler if it does not already exist. Satisfies **AC-10**.

13. Assemble the new home page (`app/(public)/page.tsx`): compose all sections in order. Export generateMetadata() with title, description, keywords, OpenGraph, and Twitter card. Add JSON-LD structured data (Organization, WebSite). Use semantic HTML5 landmarks. Set `revalidate = 60`. Satisfies **AC-1** through **AC-11**, **AC-13**.

14. Responsive audit pass: test every section at 320px, 375px, 768px, 1024px, and 1440px widths. Fix any horizontal overflow, text sizing, or touch target issues. Satisfies **AC-12**.

15. SEO infrastructure: create `app/robots.ts`, `app/sitemap.ts`. Verify metadata, JSON-LD, and semantic HTML on the rendered page. Satisfies **AC-11**.

## Consequences

**Positive**:

- The home page now communicates all three business pillars (repairs, training, shop) within the first scroll
- SEO infrastructure (sitemap, robots, JSON-LD, metadata) makes the site discoverable in Google for local service searches
- Sanity becomes the single content source for blog and products, simplifying the stack
- Embla Carousel is accessible by default (keyboard navigation, reduced motion support)
- Phone number, address, and email are visible in the footer on every page

**Negative / tradeoffs**:

- Embla Carousel and Framer Motion add two new npm dependencies
- The blog Prisma table becomes dead weight once the frontend switches to Sanity; cleanup is deferred
- Unsplash placeholder images must be replaced with real photography before the site feels authentic
- The newsletter API endpoint needs to be built or wired to the existing email system

**Neutral**:

- Static content (hero slides, services, training, stats, testimonials) requires a code deploy to change. This matches the current operational pattern where a developer handles all site updates.
- The existing Prisma based blog admin dashboard may show stale data after the frontend switches to Sanity. The admin dashboard is out of scope for this spec.

## Follow-up

- [ ] Replace Unsplash hero background images with real Frima Tech photography before launch
- [ ] Provide real social media profile URLs for the footer (Instagram, Twitter/X, Facebook, YouTube, LinkedIn)
- [ ] Wire the blog pages (`/blog`, `/blog/[slug]`) to fetch from Sanity instead of Prisma (covered by a future spec)
- [ ] Wire the shop pages (`/shop`, `/shop/[id]`) to fetch products from Sanity instead of Prisma (covered by a future spec)
- [ ] Create the `/training` page to match the Training Highlights section CTAs (covered by a future spec)
- [ ] Clean up dead Prisma blog queries after confirming Sanity blog integration is stable

## Rationale

Reasoning and options: see [rationale.md](rationale.md)
