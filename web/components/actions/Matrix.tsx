import type { LeverSystemMatrix, MatrixCell } from "@/lib/sync/parse";

const GLYPH: Record<MatrixCell, string> = {
  strong: "●",
  moderate: "◐",
  minor: "○",
  none: "",
};

export default function Matrix({ matrix }: { matrix: LeverSystemMatrix }) {
  return (
    <div className="table-scroll">
      <table className="matrix-table">
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Lever</span></th>
            {matrix.systems.map((s) => (
              <th key={s} scope="col">{s}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.rows.map((row) => (
            <tr key={row.slug}>
              <th scope="row">{row.lever}</th>
              {row.cells.map((c, i) => (
                <td key={i} className={`cell-${c}`} aria-label={c === "none" ? undefined : c}>
                  <span aria-hidden="true">{GLYPH[c]}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
