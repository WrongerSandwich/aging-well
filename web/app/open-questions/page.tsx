import { synthesis } from "@/lib/synthesis";
import OpenQuestionsFull from "@/components/OpenQuestionsFull";

export const metadata = {
  title: "Open questions · Aging Well",
  description: "Contested and unresolved questions, grouped by lever. Kept out of the ranking.",
};

export default function OpenQuestionsPage() {
  return (
    <main className="oq-page shell" id="top">
      <header className="lever-header">
        <p className="eyebrow">Uncertainty, made visible</p>
        <h1>Open questions</h1>
        <p className="hero-intro">
          Contested evidence and unresolved questions, kept deliberately out of the ranking
          so they don’t contaminate it with low-certainty noise.
        </p>
      </header>
      <OpenQuestionsFull groups={synthesis.openQuestions.groups} />
      <p className="claims-note">Speculative / hype-adjacent holding pen: none promoted yet.</p>
    </main>
  );
}
