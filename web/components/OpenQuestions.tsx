import Link from "next/link";
import { synthesis } from "@/lib/synthesis";

// One unresolved question from each of the first three distinct lever-groups, so
// the teaser shows the breadth of what's unresolved. Slicing the first three
// unresolved questions instead gave three from whichever lever leads the data
// (all Cannabis), which made a corpus-wide humility beat read as one niche debate.
export default function OpenQuestions() {
  const picks = synthesis.openQuestions.groups
    .flatMap((g) => {
      const q = g.questions.find((x) => !x.resolved);
      return q ? [q] : [];
    })
    .slice(0, 3);
  return (
    <section className="questions shell">
      <div>
        <p className="eyebrow">Open questions</p>
        <h2>Uncertainty stays visible.</h2>
        <Link className="primary-link" href="/open-questions">
          All open questions <span>→</span>
        </Link>
      </div>
      <ul className="question-list">
        {picks.map((q, i) => (
          <li key={i}>
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            {q.question}
          </li>
        ))}
      </ul>
    </section>
  );
}
