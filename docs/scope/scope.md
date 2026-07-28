# Frima Tech Website Redesign

**Workflow**: Full

## At a glance

| Feature | Status | Spec |
|---|---|---|
| Home page redesign | in-progress | [0001](../specs/0001-home-page-redesign/index.md) |

---

## In progress

### Home page redesign `in-progress`

**Intent**: Redesign the public home page with a modern navbar, footer, Embla Carousel hero with 4 slides, and 8 content sections (services, featured products, latest blog posts, COMPTIA training highlights, stats counter, testimonials, newsletter CTA). Dynamic content from Sanity via ISR. Full SEO infrastructure.

**Done when**: All 14 acceptance criteria pass /check verify.

**Spec**: [0001](../specs/0001-home-page-redesign/index.md)
**Code**: `app/(public)/page.tsx`, `components/Navbar.tsx`, `components/Footer.tsx`, `components/home/*.tsx`, `sanity/schemaTypes/product*.ts`, `sanity/lib/queries.ts`

- [x] Design it (spec)
- [x] Build it: /develop home-page-redesign
  - [x] Foundation: Sanity schemas deployed, GROQ data helpers created, Embla and Framer Motion installed — satisfies AC-14, AC-5 (prep), AC-6 (prep)
  - [x] Layout shell: Navbar, Footer, and Hero carousel built and responsive — satisfies AC-1, AC-2, AC-3
  - [x] Static content sections: Services grid, Training highlights, Stats counter, Testimonials — satisfies AC-4, AC-7, AC-8, AC-9
  - [x] Dynamic content sections: Featured Products and Latest Blog Posts with loading, empty, and error states — satisfies AC-5, AC-6
  - [x] Assembly and SEO: Compose home page, newsletter section, responsive audit, SEO infrastructure — satisfies AC-10, AC-11, AC-12, AC-13
- [ ] Verify it: /check verify home-page-redesign
- [ ] Test it: /test home-page-redesign

---

## Deferred

_None yet._
