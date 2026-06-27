import Link from "next/link";
import { synthesis } from "@/lib/synthesis";
import PlainLanguageList from "@/components/actions/PlainLanguageList";

// The home "takeaways" block is a teaser of the one canonical ranking, not a
// second list: it renders the plain-language summary straight from synthesis
// (the same source /actions reads) and links through to the full scored table.
// There is deliberately no numbering here — a numbered list on the home page is
// exactly what used to read as a competing ranking.
export default function Findings() {
  const { plainLanguage, rows } = synthesis.rankedActions;
  return (
    <section className="section shell" id="takeaways">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Current takeaways</p>
          <h2>The signal, so far.</h2>
        </div>
        <p className="section-note">
          The whole review in plain language. Each line condenses several of the{" "}
          {rows.length} actions that are scored and sorted on the ranking.
        </p>
      </div>

      <div className="takeaways-summary">
        <PlainLanguageList items={plainLanguage} />
      </div>

      <Link className="primary-link status-cta" href="/actions">
        See all {rows.length} ranked actions <span>→</span>
      </Link>
    </section>
  );
}
