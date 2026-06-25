import type { OpenQuestionGroup } from "@/lib/sync/parse";
import { tierClass } from "@/lib/tier";

export default function OpenQuestionsFull({ groups }: { groups: OpenQuestionGroup[] }) {
  return (
    <div className="oq-groups">
      {groups.map((g) => (
        <section key={g.lever} className="oq-group">
          <h2>{g.lever}</h2>
          <ul className="oq-list">
            {g.questions.map((q, i) => (
              <li key={i} data-resolved={q.resolved} className={q.resolved ? "oq-item resolved" : "oq-item"}>
                <p className="oq-question">{q.question}</p>
                {q.bestGuess && q.bestGuess !== "—" && (
                  <p className="oq-guess"><strong>Best guess:</strong> {q.bestGuess}</p>
                )}
                {q.tier && <span className={tierClass(q.tier)}>{q.tier}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
