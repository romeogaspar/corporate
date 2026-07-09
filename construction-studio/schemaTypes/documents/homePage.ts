import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'about', title: 'About Preview'},
    {name: 'services', title: 'Services Preview'},
    {name: 'testimonials', title: 'Testimonials'},
  ],
  fields: [
    defineField({name: 'heroTag', title: 'Hero Tag', type: 'string', group: 'hero', validation: (r) => r.required()}),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      description: 'Three lines, the second is highlighted in amber.',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'line1', title: 'Line 1', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'line2Highlight', title: 'Line 2 (highlighted)', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'line3', title: 'Line 3', type: 'string', validation: (r) => r.required()}),
      ],
    }),
    defineField({name: 'heroSub', title: 'Hero Subtext', type: 'text', rows: 3, group: 'hero', validation: (r) => r.required()}),
    defineField({name: 'heroImage', title: 'Hero Background Image', type: 'image', options: {hotspot: true}, group: 'hero', validation: (r) => r.required()}),
    defineField({name: 'heroStats', title: 'Hero Stats', type: 'array', group: 'hero', of: [{type: 'statItem'}], validation: (r) => r.min(1)}),

    defineField({name: 'aboutSectionTag', title: 'Section Tag', type: 'string', group: 'about', validation: (r) => r.required()}),
    defineField({
      name: 'aboutHeading',
      title: 'Heading',
      type: 'object',
      group: 'about',
      fields: [
        defineField({name: 'line1', title: 'Line 1', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'highlight', title: 'Highlight Word', type: 'string', validation: (r) => r.required()}),
      ],
    }),
    defineField({name: 'aboutBody', title: 'Body Text', type: 'text', rows: 3, group: 'about', validation: (r) => r.required()}),
    defineField({name: 'aboutImages', title: 'Images', type: 'imageStack', group: 'about'}),
    defineField({name: 'aboutPoints', title: 'Points', type: 'array', group: 'about', of: [{type: 'pointItem'}], validation: (r) => r.min(1)}),

    defineField({name: 'servicesSectionTag', title: 'Section Tag', type: 'string', group: 'services', validation: (r) => r.required()}),
    defineField({
      name: 'servicesHeading',
      title: 'Heading',
      type: 'object',
      group: 'services',
      fields: [
        defineField({name: 'line1', title: 'Line 1', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'highlight', title: 'Highlight Word', type: 'string', validation: (r) => r.required()}),
      ],
    }),

    defineField({name: 'testimonialsSectionTag', title: 'Section Tag', type: 'string', group: 'testimonials', validation: (r) => r.required()}),
    defineField({
      name: 'testimonialsHeading',
      title: 'Heading',
      type: 'object',
      group: 'testimonials',
      fields: [
        defineField({name: 'line1', title: 'Line 1', type: 'string', validation: (r) => r.required()}),
        defineField({name: 'highlight', title: 'Highlight Word', type: 'string', validation: (r) => r.required()}),
      ],
    }),
  ],
  preview: {prepare: () => ({title: 'Home Page'})},
})
