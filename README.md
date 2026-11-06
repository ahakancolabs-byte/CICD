# React E-Ticaret Örnek Projesi

Bu proje, Cloudflare Pages ve CircleCI entegrasyonunu test etmek için hazırlanmış 3 sayfalık bir e-ticaret React uygulamasıdır.

## Kurulum ve Çalıştırma

1. Proje klasörünü açın ve terminalde bağımlılıkları yükleyin:
   ```bash
   yarn install
   ```
2. Geliştirme sunucusunu başlatın:
   ```bash
   npm start
   ```

## Kalite Kontrolleri

```bash
yarn lint
yarn lint:translations
yarn test --watchAll=false --passWithNoTests
yarn build
```

`lint:translations`, şu an tek dil olan Türkçe arayüz için sayfanın `lang` değerini ve başlığını doğrular. Çeviri kataloğu veya çoklu dil altyapısı henüz bulunmamaktadır.
