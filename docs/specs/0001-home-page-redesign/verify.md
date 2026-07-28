# Verify: Home Page Redesign · spec 0001 · updated 2026-07-27
_Steps derived from spec 0001 acceptance criteria. `/check verify` runs these; `/test` locks the durable ones._

## UI / manual

- [ ] Visit `/` → Hero carousel auto-plays 4 slides, dots and arrows work, pause on hover works → AC-1
- [ ] Resize to 375px width → No horizontal overflow, hamburger menu opens/closes, carousel swipes with touch, all sections stack vertically, touch targets at least 44×44px → AC-12
- [ ] Click "Get a Quote" button in navbar → navigates to /contact → AC-2
- [ ] Navbar shows Training link in the desktop nav → AC-2
- [ ] Log in as a regular user → Navbar shows user name dropdown with My Orders, Settings, Logout (no Dashboard link) → AC-2
- [ ] Log in as an admin user → Navbar shows user name dropdown with Dashboard, My Orders, Settings, Logout → AC-2
- [ ] Log out → Navbar shows Login link → AC-2
- [ ] Add product to cart from featured products grid → Cart icon badge updates with count → AC-5
- [ ] Footer shows company description, Quick Links, Get In Touch with phone/email/address, social icons, newsletter form, copyright bar with current year → AC-3
- [ ] Services grid shows 6 cards with icons, titles, descriptions. Responsive: 3 cols desktop, 2 tablet, 1 mobile → AC-4
- [ ] Training section shows 3 COMPTIA cards (A+, Network+, Security+) with level badge and description → AC-7
- [ ] Stats counter section shows 4 stats with numbers animating on scroll → AC-8
- [ ] Testimonials section shows 3 to 5 quote cards → AC-9
- [ ] When Sanity has no featured products → Empty state message with link to /shop appears → AC-5
- [ ] When Sanity has no blog posts → Empty state message appears → AC-6
- [ ] When Sanity is unreachable → Static sections (hero, services, training, stats, testimonials, newsletter, footer, navbar) all render. Product and blog sections are hidden gracefully → AC-13
- [ ] While Sanity data loads → Skeleton cards visible in products and blog sections → AC-5, AC-6
- [ ] Enter valid email in newsletter form (both in section and in footer) → click Subscribe → Loading spinner appears → Success toast shown → AC-10
- [ ] Enter invalid email → click Subscribe → Error toast shown → AC-10

## Commands

- [ ] `curl -s https://www.frimatechnology.com/robots.txt` → returns robots.txt with Allow, Disallow, and Sitemap directives → AC-11
- [ ] `curl -s https://www.frimatechnology.com/sitemap.xml` → returns XML sitemap with all public page URLs → AC-11

## Browser dev tools

- [ ] View page source → `<script type="application/ld+json">` contains Organization and WebSite structured data → AC-11
- [ ] View page source → Semantic HTML5 landmarks present: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>` → AC-11
- [ ] Lighthouse audit → CLS score is 0.1 or below (aspect ratio containers prevent layout shift) → AC-13
- [ ] OpenGraph debugger (or view source) → `og:title`, `og:description`, `og:image`, `og:type`, `og:url` meta tags present → AC-11
- [ ] Twitter card validator → `twitter:card` set to `summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` present → AC-11
- [ ] `rel="canonical"` link tag present in `<head>` pointing to `https://www.frimatechnology.com` → AC-11

## Sanity Studio

- [ ] Open /studio → Product and ProductCategory document types appear in the sidebar under Shop section → AC-14
- [ ] Create a product in Studio with featured=true and inStock=true → Product appears on home page featured products grid after cache refresh (60s) → AC-5, AC-14
- [ ] Create a blog post in Studio → Post appears on home page latest blog posts section after cache refresh (60s) → AC-6

## Acceptance-criteria coverage

- AC-1 covered by UI step: Hero carousel auto-play, dots, arrows, pause on hover
- AC-2 covered by UI steps: Navbar links, CTA, auth states, cart badge
- AC-3 covered by UI step: Footer all sections
- AC-4 covered by UI step: Services grid
- AC-5 covered by UI steps: Featured products with empty state, skeletons; Sanity Studio step: create product
- AC-6 covered by UI steps: Blog posts with empty state; Sanity Studio step: create post
- AC-7 covered by UI step: Training highlights
- AC-8 covered by UI step: Stats counter animation
- AC-9 covered by UI step: Testimonials
- AC-10 covered by UI steps: Newsletter form
- AC-11 covered by Commands + Browser dev tools steps: robots, sitemap, JSON-LD, OG, Twitter, canonical, semantic HTML
- AC-12 covered by UI step: Mobile responsive at 375px
- AC-13 covered by UI steps: Graceful degradation, skeletons, CLS check
- AC-14 covered by Sanity Studio steps: schemas in sidebar, create product
