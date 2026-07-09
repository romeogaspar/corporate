import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({name: 'order', title: 'Order', type: 'number', validation: (r) => r.required()}),
    defineField({name: 'text', title: 'Quote', type: 'text', rows: 3, validation: (r) => r.required()}),
    defineField({name: 'author', title: 'Author', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'company', title: 'Company', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'project', title: 'Project', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (r) => r.min(1).max(5), initialValue: 5}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {select: {title: 'author', subtitle: 'company'}},
})
