import { sources } from "@/lib/sources";
import SourcesTable from "@/components/SourcesTable";

export const metadata = {
  title: "Sources — Aging Well",
  description: "The full S001–S200 source index behind the research, filterable by evidence tier.",
};

export default function SourcesPage() {
  return (
    <main className="sources-page shell" id="top">
      <header className="lever-header">
        <p className="eyebrow">Evidence base</p>
        <h1>Sources</h1>
        <p className="hero-intro">
          Every source tracked across the project ({sources.sources.length} total), tagged
          by evidence tier.
        </p>
      </header>
      <SourcesTable sources={sources.sources} />
    </main>
  );
}
