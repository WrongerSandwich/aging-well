import data from "./sources.json";
import type { Source } from "./sync/parse";

export interface SourcesData {
  generatedAt: string;
  sources: Source[];
}

export const sources = data as SourcesData;
