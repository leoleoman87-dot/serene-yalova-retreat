import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Info,
  AlertCircle,
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

  const [kartNumarasi, setKartNumarasi] = useState("");
  const [sonKullanma, setSonKullanma] = useState("");
  const [cvc, setCvc] = useState("");

  const [odemeHatasi, setOdemeHatasi] = useState(false);
  const [rezervasyonNo, setRezervasyonNo] = useState("");

  const handleOdeme = (e: React.FormEvent) => {
    e.preventDefault();

    // Rezervasyon numarası
    const bookingId = Date.now();
    const bookingNumber = `YLV-${bookingId.toString().slice(-6)}`;

    // Rezervasyon bilgilerini oluştur
    const newBooking = {
      id: bookingId,
      reservationNumber: bookingNumber,

      // Müşteri
      customerName: adSoyad || "Misafir",
      email: eposta || "Belirtilmedi",

      // Rezervasyon
      roomName: taslak.oda.ad,
      checkIn: tarihFormat(taslak.giris),
      checkOut: tarihFormat(taslak.cikis),
      nights: `${taslak.gece} gece`,
      guests: `${taslak.misafir} kişi`,
      boardType: PANSIYON_ETIKET[taslak.pansiyon],

      // Ücret
      totalPrice: tl(taslak.toplam),

      // Ödeme durumu
      paymentStatus: "Başarısız",
      paymentErrorCode: "1005",

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

    // Yeni rezervasyonu admin paneline kaydet
    localStorage.setItem(
      "retreat_bookings",
      JSON.stringify([newBooking, ...existingBookings])
    );

    // Rezervasyon numarasını hata ekranında göstermek için kaydet
    setRezervasyonNo(bookingNumber);

    // Ayrı ödeme hata ekranına geç
    setOdemeHatasi(true);
  };

  // =====================================================
  // ÖDEME HATA EKRANI
  // =====================================================
  if (odemeHatasi) {
    return (
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-background px-5 pt-28 pb-20 lg:px-10"
      >
        <div className="mx-auto flex min-h-[70vh] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-border bg-card p-8 text-center shadow-sm sm:p-12">

            {/* Hata ikonu */}
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
              <AlertCircle className="h-11 w-11 text-destructive" />
            </motion.div>

            {/* Başlık */}
            <h1 className="mt-7 font-display text-3xl font-semibold sm:text-4xl">
              Ödeme Gerçekleştirilemedi
            </h1>

            {/* Hata kodu */}
            <div className="mt-5 inline-flex rounded-full bg-destructive/10 px-5 py-2 text-sm font-semibold text-destructive">
              Hata Kodu: 1005
            </div>

            {/* Açıklama */}
            <p className="mx-auto mt-6 max-w-lg text-sm leading-6 text-muted-foreground">
              Ödeme işleminiz sırasında beklenmeyen bir hata oluştu.
              Ödeme alınamadı.
            </p>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
              Rezervasyon talebiniz sisteme iletilmiştir.
              Müşteri temsilcimiz sizinle en kısa sürede iletişime
              geçecektir.
            </p>

            {/* Rezervasyon bilgileri */}
            <div className="mt-8 rounded-2xl bg-secondary/60 p-5 text-left">
              <div className="space-y-4 text-sm">

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Rezervasyon No
                  </span>

                  <span className="font-semibold">
                    {rezervasyonNo}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Müşteri
                  </span>

                  <span className="font-medium">
                    {adSoyad}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Oda
                  </span>

                  <span className="font-medium text-right">
                    {taslak.oda.ad}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Giriş
                  </span>

                  <span className="font-medium">
                    {tarihFormat(taslak.giris)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Çıkış
                  </span>

                  <span className="font-medium">
                    {tarihFormat(taslak.cikis)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
                  <span className="font-medium">
                    Toplam Tutar
                  </span>

                  <span className="font-display text-xl font-semibold">
                    {tl(taslak.toplam)}
                  </span>
                </div>

              </div>
            </div>

            {/* Müşteri temsilcisi mesajı */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-left text-xs text-yellow-800">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />

              <p>
                <strong>Bilgilendirme:</strong>{" "}
                Rezervasyon talebiniz alınmıştır. Ödeme işlemi
                tamamlanamadığı için müşteri temsilcimiz sizinle
                iletişime geçecektir.
              </p>
            </div>

            {/* Ana sayfa */}
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

  // =====================================================
  // ÖDEME EKRANI
  // =====================================================
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

            <form
              onSubmit={handleOdeme}
              className="mt-6 space-y-5"
            >

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
                  placeholder="0000 0000 0000 0000"
                  value={kartNumarasi}
                  onChange={(e) => setKartNumarasi(e.target.value)}
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
                    placeholder="AA/YY"
                    value={sonKullanma}
                    onChange={(e) =>
                      setSonKullanma(e.target.value)
                    }
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    CVC
                  </label>

                  <input
                    type="password"
                    placeholder="000"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

              </div>

              {/* E-posta */}
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

              {/* Demo uyarısı */}
              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary p-4 text-xs text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />

                <p>
                  Bu bir tanıtım formudur. Gerçek bir ödeme işlemi
                  gerçekleştirilmez.
                </p>
              </div>

              {/* ÖDE BUTONU */}
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
