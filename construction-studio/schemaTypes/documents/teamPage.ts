import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teamPage',
  title: 'Team Page',
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
  ],
  preview: {prepare: () => ({title: 'Team Page'})},
})
