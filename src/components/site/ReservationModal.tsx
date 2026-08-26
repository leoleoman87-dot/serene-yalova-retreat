import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, Users, BedDouble, UtensilsCrossed } from "lucide-react";
import { PANSIYON_ETIKET, tl, type OdaTipi, type Pansiyon } from "@/lib/yalova-data";
import { bugun, geceSayisi, type RezervasyonTaslak } from "@/lib/rezervasyon";
import { cn } from "@/lib/utils";

interface Props {
  oda: OdaTipi | null;
  tumOdalar: OdaTipi[];
  onKapat: () => void;
  onOdemeyeGec: (taslak: RezervasyonTaslak) => void;
}

export function ReservationModal({ oda, tumOdalar, onKapat, onOdemeyeGec }: Props) {
  return (
    <AnimatePresence>
      {oda && <Icerik key={oda.id} oda={oda} tumOdalar={tumOdalar} onKapat={onKapat} onOdemeyeGec={onOdemeyeGec} />}
    </AnimatePresence>
  );
}

function Icerik({
  oda,
  tumOdalar,
  onKapat,
  onOdemeyeGec,
}: {
  oda: OdaTipi;
  tumOdalar: OdaTipi[];
  onKapat: () => void;
  onOdemeyeGec: (taslak: RezervasyonTaslak) => void;
}) {
  const [odaId, setOdaId] = useState(oda.id);
  const secili = tumOdalar.find((o) => o.id === odaId) ?? oda;
  const pansiyonlar = Object.keys(secili.fiyatlar) as Pansiyon[];

  const [giris, setGiris] = useState(bugun());
  const [cikis, setCikis] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().slice(0, 10);
  });
  const [misafir, setMisafir] = useState(Math.max(1, secili.kapasite));
  const [pansiyon, setPansiyon] = useState<Pansiyon>(pansiyonlar[0]!);

  const gece = geceSayisi(giris, cikis);
  const geceUcreti = secili.fiyatlar[pansiyon] ?? 0;
  const toplam = useMemo(() => gece * geceUcreti, [gece, geceUcreti]);
  const gecerli = gece > 0 && geceUcreti > 0;

  const odaDegistir = (id: string) => {
    const yeni = tumOdalar.find((o) => o.id === id)!;
    setOdaId(id);
    setMisafir(Math.max(1, yeni.kapasite));
    const yeniPansiyonlar = Object.keys(yeni.fiyatlar) as Pansiyon[];
    if (!yeniPansiyonlar.includes(pansiyon)) setPansiyon(yeniPansiyonlar[0]!);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onKapat}
      role="dialog"
      aria-modal="true"
      aria-label="Rezervasyon formu"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-card p-6 shadow-xl sm:rounded-3xl sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">Rezervasyon</p>
            <h3 className="font-display text-2xl font-semibold">{secili.ad}</h3>
          </div>
          <button onClick={onKapat} aria-label="Kapat" className="rounded-full p-2 hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Alan etiket="Giriş Tarihi" ikon={<CalendarDays className="h-4 w-4" />}>
            <input
              type="date"
              value={giris}
              min={bugun()}
              onChange={(e) => setGiris(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </Alan>
          <Alan etiket="Çıkış Tarihi" ikon={<CalendarDays className="h-4 w-4" />}>
            <input
              type="date"
              value={cikis}
              min={giris}
              onChange={(e) => setCikis(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </Alan>
          <Alan etiket="Oda Türü" ikon={<BedDouble className="h-4 w-4" />}>
            <select
              value={odaId}
              onChange={(e) => odaDegistir(e.target.value)}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {tumOdalar.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.ad} ({o.kapasiteMetni})
                </option>
              ))}
            </select>
          </Alan>
          <Alan etiket="Misafir Sayısı" ikon={<Users className="h-4 w-4" />}>
            <input
              type="number"
              min={1}
              max={Math.max(secili.kapasite, 6)}
              value={misafir}
              onChange={(e) => setMisafir(Math.max(1, Number(e.target.value) || 1))}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </Alan>
        </div>

        <div className="mt-6">
          <p className="mb-3 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
            <UtensilsCrossed className="h-4 w-4" /> Pansiyon Tipi
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {pansiyonlar.map((p) => (
              <button
                key={p}
                onClick={() => setPansiyon(p)}
                className={cn(
                  "rounded-2xl border px-4 py-3 text-left transition-colors",
                  pansiyon === p
                    ? "border-primary bg-primary/10"
                    : "border-border bg-background hover:border-primary/50",
                )}
              >
                <span className="block text-xs text-muted-foreground">{PANSIYON_ETIKET[p]}</span>
                <span className="mt-1 block text-sm font-medium">{tl(secili.fiyatlar[p]!)} / gece</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 rounded-2xl bg-secondary p-5">
          <div className="flex items-center justify-between text-sm text-secondary-foreground">
            <span>
              {gece > 0 ? `${gece} gece × ${tl(geceUcreti)}` : "Lütfen geçerli tarih aralığı seçin"}
            </span>
            <span>{misafir} misafir</span>
          </div>
          <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
            <span className="text-sm">Toplam Tutar</span>
            <span className="font-display text-3xl font-semibold">{tl(toplam)}</span>
          </div>
        </div>

        <button
          disabled={!gecerli}
          onClick={() =>
            onOdemeyeGec({ oda: secili, giris, cikis, misafir, pansiyon, gece, geceUcreti, toplam })
          }
          className="mt-6 w-full rounded-full bg-primary px-6 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Rezervasyonu Tamamla / Ödemeye Geç
        </button>
      </motion.div>
    </motion.div>
  );
}

function Alan({
  etiket,
  ikon,
  children,
}: {
  etiket: string;
  ikon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase">
        {ikon} {etiket}
      </span>
      {children}
    </label>
  );
}
