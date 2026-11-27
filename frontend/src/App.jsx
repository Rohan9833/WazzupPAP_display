import { MotionConfig } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import MobileCta from './components/layout/MobileCta.jsx';
import Hero from './components/sections/Hero.jsx';
import Why from './components/sections/Why.jsx';
import Visibility from './components/sections/Visibility.jsx';
import Process from './components/sections/Process.jsx';
import Consent from './components/sections/Consent.jsx';
import Features from './components/sections/Features.jsx';
import DemoRequest from './components/sections/DemoRequest.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main id="main">
        <Hero />
        <Why />
        <Process />
        <Consent />
        <Visibility />
        <Features />
        <DemoRequest />
      </main>
      {/* Full-width verified consent disclaimer */}
      <section className="surface-night grain relative w-full overflow-hidden pb-6 pt-6 sm:pb-10 sm:pt-8 lg:pb-2">
        <div className="container-x relative">
          <div className="relative py-2 text-haze sm:py-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-leaf shadow-[0_12px_30px_-10px_rgb(0_156_109/0.8)]">
              <ShieldCheck className="h-6 w-6 text-white" strokeWidth={1.8} aria-hidden />
            </span>
            <h3 className="mt-6 text-[1.15rem] font-semibold tracking-[-0.01em] !text-white">What “Verified” means</h3>
            <p className="mt-2 max-w-[38em] text-[0.96rem] leading-relaxed">
              Every WazzupPAP program runs with the participating doctor’s prior consent. “Verified” refers to that
              consent. It is not a clinical verification of individual responses, a diagnosis or a screening outcome.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCta />
    </MotionConfig>
  );
}
