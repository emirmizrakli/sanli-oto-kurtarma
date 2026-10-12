import type { Metadata } from 'next';
import { business } from '@/config/business';
export function metadata(title: string, description: string, path: string): Metadata {
  const url = `${business.siteUrl}${path}`;
  return { title: { absolute: `${title} | ${business.name}` }, description, alternates: { canonical: url }, openGraph: { title, description, url, siteName: business.name, locale: 'tr_TR', type: 'website' }, twitter: { card: 'summary', title, description } };
}
export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
