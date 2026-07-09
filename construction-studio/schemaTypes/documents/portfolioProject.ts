import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    defineField({name: 'order', title: 'Order', type: 'number', validation: (r) => r.required()}),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Residential', value: 'Residential'},
          {title: 'Commercial', value: 'Commercial'},
          {title: 'Industrial', value: 'Industrial'},
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'meta', title: 'Meta', description: 'e.g. "Manila · 2024 · 48 Units"', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'featured', title: 'Featured (wide tile)', type: 'boolean', initialValue: false}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
})
