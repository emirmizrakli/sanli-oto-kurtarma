'use client';
import { useEffect, useState } from 'react';
const measurementId = process.env.NEXT_PUBLIC_GA4_ID ?? '';
const enabled = /^G-[A-Z0-9]+$/.test(measurementId);
type Consent = 'granted' | 'denied' | null;
declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; } }
function loadAnalytics() {
  if (!enabled || document.getElementById('ga4-script')) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer?.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false });
  window.gtag('event', 'page_view', { page_location: location.origin + location.pathname, page_title: document.title });
  const script = document.createElement('script'); script.id = 'ga4-script'; script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`; document.head.appendChild(script);
}
export default function Analytics() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);
  const [settings, setSettings] = useState(false);
  useEffect(() => {
    try { const stored = localStorage.getItem('analytics-consent'); if (stored === 'granted' || stored === 'denied') setConsent(stored); } catch { /* Storage unavailable: default to no analytics. */ }
    setReady(true);
    const open = () => setSettings(true); window.addEventListener('analytics-settings', open);
    return () => window.removeEventListener('analytics-settings', open);
  }, []);
  useEffect(() => {
    if (consent !== 'granted' || !enabled) return;
    loadAnalytics();
    const track = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!target) return;
      const name = target.protocol === 'tel:' ? 'phone_click' : target.hostname === 'wa.me' ? 'whatsapp_click' : target.dataset.event === 'map_click' ? 'map_click' : null;
      if (!name) return;
      const params = { page_path: location.pathname, placement: target.closest('.sticky-actions') ? 'sticky' : target.closest('header') ? 'header' : 'content' };
      window.gtag?.('event', name, params);
      if (target.dataset.event === 'emergency_cta') window.gtag?.('event', 'emergency_cta', params);
      const service = target.closest<HTMLElement>('[data-service]')?.dataset.service;
      if (service) window.gtag?.('event', 'service_page_cta', { ...params, service });
    };
    document.addEventListener('click', track); return () => document.removeEventListener('click', track);
  }, [consent]);
  function choose(value: Exclude<Consent, null>) {
    try { localStorage.setItem('analytics-consent', value); } catch { /* Consent still applies to this page. */ }
    if (value === 'denied' && consent === 'granted') {
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
      for (const cookie of document.cookie.split(';')) { const name = cookie.split('=')[0].trim(); if (name.startsWith('_ga')) {
        const suffixes = location.hostname.split('.').map((_, i, all) => all.slice(i).join('.'));
        document.cookie = `${name}=; Max-Age=0; path=/`;
        for (const domain of suffixes) document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}`;
      } }
      location.reload();
    }
    setConsent(value); setSettings(false);
  }
  if (!enabled || !ready || (consent && !settings)) return null;
  return <section className="consent-panel" aria-label="Analitik tercihi"><p>Ziyaret ve iletişim tıklamalarını Google Analytics ile ölçmemize izin verir misiniz? Tercihinizi <a href="/gizlilik/">gizlilik sayfasından</a> değiştirebilirsiniz.</p><button onClick={() => choose('denied')}>Reddet</button><button onClick={() => choose('granted')}>Kabul et</button></section>;
}
export function AnalyticsSettings() { return enabled ? <button className="button button-yellow" onClick={() => window.dispatchEvent(new Event('analytics-settings'))}>Analitik tercihimi değiştir</button> : <p>Bu sitede şu anda Google Analytics ölçümü etkin değildir.</p>; }
