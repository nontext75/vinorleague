import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const isSanityConfigured = Boolean(projectId);
export const sanityClient = createClient({
  projectId: projectId || 'configure-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-01-01',
  useCdn: false,
  perspective: 'published',
});
