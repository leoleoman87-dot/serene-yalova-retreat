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
  const [uyari, setUyari] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background px-5 pt-28 pb-20 lg:px-10"
    >
      <div className="mx-auto max-w-5xl">
        <button
          onClick={onGeri}
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Rezervasyona dön
        </button>

        <h1 className="font-display text-4xl font-semibold">Ödeme</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Rezervasyon özetinizi kontrol edin ve ödeme adımına geçin.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Ödeme Bilgileri</h2>
            <p className="mt-1 text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Demo — Örnek Form
            </p>

            <div className="mt-6 space-y-5">
              <Alan etiket="Kart Üzerindeki İsim" placeholder="Ad Soyad" />
              <Alan etiket="Kart Numarası" placeholder="0000 0000 0000 0000" />
              <div className="grid grid-cols-2 gap-5">
                <Alan etiket="Son Kullanma" placeholder="AA/YY" />
                <Alan etiket="CVC" placeholder="000" />
              </div>
              <Alan etiket="E-posta" placeholder="ornek@eposta.com" tip="email" />
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary p-4 text-xs text-secondary-foreground">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                Bu bir tanıtım formudur. Kart bilgileri işlenmez, saklanmaz veya herhangi bir sunucuya
                gönderilmez. Lütfen gerçek kart bilgilerinizi girmeyin.
              </p>
            </div>

            <button
              onClick={() => setUyari(true)}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <CreditCard className="h-4 w-4" /> {tl(taslak.toplam)} Öde
            </button>

            {uyari && (
              <p className="mt-4 rounded-2xl border border-accent bg-accent/40 p-4 text-sm text-accent-foreground">
                Ödeme altyapısı henüz bağlı değil. Rezervasyonunuzu tamamlamak için lütfen bizi
                arayın: <strong>0850 000 00 00</strong>
              </p>
            )}
          </section>

          <aside className="h-fit rounded-3xl border border-border bg-secondary/60 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Rezervasyon Özeti</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <Satir etiket="Oda" deger={taslak.oda.ad} />
              <Satir etiket="Giriş" deger={tarihFormat(taslak.giris)} />
              <Satir etiket="Çıkış" deger={tarihFormat(taslak.cikis)} />
              <Satir etiket="Gece" deger={`${taslak.gece} gece`} />
              <Satir etiket="Misafir" deger={`${taslak.misafir} kişi`} />
              <Satir etiket="Pansiyon" deger={PANSIYON_ETIKET[taslak.pansiyon]} />
              <Satir etiket="Gecelik" deger={tl(taslak.geceUcreti)} />
            </dl>
            <div className="mt-6 flex items-end justify-between border-t border-border pt-5">
              <span className="text-sm">Toplam Ücret</span>
              <span className="font-display text-3xl font-semibold">{tl(taslak.toplam)}</span>
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" /> Ücretsiz iptal, girişten 48 saat öncesine
              kadar.
            </p>
          </aside>
        </div>
      </div>
    </motion.main>
  );
}

function Alan({ etiket, placeholder, tip = "text" }: { etiket: string; placeholder: string; tip?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">{etiket}</span>
      <input
        type={tip}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Satir({ etiket, deger }: { etiket: string; deger: string }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <dt className="text-muted-foreground">{etiket}</dt>
      <dd className="text-right font-medium">{deger}</dd>
    </div>
  );
}
