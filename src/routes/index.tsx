import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Droplets,
  Waves,
  Flame,
  Leaf,
  HeartPulse,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { SafeImage } from "@/components/site/SafeImage";
import { ReservationModal } from "@/components/site/ReservationModal";
import { PaymentScreen } from "@/components/site/PaymentScreen";
import { odalar, PANSIYON_ETIKET, tl, type OdaTipi, type Pansiyon } from "@/lib/yalova-data";
import type { RezervasyonTaslak } from "@/lib/rezervasyon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yalova Termal — Lüks Termal Spa & Otel" },
      {
        name: "description",
        content:
          "Yalova Termal'de şifalı termal kaplıcalar, geleneksel hamam ritüelleri ve zarif konaklama. 2026 oda fiyatları ve online rezervasyon.",
      },
      { property: "og:title", content: "Yalova Termal — Lüks Termal Spa & Otel" },
      {
        property: "og:description",
        content:
          "Şifalı termal sular, hamam ritüelleri ve pastel toprak tonlarında zarif odalar. 2026 fiyatlarıyla rezervasyon yapın.",
      },
    ],
  }),
  component: Index,
});

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

function Index() {
  const [seciliOda, setSeciliOda] = useState<OdaTipi | null>(null);
  const [taslak, setTaslak] = useState<RezervasyonTaslak | null>(null);

  if (taslak) {
    return (
      <>
        <Navbar />
        <PaymentScreen taslak={taslak} onGeri={() => setTaslak(null)} />
      </>
    );
  }

  return (
    <div className="bg-background">
      <Navbar />

      <Hero onRezervasyon={() => setSeciliOda(odalar[3])} />
      <Kaplicalar />
      <Odalar onSec={setSeciliOda} />
      <Hamamlar />
      <Deneyimler />
      <Iletisim />
      <Footer />

      <ReservationModal
        oda={seciliOda}
        tumOdalar={odalar}
        onKapat={() => setSeciliOda(null)}
        onOdemeyeGec={(t) => {
          setSeciliOda(null);
          setTaslak(t);
          window.scrollTo({ top: 0 });
        }}
      />
    </div>
  );
}

function Hero({ onRezervasyon }: { onRezervasyon: () => void }) {
  return (
    <section id="ana-sayfa" className="relative min-h-[92vh] overflow-hidden">
      <SafeImage
        src="/images/hero.jpg"
        alt="Yalova Termal otelin buharı tüten açık termal havuzu"
        eager
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-5 pt-32 pb-20 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[11px] tracking-[0.4em] text-primary uppercase"
        >
          Yalova · Termal Vadi
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 max-w-3xl font-display text-5xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl"
        >
          Şifalı sularda dinlenmenin en zarif hâli
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          Doğal termal kaynaklar, geleneksel hamam ritüelleri ve sıcak kum tonlarında tasarlanmış
          odalarla; şehrin telaşından uzakta bir iyileşme mevsimi.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <button
            onClick={onRezervasyon}
            className="rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Rezervasyon Yap
          </button>
          <button
            onClick={() => document.getElementById("kaplicalar")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full border border-foreground/20 bg-background/60 px-8 py-4 text-sm font-medium backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
          >
            Termal Kaplıcaları Keşfet
          </button>
        </motion.div>

        <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { deger: "58°C", metin: "Kaynak sıcaklığı" },
            { deger: "7", metin: "Termal havuz" },
            { deger: "1900", metin: "Kuruluş yılı" },
            { deger: "24/7", metin: "Misafir desteği" },
          ].map((s) => (
            <div key={s.metin}>
              <p className="font-display text-3xl font-semibold">{s.deger}</p>
              <p className="text-xs tracking-wider text-muted-foreground uppercase">{s.metin}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Baslik({ ust, baslik, metin }: { ust: string; baslik: string; metin?: string }) {
  return (
    <motion.div {...fadeUp} className="max-w-2xl">
      <p className="text-[11px] tracking-[0.35em] text-primary uppercase">{ust}</p>
      <h2 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">{baslik}</h2>
      {metin && <p className="mt-4 text-muted-foreground">{metin}</p>}
    </motion.div>
  );
}

function Kaplicalar() {
  const ozellikler = [
    {
      ikon: Droplets,
      ad: "Mineral Zengini Kaynak",
      metin: "Sülfat, kalsiyum ve magnezyum bakımından zengin doğal termal su.",
    },
    {
      ikon: Waves,
      ad: "Kapalı & Açık Havuzlar",
      metin: "Yıl boyu 36–42°C arasında dengelenen yedi ayrı termal havuz.",
    },
    {
      ikon: HeartPulse,
      ad: "Terapi Programları",
      metin: "Uzman eşliğinde romatizma ve kas rahatlatma odaklı su terapileri.",
    },
  ];

  return (
    <section id="kaplicalar" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
      <Baslik
        ust="Termal Kaplıcaları"
        baslik="Yer altından gelen sıcaklık"
        metin="Yalova'nın asırlık termal kaynağı, mineral dengesi korunarak doğrudan havuzlarımıza aktarılır."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <motion.div {...fadeUp} className="overflow-hidden rounded-3xl">
          <SafeImage
            src="/images/kaplica.jpg"
            alt="Taş duvarlı kapalı termal havuz"
            width={1280}
            height={960}
            className="h-full min-h-[320px] w-full object-cover"
          />
        </motion.div>

        <div className="flex flex-col justify-center gap-6">
          {ozellikler.map((o, i) => (
            <motion.div
              key={o.ad}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-5 rounded-2xl border border-border bg-card p-6"
            >
              <o.ikon className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-display text-xl font-semibold">{o.ad}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{o.metin}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Odalar({ onSec }: { onSec: (o: OdaTipi) => void }) {
  return (
    <section id="odalar" className="bg-secondary/50 py-24">
      <div id="fiyatlar" className="mx-auto max-w-7xl px-5 lg:px-10">
        <Baslik
          ust="Konaklama · 2026 Fiyatları"
          baslik="Odalar ve fiyatlar"
          metin="Tüm fiyatlar gecelik ve oda başınadır. Kampanyalı yarım pansiyon seçeneklerinde %20 indirim uygulanır."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {odalar.map((oda, i) => (
            <motion.article
              key={oda.id}
              {...fadeUp}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
            >
              <SafeImage
                src={oda.gorsel}
                alt={`${oda.ad} görseli`}
                width={1280}
                height={960}
                className="h-48 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] tracking-[0.25em] text-primary uppercase">
                    {oda.kategori}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Users className="h-3.5 w-3.5" /> {oda.kapasiteMetni}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold">{oda.ad}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{oda.aciklama}</p>

                <ul className="mt-5 space-y-2">
                  {oda.ozellikler.map((o) => (
                    <li key={o} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-primary" /> {o}
                    </li>
                  ))}
                </ul>

                <dl className="mt-6 space-y-2 rounded-2xl bg-secondary p-4 text-sm">
                  {(Object.keys(oda.fiyatlar) as Pansiyon[]).map((p) => (
                    <div key={p} className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">{PANSIYON_ETIKET[p]}</dt>
                      <dd className="font-medium">{tl(oda.fiyatlar[p]!)}</dd>
                    </div>
                  ))}
                </dl>

                <button
                  onClick={() => onSec(oda)}
                  className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Rezervasyon Yap
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hamamlar() {
  const ritueller = [
    { ad: "Geleneksel Kese & Köpük", sure: "45 dk", metin: "Mermer göbek taşında klasik Türk hamamı ritüeli." },
    { ad: "Kil ve Adaçayı Banyosu", sure: "60 dk", metin: "Doğal kil maskesi ve adaçayı buharıyla arınma." },
    { ad: "Sıcak Taş Terapisi", sure: "50 dk", metin: "Bazalt taşlarla derin kas gevşemesi." },
  ];

  return (
    <section id="hamamlar" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Baslik
            ust="Banyo ve Hamamlar"
            baslik="Buharın içinde yavaşlayan zaman"
            metin="Mermer hamamlarımızda asırlık ritüeller, günümüz spa anlayışıyla yeniden yorumlanıyor."
          />
          <div className="mt-10 space-y-4">
            {ritueller.map((r, i) => (
              <motion.div
                key={r.ad}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex items-start justify-between gap-6 border-b border-border pb-4"
              >
                <div>
                  <h3 className="font-display text-xl font-semibold">{r.ad}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{r.metin}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {r.sure}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div {...fadeUp} className="overflow-hidden rounded-3xl">
          <SafeImage
            src="/images/hamam.jpg"
            alt="Mermer kaplı geleneksel hamam iç mekânı"
            width={1280}
            height={960}
            className="h-full min-h-[380px] w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Deneyimler() {
  const liste = [
    { ikon: Leaf, ad: "Bahçe Yürüyüşleri", metin: "Çınar ağaçları arasında sabah yürüyüş rotaları." },
    { ikon: Flame, ad: "Sauna & Buhar Odası", metin: "Fin saunası, tuz odası ve aromatik buhar odaları." },
    { ikon: Sparkles, ad: "Cilt Bakımı", metin: "Termal su bazlı yüz ve vücut bakım uygulamaları." },
    { ikon: HeartPulse, ad: "Detoks Menüsü", metin: "Yöresel malzemelerle hazırlanan hafif mutfak." },
  ];

  return (
    <section className="bg-secondary/50 py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <Baslik ust="Deneyim & Olanaklar" baslik="Konaklamanızı tamamlayan detaylar" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {liste.map((d, i) => (
            <motion.div
              key={d.ad}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <d.ikon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-xl font-semibold">{d.ad}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.metin}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Iletisim() {
  return (
    <section id="iletisim" className="mx-auto max-w-7xl px-5 py-24 lg:px-10">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <Baslik
            ust="İletişim"
            baslik="Size özel bir program hazırlayalım"
            metin="Rezervasyon, grup konaklaması ve terapi programları için ekibimize ulaşın."
          />
          <div className="mt-10 space-y-5 text-sm">
            <p className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-primary" /> 0850 000 00 00
            </p>
            <p className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-primary" /> rezervasyon@yalovatermal.com
            </p>
            <p className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-primary" /> Termal Mah. Kaplıca Cad. No:1, Termal / Yalova
            </p>
            <p className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-primary" /> Resepsiyon 24 saat açıktır
            </p>
          </div>
        </div>

        <motion.form
          {...fadeUp}
          onSubmit={(e) => e.preventDefault()}
          className="rounded-3xl border border-border bg-card p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Ad Soyad
              </span>
              <input
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="Adınız"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
                Telefon
              </span>
              <input
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                placeholder="05xx xxx xx xx"
              />
            </label>
          </div>
          <label className="mt-5 block">
            <span className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground uppercase">
              Mesajınız
            </span>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="Talebinizi kısaca yazın"
            />
          </label>
          <button className="mt-6 w-full rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Gönder
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-3 lg:px-10">
        <div>
          <p className="flex items-center gap-2 font-display text-2xl font-semibold">
            <Droplets className="h-5 w-5 text-primary" /> Yalova Termal
          </p>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Termal vadinin kalbinde, mineral zengini sularla dinlenmenin zarif adresi.
          </p>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">Keşfet</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>Termal Kaplıcaları</li>
            <li>Konaklama / Odalar</li>
            <li>Banyo ve Hamamlar</li>
            <li>Fiyatlar</li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="text-xs tracking-[0.25em] text-muted-foreground uppercase">İletişim</p>
          <ul className="mt-4 space-y-2 text-muted-foreground">
            <li>0850 000 00 00</li>
            <li>rezervasyon@yalovatermal.com</li>
            <li>Termal / Yalova</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-5 py-6 text-center text-xs text-muted-foreground lg:px-10">
        © {new Date().getFullYear()} Yalova Termal Spa & Otel. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
