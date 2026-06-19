import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import Findings from "@/components/Findings";
import EvidenceTiers from "@/components/EvidenceTiers";
import StatusSection from "@/components/StatusSection";
import OpenQuestions from "@/components/OpenQuestions";

export default function Home() {
  return (
    <main id="top">
      <Hero />
      <Metrics />
      <Findings />
      <EvidenceTiers />
      <StatusSection />
      <OpenQuestions />
    </main>
  );
}
