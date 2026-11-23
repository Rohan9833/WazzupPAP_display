import { useEffect, useState } from 'react';
import Button from '../ui/Button.jsx';

/**
 * Small-screen sticky demo CTA. Appears once the hero has scrolled away and
 * hides while the demo form itself is on screen.
 */
export default function MobileCta() {
  const [heroGone, setHeroGone] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const demo = document.getElementById('demo');
    if (!hero || !demo || !('IntersectionObserver' in window)) return undefined;

    const heroObs = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting), { threshold: 0 });
    const demoObs = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting), { threshold: 0.05 });
    heroObs.observe(hero);
    demoObs.observe(demo);
    return () => {
      heroObs.disconnect();
      demoObs.disconnect();
    };
  }, []);

  const show = heroGone && !formVisible;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-mist bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 ease-out sm:hidden ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      aria-hidden={!show}
    >
      <Button href="#demo" className="w-full" tabIndex={show ? 0 : -1}>
        Request a private demo
      </Button>
    </div>
  );
}
