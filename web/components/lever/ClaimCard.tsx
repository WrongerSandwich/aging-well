import type { Claim, Source } from "@/lib/sync/parse";
import { renderClaim } from "@/lib/renderClaim";
import { tierClass, tierText } from "@/lib/tier";
import Citations from "./Citations";

export default function ClaimCard({
  claim,
  sources,
  slug,
}: {
  claim: Claim;
  sources: Record<string, Source>;
  slug?: string;
}) {
  return (
    <article className="claim" id={slug ? `claim-${slug}-${claim.number}` : undefined}>
      <div className="claim-head">
        <span className="claim-number">{String(claim.number).padStart(2, "0")}</span>
        <span className={tierClass(claim.tier)}>{tierText(claim.tier)}</span>
      </div>
      <p className="claim-text">{renderClaim(claim.text, sources)}</p>
      <dl className="claim-meta">
        <div><dt>Systems</dt><dd>{claim.systems ? renderClaim(claim.systems, sources) : "—"}</dd></div>
        <div><dt>Effect</dt><dd>{renderClaim(claim.effect, sources)}</dd></div>
        <div><dt>Reversibility</dt><dd>{claim.reversibility ? renderClaim(claim.reversibility, sources) : "—"}</dd></div>
        <div><dt>Confidence</dt><dd>{claim.confidence ? renderClaim(claim.confidence, sources) : "—"}</dd></div>
      </dl>
      <Citations ids={claim.sources} sources={sources} />
    </article>
  );
}
