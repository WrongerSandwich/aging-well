import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ProseSection({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  if (!body.trim()) return null;
  return (
    <section className="lever-prose">
      <h2>{title}</h2>
      <div className="prose-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </div>
    </section>
  );
}
