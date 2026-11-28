import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { NAV_LINKS } from '../../content/navigation.js';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideOnScrollDown, setHideOnScrollDown] = useState(false);
  const [inHowSection, setInHowSection] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (y < 80) setHideOnScrollDown(false);
      else if (y > lastY + 4) setHideOnScrollDown(true);
      else if (y < lastY - 4) setHideOnScrollDown(false);

      const how = document.getElementById('how');
      if (how) {
        const rect = how.getBoundingClientRect();
        setInHowSection(rect.top <= 100 && rect.bottom > 100);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on Escape, lock body scroll while open, return focus to the toggle.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('a')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-2 pt-2 sm:px-5 sm:pt-4 transition-[transform,opacity] duration-300 ${hideOnScrollDown || inHowSection ? "-translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`} aria-hidden={hideOnScrollDown || inHowSection}>
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-14 max-w-[1240px] min-w-0 items-center justify-between gap-2 rounded-full bg-white pl-3 pr-1.5 ring-1 ring-ink/5 transition-shadow duration-300 sm:h-[66px] sm:gap-6 sm:pl-7 sm:pr-2 ${
          scrolled || open
            ? 'shadow-[0_18px_50px_-18px_rgb(1_21_73/0.45)]'
            : 'shadow-[0_18px_50px_-24px_rgb(0_0_0/0.5)]'
        }`}
      >
        <a href="#top" aria-label="WazzupPAP home" className="shrink-0 rounded-md">
          <Logo width={124} eager className="sm:!w-[156px]" />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink/75 transition-colors hover:text-ink hover:bg-paper">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block lg:order-2">
            <Button href="#demo" className="!min-h-11 !px-5">
              Request  demo
            </Button>
          </span>
          <img
            src="/Productbydigilateral.png"
            alt="Product by digiLATERAL"
            className="mr-1 h-9 w-auto shrink-0 object-contain sm:h-7 lg:order-1"
          />
          <button
            ref={toggleRef}
            type="button"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-ink ring-1 ring-inset ring-ink/15 sm:h-11 sm:w-11 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={panelRef}
            className="fixed inset-x-2 top-[72px] max-h-[calc(100dvh-84px)] overflow-y-auto rounded-[1.5rem] bg-white shadow-[0_30px_80px_-20px_rgb(1_21_73/0.55)] sm:inset-x-5 sm:top-[88px] sm:max-h-[calc(100dvh-104px)] lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col px-4 pt-1 sm:px-6 sm:pt-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href} className="border-b border-mist">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-xl font-semibold tracking-tight text-ink sm:py-5 sm:text-2xl"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-4 pb-5 pt-4 sm:px-6 sm:pb-7 sm:pt-6">
              <Button href="#demo" onClick={() => setOpen(false)} className="w-full">
                Request Demo
              </Button>
              <p className="mt-4 text-center text-sm text-slate">A digiLATERAL product</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
