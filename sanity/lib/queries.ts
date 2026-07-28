import {client} from './client'

// Types matching the Sanity document shapes
export interface SanityProduct {
  _id: string
  name: string
  slug: {current: string}
  description: unknown[] | null
  price: number
  compareAtPrice: number | null
  images: Array<{
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }>
  category: {
    _id: string
    title: string
    slug: {current: string}
  } | null
  inStock: boolean
  featured: boolean
  specifications: Array<{key: string; value: string}> | null
  createdAt: string
}

export interface SanityBlogPost {
  _id: string
  title: string
  slug: {current: string}
  mainImage: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  } | null
  categories: Array<{
    _id: string
    title: string
    slug: {current: string}
  }> | null
  publishedAt: string
  body: unknown[] | null
  author: {
    _id: string
    name: string
    slug: {current: string}
    image: unknown | null
  } | null
}

/**
 * Fetch featured products from Sanity.
 * Returns up to 8 products where featured is true and in stock.
 */
export async function getFeaturedProducts(): Promise<SanityProduct[]> {
  try {
    return await client.fetch<SanityProduct[]>(
      `*[_type == "product" && featured == true && inStock == true][0...8] {
        _id,
        name,
        slug,
        price,
        compareAtPrice,
        "images": images[] {
          asset,
          alt
        },
        "category": category-> {
          _id,
          title,
          slug
        },
        inStock,
        featured,
        specifications,
        createdAt
      }`,
      {},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Failed to fetch featured products from Sanity:', error)
    return []
  }
}

/**
 * Fetch all in-stock products from Sanity, ordered by createdAt descending.
 * Used for the shop listing page.
 */
export async function getAllProducts(): Promise<SanityProduct[]> {
  try {
    return await client.fetch<SanityProduct[]>(
      `*[_type == "product" && inStock == true] | order(createdAt desc) {
        _id,
        name,
        slug,
        price,
        compareAtPrice,
        "images": images[] {
          asset,
          alt
        },
        "category": category-> {
          _id,
          title,
          slug
        },
        inStock,
        featured,
        specifications,
        createdAt
      }`,
      {},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Failed to fetch all products from Sanity:', error)
    return []
  }
}

/**
 * Fetch a single product by its slug.
 * Returns null when no product matches the slug.
 */
export async function getProductBySlug(slug: string): Promise<SanityProduct | null> {
  try {
    return await client.fetch<SanityProduct | null>(
      `*[_type == "product" && slug.current == $slug][0] {
        _id,
        name,
        slug,
        description,
        price,
        compareAtPrice,
        "images": images[] {
          asset,
          alt
        },
        "category": category-> {
          _id,
          title,
          slug
        },
        inStock,
        featured,
        specifications,
        createdAt
      }`,
      {slug},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Failed to fetch product by slug from Sanity:', error)
    return null
  }
}

/**
 * Fetch related products from the same category, excluding the current product.
 * Returns up to 4 products.
 */
export async function getRelatedProducts(
  categoryId: string,
  excludeSlug: string,
): Promise<SanityProduct[]> {
  try {
    return await client.fetch<SanityProduct[]>(
      `*[_type == "product" && category._ref == $categoryId && slug.current != $excludeSlug && inStock == true][0...4] {
        _id,
        name,
        slug,
        price,
        compareAtPrice,
        "images": images[] {
          asset,
          alt
        },
        "category": category-> {
          _id,
          title,
          slug
        },
        inStock,
        featured,
        createdAt
      }`,
      {categoryId, excludeSlug},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Failed to fetch related products from Sanity:', error)
    return []
  }
}

export interface SanityProductCategory {
  _id: string
  title: string
  slug: {current: string}
  description: string | null
}

/**
 * Fetch all product categories from Sanity.
 */
export async function getProductCategories(): Promise<SanityProductCategory[]> {
  try {
    return await client.fetch<SanityProductCategory[]>(
      `*[_type == "productCategory"] | order(title asc) {
        _id,
        title,
        slug,
        description
      }`,
      {},
      {next: {revalidate: 300}},
    )
  } catch (error) {
    console.error('Failed to fetch product categories from Sanity:', error)
    return []
  }
}

export interface SanityTraining {
  _id: string
  title: string
  slug: {current: string}
  description: unknown[] | null
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: string | null
  image: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  } | null
  googleFormUrl: string | null
  featured: boolean
  order: number
  createdAt: string
}

/**
 * Fetch training courses from Sanity, ordered by the display order field.
 * Falls back to an empty array on error.
 */
export async function getTrainingCourses(): Promise<SanityTraining[]> {
  try {
    return await client.fetch<SanityTraining[]>(
      `*[_type == "training"] | order(order asc) {
        _id,
        title,
        slug,
        description,
        level,
        duration,
        image {
          asset,
          alt
        },
        googleFormUrl,
        featured,
        order,
        createdAt
      }`,
      {},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Failed to fetch training courses from Sanity:', error)
    return []
  }
}

/**
 * Fetch a single training course by its slug.
 * Returns null when no course matches the slug.
 */
export async function getTrainingBySlug(slug: string): Promise<SanityTraining | null> {
  try {
    return await client.fetch<SanityTraining | null>(
      `*[_type == "training" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        description,
        level,
        duration,
        image {
          asset,
          alt
        },
        googleFormUrl,
        featured,
        order,
        createdAt
      }`,
      {slug},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Failed to fetch training course by slug from Sanity:', error)
    return null
  }
}

/**
 * Fetch the latest blog posts from Sanity.
 * Returns up to 4 posts ordered by publishedAt descending.
 */
export async function getLatestPosts(): Promise<SanityBlogPost[]> {
  try {
    return await client.fetch<SanityBlogPost[]>(
      `*[_type == "post"][0...4] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage {
          asset,
          alt
        },
        "categories": categories[]-> {
          _id,
          title,
          slug
        },
        publishedAt,
        "author": author-> {
          _id,
          name,
          slug,
          image
        }
      }`,
      {},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Failed to fetch latest posts from Sanity:', error)
    return []
  }
}

/**
 * Fetch all blog posts from Sanity, ordered by publishedAt descending.
 * Used for the blog listing page. No pagination cap; all posts are returned.
 */
export async function getAllPosts(): Promise<SanityBlogPost[]> {
  try {
    return await client.fetch<SanityBlogPost[]>(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage {
          asset,
          alt
        },
        "categories": categories[]-> {
          _id,
          title,
          slug
        },
        publishedAt,
        body,
        "author": author-> {
          _id,
          name,
          slug,
          image
        }
      }`,
      {},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Failed to fetch all posts from Sanity:', error)
    return []
  }
}

/**
 * Fetch a single blog post by its slug.
 * Returns null when no post matches the slug.
 */
export async function getPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  try {
    return await client.fetch<SanityBlogPost | null>(
      `*[_type == "post" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        mainImage {
          asset,
          alt
        },
        "categories": categories[]-> {
          _id,
          title,
          slug
        },
        publishedAt,
        body,
        "author": author-> {
          _id,
          name,
          slug,
          image
        }
      }`,
      {slug},
      {next: {revalidate: 60}},
    )
  } catch (error) {
    console.error('Failed to fetch post by slug from Sanity:', error)
    return null
  }
}
