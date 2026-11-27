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
      <div className="container-x relative py-5 sm:py-7">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] py-1 pl-1.5 pr-2.5 text-[0.65rem] font-medium text-white/90 ring-1 ring-inset ring-white/15 backdrop-blur sm:gap-2 sm:py-1.5 sm:pl-2 sm:pr-4 sm:text-[0.9rem]">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-leaf sm:h-6 sm:w-6">
            <ShieldCheck className="h-3 w-3 text-white sm:h-3.5 sm:w-3.5" aria-hidden />
          </span>
          Verified Patient Assessment Programs
        </div>
      </div>
      <Footer />
      <MobileCta />
    </MotionConfig>
  );
}
