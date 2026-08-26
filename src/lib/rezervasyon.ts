import type { OdaTipi, Pansiyon } from "./yalova-data";

export interface RezervasyonTaslak {
  oda: OdaTipi;
  giris: string;
  cikis: string;
  misafir: number;
  pansiyon: Pansiyon;
  gece: number;
  geceUcreti: number;
  toplam: number;
}

export const geceSayisi = (giris: string, cikis: string) => {
  if (!giris || !cikis) return 0;
  const fark = new Date(cikis).getTime() - new Date(giris).getTime();
  return fark > 0 ? Math.round(fark / 86400000) : 0;
};

export const bugun = () => new Date().toISOString().slice(0, 10);

export const tarihFormat = (deger: string) =>
  deger
    ? new Date(deger).toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })
    : "—";
