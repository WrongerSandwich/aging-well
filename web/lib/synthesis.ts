import data from "./synthesis.json";
import type {
  RankedActions,
  LeverSystemMatrix,
  OpenQuestions,
} from "./sync/parse";

export interface SynthesisData {
  generatedAt: string;
  rankedActions: RankedActions;
  matrix: LeverSystemMatrix;
  openQuestions: OpenQuestions;
}

export const synthesis = data as SynthesisData;
