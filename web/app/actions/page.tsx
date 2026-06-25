import Link from "next/link";
import { synthesis } from "@/lib/synthesis";
import RankedTable from "@/components/actions/RankedTable";
import PlainLanguageList from "@/components/actions/PlainLanguageList";
import DoNotBother from "@/components/actions/DoNotBother";
import Matrix from "@/components/actions/Matrix";

export const metadata = {
  title: "Ranked actions — Aging Well",
  description: "The evidence-only ranking of actions that matter most for aging well.",
};

export default function ActionsPage() {
  const { rankedActions, matrix } = synthesis;
  return (
    <main className="actions-page shell" id="top">
      <header className="lever-header">
        <p className="eyebrow">The output artifact</p>
        <h1>Ranked actions</h1>
        <p className="hero-intro">
          Sorted by <strong>Evidence-only</strong> = Impact × Certainty × Reversibility
          (max 75). The personal Tractability factor is deliberately excluded — apply it
          yourself.
        </p>
      </header>

      <section className="actions-section">
        <h2>In plain language</h2>
        <PlainLanguageList items={rankedActions.plainLanguage} />
      </section>

      <section className="actions-section">
        <h2>The ranking</h2>
        <RankedTable rows={rankedActions.rows} />
      </section>

      <section className="actions-section">
        <h2>Do NOT bother / actively avoid</h2>
        <p className="claims-note">Scored low or reversed — listed so they don’t creep back in.</p>
        <DoNotBother items={rankedActions.doNotBother} />
      </section>

      <section className="actions-section">
        <h2>Lever × system matrix</h2>
        <p className="claims-note">● strong · ◐ moderate · ○ minor — intervention value, not just association.</p>
        <Matrix matrix={matrix} />
      </section>

      <section className="actions-section personalize-callout">
        <h2>Make it yours</h2>
        <p>
          This ranking is universal. To turn it into your do-this-first list, add the one
          personal factor — how realistically you’ll sustain each action — and resolve the
          conditional rows against your own profile. The method and copy-and-fill templates
          live in the repository (<code>synthesis/personalize.md</code>); your overlay stays
          local and is never published.
        </p>
        <Link className="primary-link" href="/#status">← Back to overview</Link>
      </section>
    </main>
  );
}
