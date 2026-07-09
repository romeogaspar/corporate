import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'infoItem',
  title: 'Info Item',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'value', title: 'Value', type: 'string', validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'label', subtitle: 'value'}},
})
