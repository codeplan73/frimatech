# 0001. Home Page Redesign — Rationale

## Context

Frima Tech Solutions runs an ecommerce and repair services website built on Next.js 14 with Prisma and PostgreSQL. The current home page has four sections: a static hero image, a services grid, a product recommendations row, and a newsletter form. The design feels dated. The navbar is transparent until scroll. The footer has generic social links. There is no carousel, no SEO infrastructure beyond basic metadata, and no Sanity integration on the frontend despite Sanity schemas already being configured.

The business has expanded into COMPTIA certification training (A+, Network+, Security+) and IT support services. The website needs to reflect this broader offering. The owner wants a modern look that communicates three pillars: repairs and ecommerce, professional training, and IT support.

The Sanity CMS is installed with blog schemas (post, author, category) but the frontend still reads blog data from Prisma. No product schema exists in Sanity yet. The redesign is an opportunity to complete the Sanity migration for both blog and products.

This is the first spec in a phased redesign. Each page gets its own spec, built and approved sequentially starting with the home page (navbar, footer, hero, and all home page sections).

## Options considered

### Option 1: Refined brand with the existing palette (teal + beige), modern interactions

Keep the current brand colors (#345B58 dark teal and #E8D7BD beige) as the foundation. Add a teal to cyan gradient accent for hero overlays and badges. Use glassmorphism (subtle blurred backgrounds) on cards, smooth scroll triggered animations via Framer Motion, generous whitespace, and sharp Inter/Roboto typography. The navbar becomes a solid sticky teal bar. The hero gains an Embla Carousel with four auto playing slides. Static content (services, training cards, stats, testimonials) is hardcoded. Dynamic content (products, blog posts) comes from Sanity via ISR with 60 second revalidation. Full SEO: metadata, sitemap, robots.txt, JSON-LD structured data.

**Pros**:
- Builds on existing brand equity rather than starting from zero
- The teal and beige palette is distinctive and memorable
- Static sections mean fast page loads with no CMS dependency for the hero and services
- Embla Carousel is lightweight (4.5KB gzipped) and accessible
- Framer Motion is already a common shadcn/ui peer dependency

**Cons**:
- Requires installing Embla Carousel and Framer Motion (new dependencies)
- Sanity product schema and blog frontend wiring must be done before dynamic sections work
- Unsplash placeholder images need replacing with real photography later

### Option 2: Full dark tech theme with charcoal and vibrant accents

Abandon the current brand for a dark theme with deep charcoal backgrounds, vibrant neon like accent colors, and a futuristic AI/tech aesthetic.

**Pros**:
- Bold, modern, differentiates strongly from competitors
- Dark themes are trending in tech and AI focused brands

**Cons**:
- Discards existing brand recognition entirely
- Dark themes can harm readability for long form content (blog, training descriptions)
- Higher contrast requirements for accessibility
- More design tokens to create and maintain from scratch

### Option 3: All content in Sanity CMS

Put every piece of content (hero slides, services, training cards, stats, testimonials, products, blog posts) into Sanity for full client control without code changes.

**Pros**:
- Content team can change anything without a developer
- Single content source of truth

**Cons**:
- Hero slides and services change rarely; overhead of CMS management for static content is wasted
- More Sanity schema types to maintain
- More GROQ queries on every page load, slower builds
- The client does not have a dedicated content team; a developer deploys changes anyway

### Option 4: Keep products in Prisma, blog in Sanity

A hybrid where Sanity handles blog content but products stay in the existing Prisma and PostgreSQL database.

**Pros**:
- No product data migration needed
- Admin dashboard product CRUD still works unchanged

**Cons**:
- Two sources of truth for content (Prisma + Sanity) creates confusion
- The user explicitly asked to put products on Sanity
- The admin dashboard already exists for Prisma products; moving to Sanity simplifies the stack long term

## Rationale

Option 1 (refined brand) wins for three reasons. First, the existing teal and beige palette is genuinely distinctive in the Nigerian tech services market; discarding it loses brand equity the business has built. Second, the hybrid content strategy (static for rarely changed sections, Sanity for frequently updated blog and products) matches the actual operational pattern: a small team where a developer deploys most changes anyway, but blog posts and product listings need frequent non technical updates. Third, the tool choices (Embla Carousel for the hero, Framer Motion for animations, ISR for data fetching) are the boring, proven picks for a Next.js project: small bundles, good docs, well understood failure modes.

The dark theme (Option 2) was tempting for its modern feel but would harm readability for training content and blog posts. The all Sanity approach (Option 3) adds operational overhead with no proportional benefit for a team without a dedicated content editor. Keeping products in Prisma (Option 4) contradicts the explicit requirement to use Sanity for products.

Sanity was chosen as the content source for blog and products because it is already installed and configured. The existing blog Prisma queries become dead code once the frontend switches to Sanity; they can be removed in a follow up cleanup. The product schema on Sanity is new work and must be deployed before the home page can display featured products.

The SEO investment (full infrastructure) is sized to the business: a local services company that relies on Google discovery. Without structured data and a sitemap, product pages and blog posts are invisible to search. This is not a nice to have; it directly affects revenue.
