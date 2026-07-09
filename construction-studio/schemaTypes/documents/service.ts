import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({name: 'order', title: 'Order', type: 'number', validation: (r) => r.required()}),
    defineField({name: 'icon', title: 'Icon (emoji)', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'shortDesc', title: 'Short Description', description: 'Used in the homepage preview grid.', type: 'text', rows: 2, validation: (r) => r.required()}),
    defineField({name: 'fullDesc', title: 'Full Description', description: 'Used on the Services page.', type: 'text', rows: 3, validation: (r) => r.required()}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {select: {title: 'name', subtitle: 'shortDesc'}},
})
