import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'statItem',
  title: 'Stat',
  type: 'object',
  fields: [
    defineField({name: 'value', title: 'Value', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})
