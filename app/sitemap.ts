import type { MetadataRoute } from 'next';
import { business } from '@/config/business';
import { routes } from '@/config/content';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap { return routes.map(path => ({ url: `${business.siteUrl}${path}` })); }
