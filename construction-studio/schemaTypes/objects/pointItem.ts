import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'pointItem',
  title: 'Point',
  type: 'object',
  fields: [
    defineField({name: 'icon', title: 'Icon (emoji)', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'title', title: 'Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'desc', title: 'Description', type: 'text', rows: 2, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'desc'}},
})
