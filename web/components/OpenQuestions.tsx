import Link from "next/link";
import { synthesis } from "@/lib/synthesis";

// Home teaser for the open-questions page. It shows ONE representative question
// plus a count of the rest, deliberately, because slicing the first three gave
// three questions from whichever lever leads the data (all Cannabis), which made
// the corpus-wide "uncertainty" read as one niche debate. The count carries the
// breadth the single example can't.
export default function OpenQuestions() {
  const groups = synthesis.openQuestions.groups;
  const unresolved = groups.flatMap((g) => g.questions.filter((q) => !q.resolved));
  const leversWithQuestions = groups.filter((g) =>
    g.questions.some((q) => !q.resolved),
  ).length;
  const lead = unresolved[0];
  const more = unresolved.length - 1;
  return (
    <section className="questions shell">
      <div>
        <p className="eyebrow">Open questions</p>
        <h2>Uncertainty stays visible.</h2>
      </div>
      <div className="question-feature">
        {lead ? (
          <ul className="question-list">
            <li>
              <span aria-hidden="true">01</span>
              {lead.question}
            </li>
          </ul>
        ) : null}
        <Link className="primary-link question-more" href="/open-questions">
          Plus {more} more across {leversWithQuestions} levers <span>→</span>
        </Link>
      </div>
    </section>
  );
}
