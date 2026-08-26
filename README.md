# Yalova Termal Lux

Yalova Termal konsepti için modern, zarif ve tamamen Türkçe bir lüks termal spa & otel frontend'i oluştur. React, Tailwind CSS, Lucide Icons ve Framer Motion kullan. Pastel toprak tonları: bej, sıcak kum, yumuşak adaçayı yeşili, beyaz. Tüm medya referansları yalnızca /public/images/ altından olsun; hero ve diğer görseller için bu yerel yolları kullanacak güvenli placeholder/fallback yapısı tasarla.

Sayfada sticky temiz bir navbar olsun: Ana Sayfa, Termal Kaplıcaları, Konaklama / Odalar, Banyo ve Hamamlar, Fiyatlar, İletişim.

Hero: termal otel atmosferi, CTA'lar, yerel görüntü placeholder'ları.

Odalar ve Fiyatlar bölümünde aşağıdaki 2026 fiyatlarını dinamik veriden fiyat kartlarıyla göster. Her kartta özellikler ve “Rezervasyon Yap” butonu olsun:
- Termal Otel - Arka SNG (1 Kişi): BB 6.500 TL, HB 7.500 TL, Kampanyalı HB (%20 indirim) 6.000 TL
- Termal Otel - Arka DBL (2 Kişi): BB 8.000 TL, HB 10.000 TL, Kampanyalı HB 8.000 TL
- Termal Otel - Ön SNG (1 Kişi): BB 7.500 TL, HB 8.500 TL, Kampanyalı HB 6.800 TL
- Termal Otel - Ön DBL (2 Kişi): BB 10.000 TL, HB 12.000 TL, Kampanyalı HB 9.600 TL
- Termal Otel - Süit (2 Kişi): BB 11.500 TL, HB 13.500 TL, Kampanyalı HB 10.800 TL
- Termal Otel - İlave Yatak: BB 3.500 TL, HB 4.500 TL, Kampanyalı HB 3.600 TL
- Apartlar - 5 Kişilik: BB 12.000 TL, HB 17.000 TL

Eksiksiz rezervasyon akışı ekle:
1) Her “Rezervasyon Yap” seçeneği bir modal ya da rezervasyon ekranı açsın: giriş/çıkış tarihi, misafir sayısı, oda türü ve pansiyon tipi BB/HB (uygunsa kampanyalı HB) seçilebilsin; gece sayısına bağlı toplam fiyat anlık hesaplansın.
2) “Rezervasyonu Tamamla / Ödemeye Geç” ayrı Ödeme ekranına geçsin.
3) Ödeme ekranında rezervasyon özeti: tarihler, oda, pansiyon, toplam ücret; şık bir ödeme formu placeholder'ı. Kart bilgilerinin backend işleme mantığını kesinlikle ekleme. Bu noktada aksiyon yalnızca placeholder/uyarı durumunda dursun.

Kaplıcalar, banyo/hamam, deneyim/olanaklar, iletişim ve footer alanlarıyla bütüncül bir landing sayfa yap. Responsive ve mobilde kaliteli olsun. Admin paneli ekleme. Uygulamayı derleyip hatasız çalıştığını doğrula.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://serene-yalova-retreat.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/52e41f8d-2b99-4a6f-bf55-d7eafb533708).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
