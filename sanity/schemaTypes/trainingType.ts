import {RocketIcon} from '@sanity/icons/Rocket'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const trainingType = defineType({
  name: 'training',
  title: 'Training Course',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
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
      name: 'level',
      title: 'Level',
      type: 'string',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'e.g. "8 weeks", "3 months", "40 hours"',
    }),
    defineField({
      name: 'image',
      title: 'Course Image',
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
    defineField({
      name: 'googleFormUrl',
      title: 'Google Form URL',
      type: 'url',
      description:
        'Link to the Google Form for registration or enrollment. Leave empty if registration is not yet open.',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      description: 'Show this course on the home page training highlights section',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 10,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {title: 'Display Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
    {title: 'Created Date', name: 'createdAtDesc', by: [{field: 'createdAt', direction: 'desc'}]},
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'level',
      media: 'image',
    },
    prepare({title, subtitle, media}) {
      return {
        title,
        subtitle: subtitle ? `${subtitle.charAt(0).toUpperCase() + subtitle.slice(1)}` : '',
        media,
      }
    },
  },
})
