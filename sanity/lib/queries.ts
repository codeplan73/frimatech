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
