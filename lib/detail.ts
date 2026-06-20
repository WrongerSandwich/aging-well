import data from "./detail.json";
import type { LeverDetail, Source } from "./sync/parse";

export interface DetailData {
  generatedAt: string;
  levers: Record<string, LeverDetail>;
  sources: Record<string, Source>;
}

export const detail = data as DetailData;
