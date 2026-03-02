<p align="center">
  <h1 align="center">⚡ FREEdome Launch System</h1>
  <p align="center">
    <strong>3 Günlük Mini Launch Kampanyası — Tek Bir Web Uygulaması</strong>
  </p>
  <p align="center">
    Rakip verisi ve hedef kitle içgörüsünü birleştirerek saniyeler içinde reklam kreatifleri üretir.<br>
    <em>Brifsiz, taslaksız, beklemeksizin.</em>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
</p>

---

## Proje Hakkında

FREEdome, yapay zeka ile reklam kreatifi üreten bir SaaS ürünü için tasarlanmış **3 günlük launch kampanya sistemidir**. Bu repo, kampanyanın tüm bileşenlerini tek bir multi-page web uygulaması olarak içerir:

| Sayfa | Açıklama |
|-------|----------|
| **Landing Page** | Dönüşüm odaklı ana sayfa — hero, fayda blokları, lead form |
| **Kreatif Hooklar** | 3 video hook metni, başlık varyasyonları, sosyal medya copy |
| **KPI Dashboard** | 7 temel KPI kartı, Google Sheet simülasyonu, karar sinyalleri |
| **UTM & Otomasyon** | UTM yapılandırması, canlı URL builder, 6 adımlı otomasyon akışı |

---

## Öne Çıkan Özellikler

- **Premium Dark Theme** — Glassmorphism kartlar, gradient aksan renkleri, radial glow efektleri
- **Modern Tipografi** — Inter + JetBrains Mono (Google Fonts)
- **Tam Responsive** — Mobil, tablet ve desktop uyumlu
- **Sıfır Bağımlılık** — Vanilla HTML/CSS/JS, framework yok
- **Animasyonlu Sayaçlar** — "4 gün → 40 saniye" karşılaştırması, IntersectionObserver ile tetiklenir
- **İnteraktif KPI Dashboard** — Progress bar'lar, renk kodlu durum göstergeleri, 4 tab'lı Google Sheet simülasyonu
- **Canlı UTM Builder** — Gerçek zamanlı URL oluşturucu, tek tıkla kopyalama
- **Lead Form** — Validasyonlu form, başarı ekranı, referral mekanizması
- **Sayfa İçi Navigasyon** — Fixed navbar, aktif sayfa göstergesi, mobil hamburger menü

---

## Proje Yapısı

```
freedome-launch/
├── index.html          # Landing Page (Görev 1)
├── hooks.html          # Kreatif Hook Çalışması (Görev 2)
├── dashboard.html      # KPI Dashboard (Görev 3)
├── automation.html     # UTM & Otomasyon Akışı (Bonus)
├── css/
│   └── style.css       # Tasarım sistemi (1250+ satır)
├── js/
│   ├── main.js         # Landing page — sayaç, form, parallax
│   ├── dashboard.js    # KPI bar animasyonları, tab geçişleri
│   └── nav.js          # Navigasyon, scroll efektleri, mobil menü
└── README.md
```

---

## Hızlı Başlangıç

Herhangi bir kurulum veya derleme adımı gerekmez. Projeyi klonlayıp tarayıcıda açmanız yeterlidir:

```bash
# Repoyu klonlayın
git clone https://github.com/gurkantngl/freedome-launch.git

# Dizine girin
cd freedome-launch

# Tarayıcıda açın
# Windows:
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

Veya doğrudan `index.html` dosyasına çift tıklayarak açabilirsiniz.

---

## Sayfalar

### 1. Landing Page (`index.html`)

- **Hero Alanı** — "Rakibini Analiz Et. Kreatifini Saniyeler İçinde Üret."
- **Split Karşılaştırma** — Manuel Süreç (4 gün) vs FREEdome (40 saniye) animasyonlu
- **3 Fayda Bloğu** — Rakip Zekası, Sıfırdan Kreatif, Anında Yayına Hazır
- **Lead Form** — E-posta (zorunlu), Şirket (zorunlu), Bütçe aralığı (opsiyonel)
- **Referral Mekanizması** — Form başarısı sonrası viral döngü tetikleyicisi

### 2. Kreatif Hook Çalışması (`hooks.html`)

- **3 Video Hook** — Pain-Based, Identity-Based, Pattern Interrupt
- **Başlık Varyasyonları** — Psikolojik çerçeve etiketli A/B test tablosu
- **Sosyal Medya Copy** — LinkedIn, Twitter/X, Instagram için hazır caption

### 3. KPI Dashboard (`dashboard.html`)

- **7 KPI Kartı** — CTR, Form Dolum, Lead Kalite, Aktivasyon, Viral Katsayısı, CPL, E-posta Açılma
- **Google Sheet Simülasyonu** — Dashboard, Lead Log, Kreatif Performans, Günlük Karar Notu (4 tab)
- **Ölçeklendirme & Optimizasyon Sinyalleri** — Çift sinyal kuralı ile renk kodlu karar matrisi

### 4. UTM & Otomasyon (`automation.html`)

- **UTM Tablo** — 5 parametre (source, medium, campaign, content, term)
- **Canlı UTM Builder** — Parametreleri seçin, URL otomatik oluşsun, kopyalayın
- **6 Adımlı Otomasyon Akışı** — Form → CRM → Skor → E-posta → Aktivasyon → Referral

---

## Tasarım Sistemi

| Özellik | Değer |
|---------|-------|
| **Arka Plan** | `#0a0a0f` (koyu siyah-mor) |
| **Aksan Renk** | `#6c5ce7` → `#a29bfe` → `#74b9ff` (gradient) |
| **Font** | Inter (UI), JetBrains Mono (kod) |
| **Kartlar** | Glassmorphism — `backdrop-filter: blur(16px)` |
| **Animasyonlar** | IntersectionObserver + CSS transitions, spring easing |
| **Grid** | 2, 3, 4 kolonlu responsive grid sistemi |

---

## Tasarım Felsefesi

| İlke | Uygulama |
|------|----------|
| **Sistem Kurma** | Tüm görevler tek bir web uygulaması altında, ortak design system ile bağlı |
| **Yapısal Düşünme** | Her sayfa belirli bir amaca hizmet eder, veri akışı açık ve izlenebilir |
| **Hız ve Pratiklik** | Vanilla HTML/CSS/JS, sıfır dependency, anında çalışır |
| **KPI Odaklı Bakış** | Dashboard interaktif, sinyaller renk kodlu, karar mekanizması görsel |

---

## Teknolojiler

- **HTML5** — Semantik yapı, erişilebilirlik, SEO uyumlu meta etiketler
- **CSS3** — Custom Properties, Grid, Flexbox, backdrop-filter, clamp(), animasyonlar
- **JavaScript (ES6+)** — IntersectionObserver, DOM API, event delegation
- **Google Fonts** — Inter, JetBrains Mono

> Hiçbir framework, build aracı veya harici bağımlılık kullanılmamıştır.

---

## Lisans

Bu proje [MIT](LICENSE) lisansı ile lisanslanmıştır.

---

<p align="center">
  <strong>FREEdome</strong> — Rakibini Analiz Et. Kreatifini Saniyeler İçinde Üret.
</p>
