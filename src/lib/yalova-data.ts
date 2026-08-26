export type Pansiyon = "BB" | "HB" | "HB_KAMPANYA";

export interface OdaTipi {
  id: string;
  ad: string;
  kategori: "Termal Otel" | "Apartlar";
  kapasite: number;
  kapasiteMetni: string;
  aciklama: string;
  gorsel: string;
  ozellikler: string[];
  fiyatlar: Partial<Record<Pansiyon, number>>;
}

export const PANSIYON_ETIKET: Record<Pansiyon, string> = {
  BB: "Oda & Kahvaltı (BB)",
  HB: "Yarım Pansiyon (HB)",
  HB_KAMPANYA: "Kampanyalı HB (%20 indirim)",
};

export const odalar: OdaTipi[] = [
  {
    id: "arka-sng",
    ad: "Termal Otel — Arka SNG",
    kategori: "Termal Otel",
    kapasite: 1,
    kapasiteMetni: "1 Kişi",
    aciklama: "Arka cepheye bakan, sakin ve dinlendirici tek kişilik oda.",
    gorsel: "/images/oda.jpg",
    ozellikler: ["Tek kişilik", "Termal su bağlantısı", "Ücretsiz Wi-Fi", "Kaplıca girişi dahil"],
    fiyatlar: { BB: 6500, HB: 7500, HB_KAMPANYA: 6000 },
  },
  {
    id: "arka-dbl",
    ad: "Termal Otel — Arka DBL",
    kategori: "Termal Otel",
    kapasite: 2,
    kapasiteMetni: "2 Kişi",
    aciklama: "Çiftler için ferah, arka cephe konumlu çift kişilik oda.",
    gorsel: "/images/oda.jpg",
    ozellikler: ["Çift kişilik yatak", "Termal su bağlantısı", "Minibar", "Kaplıca girişi dahil"],
    fiyatlar: { BB: 8000, HB: 10000, HB_KAMPANYA: 8000 },
  },
  {
    id: "on-sng",
    ad: "Termal Otel — Ön SNG",
    kategori: "Termal Otel",
    kapasite: 1,
    kapasiteMetni: "1 Kişi",
    aciklama: "Ön cephe manzaralı, gün ışığı alan tek kişilik oda.",
    gorsel: "/images/oda.jpg",
    ozellikler: ["Manzaralı ön cephe", "Tek kişilik", "Çalışma alanı", "Kaplıca girişi dahil"],
    fiyatlar: { BB: 7500, HB: 8500, HB_KAMPANYA: 6800 },
  },
  {
    id: "on-dbl",
    ad: "Termal Otel — Ön DBL",
    kategori: "Termal Otel",
    kapasite: 2,
    kapasiteMetni: "2 Kişi",
    aciklama: "Ön cephe manzarasına açılan geniş çift kişilik oda.",
    gorsel: "/images/oda.jpg",
    ozellikler: ["Manzaralı balkon", "Çift kişilik yatak", "Minibar", "Kaplıca girişi dahil"],
    fiyatlar: { BB: 10000, HB: 12000, HB_KAMPANYA: 9600 },
  },
  {
    id: "suit",
    ad: "Termal Otel — Süit",
    kategori: "Termal Otel",
    kapasite: 2,
    kapasiteMetni: "2 Kişi",
    aciklama: "Oturma bölümü ve özel termal küvetiyle en konforlu seçenek.",
    gorsel: "/images/oda.jpg",
    ozellikler: ["Ayrı oturma odası", "Özel termal küvet", "Yastık menüsü", "Hamam seansı dahil"],
    fiyatlar: { BB: 11500, HB: 13500, HB_KAMPANYA: 10800 },
  },
  {
    id: "ilave-yatak",
    ad: "Termal Otel — İlave Yatak",
    kategori: "Termal Otel",
    kapasite: 1,
    kapasiteMetni: "İlave Kişi",
    aciklama: "Mevcut rezervasyona eklenebilen ilave yatak seçeneği.",
    gorsel: "/images/oda.jpg",
    ozellikler: ["Mevcut odaya ilave", "Kahvaltı dahil", "Kaplıca girişi dahil"],
    fiyatlar: { BB: 3500, HB: 4500, HB_KAMPANYA: 3600 },
  },
  {
    id: "apart-5",
    ad: "Apartlar — 5 Kişilik",
    kategori: "Apartlar",
    kapasite: 5,
    kapasiteMetni: "5 Kişi",
    aciklama: "Mutfaklı, geniş aileler için tasarlanmış müstakil apart.",
    gorsel: "/images/oda.jpg",
    ozellikler: ["Tam donanımlı mutfak", "2 yatak odası", "Özel teras", "Aile dostu"],
    fiyatlar: { BB: 12000, HB: 17000 },
  },
];

export const tl = (deger: number) =>
  new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(deger);
