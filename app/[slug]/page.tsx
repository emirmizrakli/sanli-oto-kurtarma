import { notFound } from 'next/navigation';
import { business } from '@/config/business';
import { pages } from '@/config/content';
import { ContactActions, Header, Footer } from '@/components/site-shell';
import { jsonLd, metadata } from '@/lib/seo';
export const dynamicParams = false;
export function generateStaticParams() { return pages.map(page => ({ slug: page.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const page = pages.find(p => p.slug === slug); if (!page) return {}; return metadata(page.title, page.description, `/${page.slug}/`); }
export default async function Detail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages.find(p => p.slug === slug); if (!page) notFound();
  const breadcrumb = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana sayfa', item: `${business.siteUrl}/` }, { '@type': 'ListItem', position: 2, name: page.title, item: `${business.siteUrl}/${page.slug}/` }] };
  const service = page.kind === 'service' ? { '@context': 'https://schema.org', '@type': 'Service', name: page.title, description: page.description, url: `${business.siteUrl}/${page.slug}/`, provider: { '@id': `${business.siteUrl}/#business` }, areaServed: { '@type': 'City', name: 'İstanbul' } } : null;
  return <><Header /><main id="main-content" data-service={page.kind === 'service' ? page.slug : undefined}><section className="detail-hero"><nav aria-label="İçerik yolu"><a href="/">Ana sayfa</a> / {page.title}</nav><h1>{page.title}</h1><p>{page.intro}</p><ContactActions /></section><article className="article-body">{page.sections.map(section => <section key={section.heading}><h2>{section.heading}</h2><p>{section.text}</p></section>)}<aside><h2>İlgili bilgiler</h2><div className="related-links">{page.related.map(slug => <a key={slug} href={`/${slug}/`}>{pages.find(p => p.slug === slug)?.title ?? 'Tüm hizmetler'} →</a>)}</div></aside></article><section className="detail-hero"><h2>Talebinizi doğrudan iletin</h2><p>Konum ve araç bilgilerinizi paylaşarak hizmet uygunluğu ve ücret hakkında bilgi alın.</p><ContactActions /></section></main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />{service && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(service) }} />}</>;
}
