import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Findings from "@/components/Findings";
import EvidenceTiers from "@/components/EvidenceTiers";
import OpenQuestions from "@/components/OpenQuestions";

export default function Home() {
  return (
    <main id="top" tabIndex={-1}>
      <Hero />
      <Findings />
      <EvidenceTiers />
      <OpenQuestions />
      {/* Corpus-scale metrics are process/volume, not "what to do" — kept as a
          quiet credibility capstone near the end rather than leading the page. */}
      <Metrics />
    </main>
  );
}
