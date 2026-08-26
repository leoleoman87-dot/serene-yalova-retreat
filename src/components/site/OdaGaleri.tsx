import { useState } from "react";
import { Expand } from "lucide-react";
import { SafeImage } from "@/components/site/SafeImage";
import { Lightbox, type LightboxGorsel } from "@/components/site/Lightbox";
import { cn } from "@/lib/utils";

interface OdaGaleriProps {
  baslik: string;
  gorseller: LightboxGorsel[];
}

export function OdaGaleri({ baslik, gorseller }: OdaGaleriProps) {
  const [acik, setAcik] = useState(false);
  const [aktif, setAktif] = useState(0);

  if (gorseller.length === 0) return null;

  const ana = gorseller[0]!;
  const kucukler = gorseller.slice(1, 4);

  const ac = (i: number) => {
    setAktif(i);
    setAcik(true);
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => ac(0)}
        aria-label={`${baslik} galerisini aç: ${ana.alt}`}
        className="group relative block w-full overflow-hidden focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset focus-visible:outline-none"
      >
        <SafeImage
          src={ana.src}
          alt={ana.alt}
          width={1280}
          height={960}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-medium text-foreground">
          <Expand className="h-3.5 w-3.5" /> {gorseller.length} görsel
        </span>
      </button>

      {kucukler.length > 0 ? (
        <div className="flex gap-2 px-3 pt-3">
          {kucukler.map((g, i) => (
            <button
              key={`${g.src}-${i}`}
              type="button"
              onClick={() => ac(i + 1)}
              aria-label={`${baslik} galerisini aç: ${g.alt}`}
              className={cn(
                "h-14 flex-1 overflow-hidden rounded-xl border border-border transition-opacity hover:opacity-80",
                "focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
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

      <Lightbox
        acik={acik}
        gorseller={gorseller}
        aktif={aktif}
        baslik={baslik}
        onKapat={() => setAcik(false)}
        onDegistir={setAktif}
      />
    </div>
  );
}
