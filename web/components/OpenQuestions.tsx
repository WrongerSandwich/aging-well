import { questions } from "@/lib/content";

export default function OpenQuestions() {
  return (
    <section className="questions shell">
      <div>
        <p className="eyebrow">Open questions</p>
        <h2>Uncertainty stays visible.</h2>
      </div>
      <div className="question-list">
        {questions.map((q) => (
          <p key={q.number}>
            <span>{q.number}</span>
            {q.text}
          </p>
        ))}
      </div>
    </section>
  );
}
