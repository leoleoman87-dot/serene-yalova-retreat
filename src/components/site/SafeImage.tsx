import { useState } from "react";
import { cn } from "@/lib/utils";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  eager?: boolean;
}

/**
 * Yalnızca /public/images/ altındaki yerel görselleri kullanır.
 * Görsel bulunamazsa zarif bir pastel placeholder gösterir.
 */
export function SafeImage({ src, alt, className, width, height, eager }: SafeImageProps) {
  const [hata, setHata] = useState(false);

  if (hata) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          "flex items-center justify-center bg-secondary text-secondary-foreground/70",
          className,
        )}
      >
        <span className="px-4 text-center text-xs tracking-[0.2em] uppercase">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      onError={() => setHata(true)}
      className={className}
    />
  );
}
