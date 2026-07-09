import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({name: 'sectionTag', title: 'Section Tag', type: 'string', validation: (r) => r.required()}),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'object',
      fields: [
        defineField({name: 'line1', title: 'Line 1', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'highlight', title: 'Highlight Word', type: 'string', validation: (r) => r.required()}),
      ],
    }),
    defineField({name: 'intro', title: 'Intro Text', type: 'text', rows: 2, validation: (r) => r.required()}),
    defineField({name: 'infoItems', title: 'Info Items', type: 'array', of: [{type: 'infoItem'}], validation: (r) => r.min(1)}),
    defineField({name: 'responseNote', title: 'Form Response Note', description: 'e.g. "We respond within 3 business days."', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'serviceOptions', title: 'Service Dropdown Options', type: 'array', of: [{type: 'string'}], validation: (r) => r.min(1)}),
  ],
  preview: {prepare: () => ({title: 'Contact Page'})},
})
