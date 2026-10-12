# cPanel yayına alma

## Hazırlanan çıktı

`npm ci`, `npm run build`, `npm run audit:seo` çalıştırılır. `out/` statik web dosyalarıdır; cPanel üzerinde Node.js sunucusu gerekmez. `npm start` yerel statik önizleme açar; Apache yönlendirmelerini taklit etmez.

Sayfalar standart HTML bağlantılarıyla tam gezinme kullanır; bu bilinçli seçim cPanel statik sunumunu ve sayfa başına analitik onay akışını sade tutar. Bu nedenle yalnızca Next.js'in Link tercih kuralı devre dışıdır; bağlantı bütünlüğü SEO denetimiyle sınanır.

## Mevcut site geçişi

18 Eylül 2026 incelemesi: ana sayfa ve mevcut sitemap yalnızca `/` adresini içeriyor. Navigasyon anchor bağlantılarıdır. Mevcut canonical `https://www.sanliotokurtarma.com/` olduğundan bu sürüm korundu. Eski robots başka domain olan sanlioto.com adresine işaret ediyordu. HTTP ve www olmayan istekler 200 dönüyordu.

1. cPanel'de domainin belge kökünü Domains bölümünden doğrulayın; başka domainin public_html dizinine yüklemeyin.
2. Mevcut site dosyalarını ve .htaccess dosyasını cPanel Backup üzerinden yedekleyin. Yedeği belge kökünde erişilebilir bırakmayın.
3. SSL sertifikasının hem www hem çıplak alan adını kapsadığını doğrulayın.
4. `out/` içeriğini (klasörün kendisini değil) belge köküne aktarın. `.htaccess`, `_next`, hizmet klasörleri ve 404.html dahil olmalıdır. Kaynak kod, node_modules, .env veya dokümanları yüklemeyin.
5. Mevcut .htaccess içindeki e-posta, PHP veya başka uygulama kurallarını incelemeden silmeyin. Hazırlanan yönlendirmeleri gerekli mevcut kurallarla birleştirin. Proxy/CDN varsa HTTPS algılamasını test edin; döngü oluşursa önceki dosyayı geri yükleyin.
6. `/`, `/oto-cekici/`, `/aku-takviyesi/`, `/robots.txt`, `/sitemap.xml` 200; uydurma URL 404 dönmeli. HTTP ve çıplak host canonical adrese 301 dönmeli. `/index.html` ana sayfaya 301 dönmeli.
7. Eski #hizmetler, #bolgeler, #nasil, #sss, #iletisim bağlantıları korundu. Doğrulanmamış yorumlar kaldırıldığı için eski #yorumlar için gizli sahte yorum bölümü oluşturulmadı.
8. Search Console Domain mülkünü DNS TXT ile doğrulayın, https://www.sanliotokurtarma.com/sitemap.xml gönderin. DNS yönteminde koda doğrulama etiketi gerekmez. URL-prefix yönteminde GOOGLE_SITE_VERIFICATION tanımlanıp yeniden build alınabilir.

## Analitik

GA4 ölçüm kimliği sağlanmadığı için canlı ölçüm şu anda kapalıdır. `.env.local` içine `NEXT_PUBLIC_GA4_ID=G-...` eklenip build alındığında isteğe bağlı analitik onay alanı açılır. Kullanıcı kabul edene kadar GA4 yüklenmez. Gizlilik sayfasından tercih değiştirilebilir. Kimlik ve onay olmadan Google'a olay gönderilmez.

Olaylar: phone_click, whatsapp_click, emergency_cta ve service_page_cta. İletişim formu/gerçek harita bağlantısı yokken başarılı form gönderimi veya harita tıklaması uydurulmaz. Gerçek harita bağlantısı eklendiğinde `data-event="map_click"` desteklenir. GA4'te phone_click/whatsapp_click olaylarını key event olarak işaretleyin. Bu olaylar tıklamadır; tamamlanan görüşme veya müşteri dönüşümü değildir. Enhanced Measurement otomatik outbound ölçümünü aynı hedefler için tekrar key event saymayın.

## Yayın sonrası

Google İşletme Profili yok; gerçek işletme adına açılıp doğrulanmalı, müşterinin ziyaret etmediği adres gizlenmeli. Profil oluşturulduktan sonra URL merkezi config'e aktarılmalı. Gerçek fotoğraf ve izinli müşteri yorumları kullanılmalı. Search Console sorguları/CTR ve GA4 iletişim tıklamalarıyla öncelikli ilçeler belirlenmeli. Tüm ilçelerde ilk sıra taahhüdü yoktur.

Bu çalışma hosting hesabına dosya yüklemez. Sunucu yönlendirmeleri ve SSL yalnızca canlı yüklemeden sonra doğrulanabilir. Paylaşılan gizlilik metni teknik veri akışını anlatır; işletmenin veri işleme süreçlerine uygun nihai aydınlatma metni ayrıca tamamlanmalıdır.
