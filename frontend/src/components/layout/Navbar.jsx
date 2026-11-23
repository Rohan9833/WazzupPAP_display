import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { NAV_LINKS } from '../../content/navigation.js';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={`mx-auto flex h-[60px] max-w-[1240px] items-center justify-between gap-6 rounded-full bg-white pl-5 pr-2 ring-1 ring-ink/5 transition-shadow duration-300 sm:h-[66px] sm:pl-7 ${
          scrolled || open
            ? 'shadow-[0_18px_50px_-18px_rgb(1_21_73/0.45)]'
            : 'shadow-[0_18px_50px_-24px_rgb(0_0_0/0.5)]'
        }`}
      >
        <a href="#top" aria-label="WazzupPAP home" className="shrink-0 rounded-md">
          <Logo width={138} eager className="sm:!w-[156px]" />
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
          <span className="hidden sm:block">
            <Button href="#demo" className="!min-h-11 !px-5">
              Request a demo
            </Button>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-ink ring-1 ring-inset ring-ink/15 lg:hidden"
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
            className="fixed inset-x-3 top-[80px] max-h-[calc(100dvh-96px)] overflow-y-auto rounded-[1.75rem] bg-white shadow-[0_30px_80px_-20px_rgb(1_21_73/0.55)] sm:inset-x-5 lg:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col px-6 pt-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href} className="border-b border-mist">
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 font-display text-2xl font-semibold tracking-tight text-ink"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-7 pt-6">
              <Button href="#demo" onClick={() => setOpen(false)} className="w-full">
                Request demo
              </Button>
              <p className="mt-4 text-center text-sm text-slate">A digiLATERAL product</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
