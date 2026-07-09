import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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
    defineField({name: 'paragraphs', title: 'Body Paragraphs', type: 'array', of: [{type: 'text', rows: 3}], validation: (r) => r.min(1)}),
    defineField({name: 'images', title: 'Images', type: 'imageStack'}),
    defineField({name: 'points', title: 'Points', type: 'array', of: [{type: 'pointItem'}], validation: (r) => r.min(1)}),
  ],
  preview: {prepare: () => ({title: 'About Page'})},
})
