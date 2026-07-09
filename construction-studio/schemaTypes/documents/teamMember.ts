import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({name: 'order', title: 'Order', type: 'number', validation: (r) => r.required()}),
    defineField({name: 'name', title: 'Name', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'role', title: 'Role', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'bio', title: 'Bio', type: 'text', rows: 2, validation: (r) => r.required()}),
    defineField({name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
  ],
  orderings: [
    {title: 'Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
})
