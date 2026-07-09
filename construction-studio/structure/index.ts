import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = [
  'siteSettings',
  'homePage',
  'aboutPage',
  'servicesPage',
  'portfolioPage',
  'pricingPage',
  'teamPage',
  'contactPage',
]

function singleton(S: Parameters<StructureResolver>[0], typeName: string, title: string) {
  return S.listItem()
    .title(title)
    .child(S.document().schemaType(typeName).documentId(typeName).title(title))
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      singleton(S, 'siteSettings', 'Site Settings'),
      S.divider(),
      singleton(S, 'homePage', 'Home Page'),
      singleton(S, 'aboutPage', 'About Page'),
      singleton(S, 'servicesPage', 'Services Page'),
      singleton(S, 'portfolioPage', 'Portfolio Page'),
      singleton(S, 'pricingPage', 'Pricing Page'),
      singleton(S, 'teamPage', 'Team Page'),
      singleton(S, 'contactPage', 'Contact Page'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !SINGLETONS.includes(listItem.getId() as string),
      ),
    ])
