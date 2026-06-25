export default function PlainLanguageList({ items }: { items: string[] }) {
  return (
    <ol className="plain-list">
      {items.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ol>
  );
}
