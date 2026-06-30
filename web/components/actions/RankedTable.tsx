import Link from "next/link";
import type { RankedAction } from "@/lib/sync/parse";

export default function RankedTable({ rows }: { rows: RankedAction[] }) {
  return (
    <div className="table-scroll">
      <table className="ranked-table">
        <thead>
          <tr>
            <th scope="col" className="col-rank">#</th><th scope="col">Action</th><th scope="col">Lever</th>
            <th scope="col" className="col-num">Impact</th><th scope="col" className="col-num">Certainty</th>
            <th scope="col" className="col-num">Rev</th><th scope="col" className="col-num">Evidence-only</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.rank}>
              <td className="col-rank">{r.rank}</td>
              <td>
                {r.action}
                {r.conditional && <span className="cond-tag"> (conditional)</span>}
              </td>
              <td>
                <Link
                  href={r.claimRef ? `/levers/${r.claimRef.slug}#claim-${r.claimRef.slug}-${r.claimRef.claimNum}` : `/levers/${r.slug}#claims`}
                  title={`See the act-on evidence behind this score on the ${r.lever} lever`}
                >
                  {r.lever}
                </Link>
              </td>
              <td className="col-num">{r.impact}</td>
              <td className="col-num">{r.certainty}</td>
              <td className="col-num">{r.rev}</td>
              <td className="col-num"><strong>{r.evidenceOnly}</strong></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
