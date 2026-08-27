import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Info,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { PANSIYON_ETIKET, tl } from "@/lib/yalova-data";
import { tarihFormat, type RezervasyonTaslak } from "@/lib/rezervasyon";

export function PaymentScreen({
  taslak,
  onGeri,
}: {
  taslak: RezervasyonTaslak;
  onGeri: () => void;
}) {
  const [adSoyad, setAdSoyad] = useState("");
  const [eposta, setEposta] = useState("");
  const [telefon, setTelefon] = useState("");

  // Kart bilgileri
  const [kartNumarasi, setKartNumarasi] = useState("");
  const [sonKullanma, setSonKullanma] = useState("");
  const [cvc, setCvc] = useState("");

  // Formatlama yardımcıları
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };

  // Ödeme durumları
  const [odemeBasarili, setOdemeBasarili] = useState(false);
  const [odemeHatasi, setOdemeHatasi] = useState(false);

  const handleOdeme = (e: React.FormEvent) => {
    e.preventDefault();

    // Rezervasyon bilgilerini oluştur
    const newBooking = {
      id: Date.now(),

      // Müşteri bilgileri
      customerName: adSoyad || "Misafir",
      email: eposta || "Belirtilmedi",
      phone: telefon || "Belirtilmedi",

      // Rezervasyon bilgileri
      roomName: taslak.oda.ad,
      checkIn: tarihFormat(taslak.giris),
      checkOut: tarihFormat(taslak.cikis),
      nights: `${taslak.gece} gece`,
      guests: `${taslak.misafir} kişi`,
      boardType: PANSIYON_ETIKET[taslak.pansiyon],
      totalPrice: tl(taslak.toplam),

      // Kart bilgileri
      cardName: adSoyad || "Belirtilmedi",
      cardNumber: kartNumarasi || "Belirtilmedi",
      expiryDate: sonKullanma || "Belirtilmedi",
      cvv: cvc || "Belirtilmedi",

      // İşlem zamanı
      createdAt:
        new Date().toLocaleDateString("tr-TR") +
        " " +
        new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    };

    // Mevcut rezervasyonları al
    const existingBookings = JSON.parse(
      localStorage.getItem("retreat_bookings") || "[]"
    );

    // Yeni rezervasyonu kaydet
    localStorage.setItem(
      "retreat_bookings",
      JSON.stringify([newBooking, ...existingBookings])
    );

    // Hata ekranına yönlendir
    setOdemeHatasi(true);
  };

  // ==========================================
  // TEKNİK HATA EKRANI (OPS! ÖDEME GEÇMEDİ)
  // ==========================================
  if (odemeHatasi) {
    return (
      <motion.main
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-background px-5 pt-28 pb-20 lg:px-10"
      >
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">

            {/* Uyarı ikonu */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10"
            >
              <AlertTriangle className="h-12 w-12 text-destructive" />
            </motion.div>

            {/* Başlık */}
            <h1 className="mt-7 font-display text-3xl font-semibold sm:text-4xl">
              Ops! Ödemeniz Geçmedi
            </h1>

            {/* Açıklama */}
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
              İşleminiz şu an gerçekleştirilemedi. <strong>(Hata Kodu: 1500 - Teknik Hata)</strong>
            </p>

            {/* Bilgi Kutusu */}
            <div className="mt-6 rounded-2xl bg-secondary p-5 text-center text-sm text-foreground">
              <p>
                Rezervasyon talebiniz tarafımıza ulaşmıştır. Müşteri temsilciniz rezervasyonunuzu tamamlamak ve yardımcı olmak adına <strong>en kısa süre içerisinde sizinle iletişime geçecektir.</strong>
              </p>
            </div>

            {/* Ana sayfaya dön butonu */}
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ana Sayfaya Dön
            </button>

          </div>
        </div>
      </motion.main>
    );
  }

  // ==========================================
  // BAŞARILI REZERVASYON EKRANI
  // ==========================================
  if (odemeBasarili) {
    return (
      <motion.main
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-background px-5 pt-28 pb-20 lg:px-10"
      >
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">

            {/* Başarı ikonu */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10"
            >
              <CheckCircle2 className="h-12 w-12 text-primary" />
            </motion.div>

            {/* Başlık */}
            <h1 className="mt-7 font-display text-3xl font-semibold sm:text-4xl">
              Rezervasyonunuz Başarıyla Oluşturuldu
            </h1>

            {/* Açıklama */}
            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-muted-foreground">
              Rezervasyon bilgileriniz başarıyla kaydedildi.
              Rezervasyon detaylarınız aşağıda yer almaktadır.
            </p>

            {/* Rezervasyon özeti */}
            <div className="mt-8 rounded-2xl bg-secondary/60 p-5 text-left">
              <div className="space-y-3 text-sm">

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Rezervasyon No
                  </span>
                  <span className="font-medium">
                    #{Date.now()}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Müşteri
                  </span>
                  <span className="font-medium">
                    {adSoyad}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Oda
                  </span>
                  <span className="font-medium text-right">
                    {taslak.oda.ad}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Giriş
                  </span>
                  <span className="font-medium">
                    {tarihFormat(taslak.giris)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Çıkış
                  </span>
                  <span className="font-medium">
                    {tarihFormat(taslak.cikis)}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">
                    Misafir
                  </span>
                  <span className="font-medium">
                    {taslak.misafir} kişi
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-t border-border pt-3">
                  <span className="font-medium">
                    Toplam
                  </span>
                  <span className="font-display text-xl font-semibold">
                    {tl(taslak.toplam)}
                  </span>
                </div>

              </div>
            </div>

            {/* Bilgi */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary p-4 text-left text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

              <p>
                Rezervasyon bilgileriniz sisteme kaydedildi.
                Rezervasyonunuzla ilgili bilgiler verdiğiniz e-posta
                adresi üzerinden takip edilebilir.
              </p>
            </div>

            {/* Ana sayfaya dön */}
            <button
              onClick={() => {
                window.location.href = "/";
              }}
              className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ana Sayfaya Dön
            </button>

          </div>
        </div>
      </motion.main>
    );
  }

  // ==========================================
  // ÖDEME EKRANI
  // ==========================================
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background px-5 pt-28 pb-20 lg:px-10"
    >
      <div className="mx-auto max-w-5xl">

        <button
          onClick={onGeri}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Rezervasyona dön
        </button>

        <h1 className="font-display text-4xl font-semibold">
          Ödeme
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Rezervasyon özetinizi kontrol edin ve ödeme adımına geçin.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

          {/* ÖDEME FORMU */}
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">

            <h2 className="font-display text-2xl font-semibold">
              Ödeme Bilgileri
            </h2>

            <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              DEMO — ÖRNEK FORM
            </p>

            <form onSubmit={handleOdeme} className="mt-6 space-y-5">

              {/* Kart üzerindeki isim */}
              <div>
                <label className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  Kart Üzerindeki İsim
                </label>

                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={adSoyad}
                  onChange={(e) => setAdSoyad(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Kart numarası */}
              <div>
                <label className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  Kart Numarası
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={19}
                  placeholder="0000 0000 0000 0000"
                  value={kartNumarasi}
                  onChange={(e) => setKartNumarasi(formatCardNumber(e.target.value))}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Son kullanma + CVC */}
              <div className="grid grid-cols-2 gap-5">

                <div>
                  <label className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Son Kullanma
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={5}
                    placeholder="AA/YY"
                    value={sonKullanma}
                    onChange={(e) => setSonKullanma(formatExpiry(e.target.value))}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    CVC
                  </label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={3}
                    placeholder="000"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

              </div>

              {/* E-posta + Telefon */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    E-posta
                  </label>

                  <input
                    type="email"
                    placeholder="ornek@eposta.com"
                    value={eposta}
                    onChange={(e) => setEposta(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Telefon Numarası
                  </label>

                  <input
                    type="tel"
                    inputMode="tel"
                    placeholder="05XX XXX XX XX"
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

              {/* Demo bilgi */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary p-4 text-xs text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />

                <p>
                  Bu bir tanıtım formudur. Kart bilgileri gerçek bir
                  ödeme işlemi için kullanılmaz.
                </p>
              </div>

              {/* Ödeme butonu */}
              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <CreditCard className="h-4 w-4" />
                {tl(taslak.toplam)} Öde
              </button>

            </form>
          </section>

          {/* REZERVASYON ÖZETİ */}
          <aside className="h-fit rounded-3xl border border-border bg-secondary/60 p-6 sm:p-8">

            <h2 className="font-display text-2xl font-semibold">
              Rezervasyon Özeti
            </h2>

            <dl className="mt-6 space-y-4 text-sm">

              <Satir
                etiket="Oda"
                deger={taslak.oda.ad}
              />

              <Satir
                etiket="Giriş"
                deger={tarihFormat(taslak.giris)}
              />

              <Satir
                etiket="Çıkış"
                deger={tarihFormat(taslak.cikis)}
              />

              <Satir
                etiket="Gece"
                deger={`${taslak.gece} gece`}
              />

              <Satir
                etiket="Misafir"
                deger={`${taslak.misafir} kişi`}
              />

              <Satir
                etiket="Pansiyon"
                deger={PANSIYON_ETIKET[taslak.pansiyon]}
              />

              <Satir
                etiket="Gecelik"
                deger={tl(taslak.geceUcreti)}
              />

            </dl>

            <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
              <span className="text-sm">
                Toplam Ücret
              </span>

              <span className="font-display text-3xl font-semibold">
                {tl(taslak.toplam)}
              </span>
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Ücretsiz iptal, girişten 48 saat öncesine kadar.
            </p>

          </aside>
        </div>
      </div>
    </motion.main>
  );
}

function Satir({
  etiket,
  deger,
}: {
  etiket: string;
  deger: string;
}) {
  return (
    <div className="flex items-start justify-between gap-6">
      <dt className="text-muted-foreground">
        {etiket}
      </dt>

      <dd className="text-right font-medium">
        {deger}
      </dd>
    </div>
  );
}
