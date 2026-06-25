import type { DoNotBotherItem } from "@/lib/sync/parse";

export default function DoNotBother({ items }: { items: DoNotBotherItem[] }) {
  return (
    <ul className="do-not-bother">
      {items.map((it, i) => (
        <li key={i}>
          <span>{it.text}</span>
          {it.refs && <em className="dnb-ref">{it.refs}</em>}
        </li>
      ))}
    </ul>
  );
}
