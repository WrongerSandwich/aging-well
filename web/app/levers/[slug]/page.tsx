import { notFound } from "next/navigation";
import { detail } from "@/lib/detail";
import { synthesis } from "@/lib/synthesis";
import LeverDetailView from "@/components/lever/LeverDetailView";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(detail.levers).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lever = detail.levers[slug];
  return {
    title: lever ? `${lever.name} · Aging Well` : "Aging Well",
    description: lever?.scope?.slice(0, 150),
  };
}

export default async function LeverPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lever = detail.levers[slug];
  if (!lever) notFound();
  // Open questions live canonically on /open-questions (grouped by lever); the
  // lever page links to its section rather than duplicating the list.
  const openQuestionCount =
    synthesis.openQuestions.groups.find((g) => g.slug === slug)?.questions.length ?? 0;
  return (
    <LeverDetailView
      lever={lever}
      sources={detail.sources}
      openQuestionCount={openQuestionCount}
    />
  );
}
