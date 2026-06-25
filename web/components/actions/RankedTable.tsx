import Link from "next/link";
import type { RankedAction } from "@/lib/sync/parse";

export default function RankedTable({ rows }: { rows: RankedAction[] }) {
  return (
    <table className="ranked-table">
      <thead>
        <tr>
          <th scope="col">#</th><th scope="col">Action</th><th scope="col">Lever</th>
          <th scope="col">Impact</th><th scope="col">Certainty</th><th scope="col">Rev</th><th scope="col">Evidence-only</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.rank}>
            <td>{r.rank}</td>
            <td>
              {r.action}
              {r.conditional && <span className="cond-tag"> (conditional)</span>}
            </td>
            <td><Link href={`/levers/${r.slug}`}>{r.lever}</Link></td>
            <td>{r.impact}</td>
            <td>{r.certainty}</td>
            <td>{r.rev}</td>
            <td><strong>{r.evidenceOnly}</strong></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
