import { REPO_URL } from "@/lib/repo";

export default function Footer() {
  return (
    <footer>
      <div className="shell footer-inner">
        <div>
          <strong>Aging Well</strong>
          <p>A living research snapshot, not medical advice.</p>
        </div>
        <div className="footer-links">
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            View source on GitHub ↗
          </a>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
