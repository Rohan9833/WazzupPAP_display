import { MotionConfig } from 'motion/react';
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
      <Footer />
      <MobileCta />
    </MotionConfig>
  );
}
