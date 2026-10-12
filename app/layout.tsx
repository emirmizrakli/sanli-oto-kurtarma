import type { Metadata } from 'next';
import './globals.css';
import { business } from '@/config/business';
import Analytics from '@/components/analytics';
import { jsonLd, metadata as pageMetadata } from '@/lib/seo';
import { services } from '@/config/content';

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  ...pageMetadata('İstanbul Oto Çekici ve 7/24 Yol Yardım', 'Şanlı Oto Kurtarma: Sultanbeyli merkezli İstanbul oto çekici ve akü takviyesi. 7/24 arayın: 0544 604 34 60 veya WhatsApp’tan konum paylaşın.', '/'),
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = { '@context': 'https://schema.org', '@type': 'AutomotiveBusiness', '@id': `${business.siteUrl}/#business`, name: business.name, url: `${business.siteUrl}/`, telephone: business.phone,
    areaServed: { '@type': 'City', name: 'İstanbul' },
    openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }],
    hasOfferCatalog: { '@type': 'OfferCatalog', name: 'Çekici ve yol yardım hizmetleri', itemListElement: services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.title, url: `${business.siteUrl}/${service.slug}/` } })) },
  };
  return <html lang="tr"><body><a className="skip-link" href="#main-content">İçeriğe geç</a>{children}<Analytics /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} /></body></html>;
}
