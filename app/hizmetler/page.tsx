import { services } from '@/config/content';
import { Header, Footer } from '@/components/site-shell';
import { metadata } from '@/lib/seo';
export const generateMetadata = () => metadata('İstanbul Oto Çekici ve Yol Yardım Hizmetleri', 'Oto çekici, kurtarma ve akü takviyesi. Şanlı Oto Kurtarma hizmet kapsamını inceleyin, konum ve araç bilgilerinizle talebinizi iletin.', '/hizmetler/');
export default function Services() { return <><Header /><main id="main-content" className="section"><p className="eyebrow">HİZMETLER</p><h1>İstanbul oto çekici ve yol yardım hizmetleri</h1><p>Aracınızın durumuna uygun hizmetin detaylarını inceleyin.</p><div className="service-grid">{services.map(page => <article key={page.slug} className="service-card"><h2>{page.title}</h2><p>{page.intro}</p><a href={`/${page.slug}/`}>Hizmet detayları →</a></article>)}</div></main><Footer /></>; }
