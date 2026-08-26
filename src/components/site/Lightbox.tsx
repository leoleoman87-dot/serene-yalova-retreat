import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SafeImage } from "@/components/site/SafeImage";
import { cn } from "@/lib/utils";

export interface LightboxGorsel {
  src: string;
  alt: string;
}

interface LightboxProps {
  acik: boolean;
  gorseller: LightboxGorsel[];
  aktif: number;
  baslik?: string;
  onKapat: () => void;
  onDegistir: (index: number) => void;
}

export function Lightbox({
  acik,
  gorseller,
  aktif,
  baslik,
  onKapat,
  onDegistir,
}: LightboxProps) {
  const kapatRef = useRef<HTMLButtonElement>(null);
  const toplam = gorseller.length;
  const mevcut = gorseller[Math.min(aktif, Math.max(toplam - 1, 0))];

  const onceki = useCallback(() => {
    if (toplam > 0) onDegistir((aktif - 1 + toplam) % toplam);
  }, [aktif, toplam, onDegistir]);

  const sonraki = useCallback(() => {
    if (toplam > 0) onDegistir((aktif + 1) % toplam);
  }, [aktif, toplam, onDegistir]);

  useEffect(() => {
    if (!acik) return;
    kapatRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onKapat();
      if (e.key === "ArrowLeft") onceki();
      if (e.key === "ArrowRight") sonraki();
    };
    window.addEventListener("keydown", onKey);
    const eskiOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = eskiOverflow;
    };
  }, [acik, onKapat, onceki, sonraki]);

  return (
    <AnimatePresence>
      {acik && mevcut ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={baslik ? `${baslik} görsel galerisi` : "Görsel galerisi"}
          onClick={onKapat}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
              <div className="min-w-0">
                {baslik ? (
                  <p className="truncate font-display text-lg font-semibold">{baslik}</p>
                ) : null}
                <p className="text-xs text-muted-foreground" aria-live="polite">
                  {aktif + 1} / {toplam} — {mevcut.alt}
                </p>
              </div>
              <button
                ref={kapatRef}
                onClick={onKapat}
                aria-label="Galeriyi kapat"
                className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative bg-secondary/40">
              <SafeImage
                src={mevcut.src}
                alt={mevcut.alt}
                width={1280}
                height={960}
                className="max-h-[60vh] w-full object-cover"
              />
              {toplam > 1 ? (
                <>
                  <button
                    onClick={onceki}
                    aria-label="Önceki görsel"
                    className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-card/90 p-2.5 text-foreground shadow-sm transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={sonraki}
                    aria-label="Sonraki görsel"
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-card/90 p-2.5 text-foreground shadow-sm transition-colors hover:bg-card focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              ) : null}
            </div>

            {toplam > 1 ? (
              <div className="flex gap-2 overflow-x-auto p-4">
                {gorseller.map((g, i) => (
                  <button
                    key={`${g.src}-${i}`}
                    onClick={() => onDegistir(i)}
                    aria-label={`${i + 1}. görseli göster: ${g.alt}`}
                    aria-current={i === aktif}
                    className={cn(
                      "h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                      i === aktif ? "border-primary" : "border-transparent opacity-70 hover:opacity-100",
                    )}
                  >
                    <SafeImage
                      src={g.src}
                      alt={g.alt}
                      width={240}
                      height={160}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
