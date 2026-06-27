// Unordered: these lines are co-equal themes, not a ranking. The one canonical
// ranking lives on /actions; an ordered list here would read (and be announced
// to screen readers) as a competing one.
export default function PlainLanguageList({ items }: { items: string[] }) {
  return (
    <ul className="plain-list">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}
