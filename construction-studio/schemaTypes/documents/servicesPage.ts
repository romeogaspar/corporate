import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    defineField({name: 'sectionTag', title: 'Section Tag', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'heading', title: 'Heading (highlighted)', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'intro', title: 'Intro Text', type: 'text', rows: 2, validation: (r) => r.required()}),
  ],
  preview: {prepare: () => ({title: 'Services Page'})},
})
