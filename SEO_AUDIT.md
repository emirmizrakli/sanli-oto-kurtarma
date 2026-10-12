# SEO uygulama ve doğrulama — 18 Eylül 2026

## Tamamlananlar

- Şanlı Oto Kurtarma adı, 0551 472 61 60 telefon/WhatsApp ve doğrulanmış 7/24 bilgisi merkezi yapılandırmaya alındı.
- Canonical, robots ve sitemap adresleri mevcut sitenin www.sanliotokurtarma.com tercihine bağlandı.
- Hizmet, bölge rehberi, iletişim ve hakkında sayfalarına ayrı başlık, açıklama, H1 ve dahili bağlantılar eklendi.
- İşletme, hizmet ve breadcrumb yapılandırılmış verileri eklendi; doğrulanmamış puan/yorum/adres kullanılmadı.
- Onaylanmayan lastik ve yakıt hizmetleri yayın kapsamından çıkarıldı. Aynı metnin ilçe adı değiştirilmiş kopyaları oluşturulmadı.
- Ana görsel 1.994.652 bayt PNG'den 73.372 bayt WebP'ye dönüştürüldü; yükleme önceliği yüksek. Temsili yapay zekâ görseli olarak etiketli.
- Fontlar yerelden sunuluyor; mobil arama ve WhatsApp erişimi var.
- cPanel statik çıktı, özel 404 ve canonical yönlendirme kuralları hazırlandı.
- GA4, kullanıcı onayına bağlı hazır; ölçüm kimliği verilmediği için kapalı.

## Doğrulama

- Production build ve lint başarılı.
- Otomatik SEO denetimi: 11 HTML sayfası, 248 iç bağlantı, 23 JSON-LD bloğu başarılı. Gizlilik sayfası noindex; sitemap dışında.
- JSON-LD denetimi sözdizimini kontrol eder; Google zengin sonuç uygunluğu garantisi değildir.
- Yerel statik sunucuda sayfalar/robots/sitemap 200, olmayan adres 404.
- Mobil görünüm ve telefon/WhatsApp hedefleri kontrol edildi.
- Lighthouse son mobil simülasyon: performans 88, erişilebilirlik 100, SEO 100. LCP 3,9 sn; CLS 0,002; TBT 50 ms.
- Rapor: output/lighthouse-final.json. Rapor tamamlandı ve runtimeError yok; CLI çıkışında Windows geçici tarayıcı klasörü temizlenirken EPERM hatası verdi.

Bu skorlar localhost laboratuvar ölçümüdür, tüm sayfaların veya canlı hostingin sonucu değildir. SEO 100 puanı içerik kalitesi, rekabet, Google sıralaması veya indekslenme garantisi vermez. Performansta LCP ve JavaScript yükü iyileştirme alanı olarak devam ediyor.

## Yayında tamamlanacaklar

Canlı siteye yükleme yapılmadı. DEPLOYMENT.md adımlarına göre mevcut dosyalar yedeklenerek yüklenmeli; Apache yönlendirmeleri, SSL ve canlı hız sonrasında ölçülmeli. Search Console mülkü ve sitemap gönderimi yapılmalı. GA4 gerçek kimlikle ve onay akışıyla test edilmeli. Google İşletme Profili oluşturulup doğrulanmalı. Gerçek çekici/operasyon fotoğrafları, işletme bilgileri ve ilçelere özgü gerçek hizmet kapsamı alınmalı.

İstanbul'un her ilçesinde birinci sıra sözü verilemez; henüz ilçelere özel doğrulanmış içerik sayfaları hazırlanmış değildir.
