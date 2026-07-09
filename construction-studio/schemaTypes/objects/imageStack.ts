import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'imageStack',
  title: 'Image Stack',
  description: 'A main image with a smaller accent image and a stat badge overlaid.',
  type: 'object',
  fields: [
    defineField({name: 'mainImage', title: 'Main Image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'accentImage', title: 'Accent Image', type: 'image', options: {hotspot: true}, validation: (r) => r.required()}),
    defineField({name: 'badgeValue', title: 'Badge Value', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'badgeLabel', title: 'Badge Label', type: 'string', validation: (r) => r.required()}),
  ],
})
