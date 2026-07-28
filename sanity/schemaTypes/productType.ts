import {PackageIcon} from '@sanity/icons/Package'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        }),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price (NGN)',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare at Price (NGN)',
      description: 'Original price for showing a sale or discount',
      type: 'number',
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'productCategory'}],
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Show this product on the home page',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'specifications',
      title: 'Specifications',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'key',
              title: 'Key',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      price: 'price',
      inStock: 'inStock',
    },
    prepare({title, media, price, inStock}) {
      const stockLabel = inStock ? 'In Stock' : 'Out of Stock'
      return {
        title,
        subtitle: `₦${price?.toLocaleString() ?? '0'} · ${stockLabel}`,
        media,
      }
    },
  },
})
