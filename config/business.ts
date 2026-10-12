export const business = {
  name: 'Şanlı Oto Kurtarma',
  phone: '+905446043460',
  phoneDisplay: '0544 604 34 60',
  whatsapp: '+905446043460',
  serviceArea: 'İstanbul geneli',
  address: 'ADDRESS_PLACEHOLDER',
  hours: '7 gün 24 saat',
  services: ['Oto çekici', 'Oto kurtarma', 'Akü takviyesi'],
  socialLinks: [] as string[],
  googleBusinessProfileUrl: 'GOOGLE_BUSINESS_PROFILE_URL_PLACEHOLDER',
  siteUrl: 'https://www.sanliotokurtarma.com',
  baseArea: 'Sultanbeyli, İstanbul',
  informationSource: 'https://sanliotokurtarma.com/',
} as const;

export const hasPhone = !business.phone.includes('PLACEHOLDER');
export const hasWhatsapp = !business.whatsapp.includes('PLACEHOLDER');
export const phoneHref = hasPhone ? `tel:${business.phone}` : '#contact';
export const whatsappHref = hasWhatsapp ? `https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent('Merhaba, yol yardım talebim var. Konumumu ve araç bilgilerimi paylaşmak istiyorum.')}` : '#contact';
