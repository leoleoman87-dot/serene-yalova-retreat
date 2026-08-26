import { useEffect, useState } from "react";
import { Menu, X, Droplets } from "lucide-react";
import { cn } from "@/lib/utils";

const baglantilar = [
  { id: "ana-sayfa", ad: "Ana Sayfa" },
  { id: "kaplicalar", ad: "Termal Kaplıcaları" },
  { id: "odalar", ad: "Konaklama / Odalar" },
  { id: "hamamlar", ad: "Banyo ve Hamamlar" },
  { id: "fiyatlar", ad: "Fiyatlar" },
  { id: "iletisim", ad: "İletişim" },
];

export function Navbar() {
  const [acik, setAcik] = useState(false);
  const [kaydirildi, setKaydirildi] = useState(false);

  useEffect(() => {
    const onScroll = () => setKaydirildi(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const git = (id: string) => {
    setAcik(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        kaydirildi ? "bg-background/90 shadow-sm backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-10">
        <button
          onClick={() => git("ana-sayfa")}
          className="flex items-center gap-2 text-left"
          aria-label="Yalova Termal ana sayfa"
        >
          <Droplets className="h-6 w-6 text-primary" />
          <span className="font-display text-xl leading-none font-semibold tracking-wide">
            Yalova Termal
            <span className="block font-sans text-[10px] tracking-[0.32em] text-muted-foreground uppercase">
              Spa & Otel
            </span>
          </span>
        </button>

        <ul className="hidden items-center gap-7 lg:flex">
          {baglantilar.map((b) => (
            <li key={b.id}>
              <button
                onClick={() => git(b.id)}
                className="text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                {b.ad}
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => git("fiyatlar")}
          className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 lg:inline-flex"
        >
          Rezervasyon Yap
        </button>

        <button
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setAcik((v) => !v)}
          aria-label={acik ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={acik}
        >
          {acik ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {acik && (
        <div className="border-t border-border bg-background/98 backdrop-blur-md lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-3">
            {baglantilar.map((b) => (
              <li key={b.id}>
                <button
                  onClick={() => git(b.id)}
                  className="w-full border-b border-border/60 py-3 text-left text-sm"
                >
                  {b.ad}
                </button>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <button
                onClick={() => git("fiyatlar")}
                className="w-full rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
              >
                Rezervasyon Yap
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
