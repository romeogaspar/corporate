import statItem from './objects/statItem'
import pointItem from './objects/pointItem'
import imageStack from './objects/imageStack'
import pricingTier from './objects/pricingTier'
import infoItem from './objects/infoItem'

import service from './documents/service'
import portfolioProject from './documents/portfolioProject'
import teamMember from './documents/teamMember'
import testimonial from './documents/testimonial'

import siteSettings from './documents/siteSettings'
import homePage from './documents/homePage'
import aboutPage from './documents/aboutPage'
import servicesPage from './documents/servicesPage'
import portfolioPage from './documents/portfolioPage'
import pricingPage from './documents/pricingPage'
import teamPage from './documents/teamPage'
import contactPage from './documents/contactPage'

export const schemaTypes = [
  statItem, pointItem, imageStack, pricingTier, infoItem,
  siteSettings, homePage, aboutPage, servicesPage, portfolioPage, pricingPage, teamPage, contactPage,
  service, portfolioProject, teamMember, testimonial,
]