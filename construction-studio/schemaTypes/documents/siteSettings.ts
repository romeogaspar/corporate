import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({name: 'siteName', title: 'Site / Nav Logo Text', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'footerTagline', title: 'Footer Tagline', type: 'text', rows: 2, validation: (r) => r.required()}),
    defineField({name: 'phone', title: 'Phone', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'email', title: 'Email', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'address', title: 'Address', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'licenseLabel', title: 'License Label', description: 'e.g. "PCAB AAA Licensed"', type: 'string'}),
    defineField({name: 'copyrightText', title: 'Footer Copyright Text', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'defaultSeoTitle', title: 'Default SEO Title', type: 'string', validation: (r) => r.required()}),
    defineField({name: 'defaultSeoDescription', title: 'Default SEO Description', type: 'text', rows: 3, validation: (r) => r.required()}),
  ],
  preview: {select: {title: 'siteName'}, prepare: ({title}) => ({title: title || 'Site Settings'})},
})
