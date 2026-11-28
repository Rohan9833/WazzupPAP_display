import Logo from '../ui/Logo.jsx';
import { NAV_LINKS } from '../../content/navigation.js';

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-white pb-28 pt-16 sm:pb-12" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Site footer</h2>
      <div className="container-x">
        <div className="flex flex-col gap-10 border-b border-mist pb-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a href="#top" aria-label="Back to top" className="inline-block rounded-md">
              <Logo width={196} />
            </a>
            <p className="mt-4 max-w-[24em] text-[0.95rem]">
              Verified Patient Assessment Programs. A patient assessment application, built to work within WhatsApp.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-[0.95rem] sm:flex sm:gap-8 lg:flex-nowrap lg:items-center lg:whitespace-nowrap">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ink/75 hover:text-ink">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#demo" className="font-semibold text-leaf-deep hover:text-ink">
                  Request  Demo
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-8 text-[0.85rem] text-slate sm:flex-row sm:justify-between">
          <p>
            WazzupPAP is a product of <span className="font-semibold text-ink">digiLATERAL</span>.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>© {YEAR} digiLATERAL. All rights reserved.</span>
            <a
              href="https://digilateral.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/75 underline underline-offset-2 hover:text-ink"
            >
              Privacy Policy
            </a>
          </p>
        </div>
        <p className="mt-4 max-w-[60em] text-[0.78rem] leading-relaxed text-slate/80">
          WhatsApp is a trademark of its respective owner. WazzupPAP is an independent product and is not affiliated
          with or endorsed by WhatsApp. Product visuals on this site are conceptual illustrations.
        </p>
      </div>
    </footer>
  );
}
