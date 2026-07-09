import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'qz3nxygb';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
  projectId,
  dataset,
  useCdn: true,
  apiVersion,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source, width = 900) => (source ? builder.image(source).width(width).url() : undefined);
