import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'object',
  fields: [
    defineField({name: 'tier', title: 'Tier Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'price', title: 'Price', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'unit', title: 'Unit / Subtitle', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'string'}],
      validation: (r) => r.min(1),
    }),
    defineField({name: 'featured', title: 'Featured Tier', type: 'boolean', initialValue: false}),
    defineField({
      name: 'badge',
      title: 'Badge Text',
      description: 'e.g. "Most Popular" — only shown on the featured tier.',
      type: 'string',
      hidden: ({parent}) => !parent?.featured,
    }),
  ],
  preview: {select: {title: 'tier', subtitle: 'price'}},
})
