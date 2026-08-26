import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck, CreditCard, Info } from "lucide-react";
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

  // Kart bilgileri
  const [kartNumarasi, setKartNumarasi] = useState("");
  const [sonKullanma, setSonKullanma] = useState("");
  const [cvc, setCvc] = useState("");

  const handleOdeme = (e: React.FormEvent) => {
    e.preventDefault();

    // Seçilen rezervasyon + müşteri + kart bilgilerini paketle
    const newBooking = {
      id: Date.now(),

      // Müşteri bilgileri
      customerName: adSoyad || "Misafir",
      email: eposta || "Belirtilmedi",

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

      // İşlem tarihi
      createdAt:
        new Date().toLocaleDateString("tr-TR") +
        " " +
        new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    };

    // Daha önceki rezervasyonları al
    const existingBookings = JSON.parse(
      localStorage.getItem("retreat_bookings") || "[]"
    );

    // Yeni rezervasyonu en başa ekle
    localStorage.setItem(
      "retreat_bookings",
      JSON.stringify([newBooking, ...existingBookings])
    );

    alert("Rezervasyonunuz alındı ve admin paneline yansıtıldı!");

    window.location.href = "/admin";
  };

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
          <ArrowLeft className="h-4 w-4" /> Rezervasyona dön
        </button>

        <h1 className="font-display text-4xl font-semibold">Ödeme</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Rezervasyon özetinizi kontrol edin ve ödeme adımına geçin.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
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
                <label className="block mb-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
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
                <label className="block mb-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  Kart Numarası
                </label>

                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={kartNumarasi}
                  onChange={(e) => setKartNumarasi(e.target.value)}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none"
                  required
                />
              </div>

              {/* Son kullanma + CVC */}
              <div className="grid grid-cols-2 gap-5">

                <div>
                  <label className="block mb-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    Son Kullanma
                  </label>

                  <input
                    type="text"
                    placeholder="AA/YY"
                    value={sonKullanma}
                    onChange={(e) => setSonKullanma(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
                    CVC
                  </label>

                  <input
                    type="text"
                    placeholder="000"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none"
                    required
                  />
                </div>

              </div>

              {/* E-posta */}
              <div>
                <label className="block mb-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
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

              <div className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary p-4 text-xs text-muted-foreground">
                <Info className="mt-0.5 h-4 w-4 shrink-0" />

                <p>
                  Bu bir tanıtım formudur. Kart bilgileri işlenmez veya saklanmaz.
                </p>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <CreditCard className="h-4 w-4" /> {tl(taslak.toplam)} Öde
              </button>

            </form>
          </section>

          {/* Rezervasyon Özeti */}
          <aside className="h-fit rounded-3xl border border-border bg-secondary/60 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">
              Rezervasyon Özeti
            </h2>

            <dl className="mt-6 space-y-4 text-sm">
              <Satir etiket="Oda" deger={taslak.oda.ad} />
              <Satir etiket="Giriş" deger={tarihFormat(taslak.giris)} />
              <Satir etiket="Çıkış" deger={tarihFormat(taslak.cikis)} />
              <Satir etiket="Gece" deger={`${taslak.gece} gece`} />
              <Satir etiket="Misafir" deger={`${taslak.misafir} kişi`} />
              <Satir
                etiket="Pansiyon"
                deger={PANSIYON_ETIKET[taslak.pansiyon]}
              />
              <Satir etiket="Gecelik" deger={tl(taslak.geceUcreti)} />
            </dl>

            <div className="mt-6 flex items-end justify-between border-t border-border pt-4">
              <span className="text-sm">Toplam Ücret</span>

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
      <dt className="text-muted-foreground">{etiket}</dt>

      <dd className="text-right font-medium">{deger}</dd>
    </div>
  );
    }
