import Link from "next/link";
import { synthesis } from "@/lib/synthesis";

export default function OpenQuestions() {
  const unresolved = synthesis.openQuestions.groups
    .flatMap((g) => g.questions)
    .filter((q) => !q.resolved)
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
        {unresolved.map((q, i) => (
          <li key={i}>
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            {q.question}
          </li>
        ))}
      </ul>
    </section>
  );
}
