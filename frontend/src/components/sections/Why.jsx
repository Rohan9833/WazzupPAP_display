import { Sparkles, Smartphone, BarChart3 } from 'lucide-react';

const pillars = [
  { word: 'New', icon: Sparkles, line: 'Patient assessment programs, initiated to completed on WhatsApp.' },
  { word: 'Convenient', icon: Smartphone, line: 'All on WhatsApp. No app, printer or hardware to roll out.' },
  { word: 'Useful', icon: BarChart3, line: 'Doctor consent, colour-branded reports and a real-time dashboard.' },
];

export default function Why() {
  return (
    <section id="why" className="relative bg-white pt-2 pb-12 sm:py-32" aria-labelledby="why-title">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-paper to-white" />
      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <h2 id="why-title" className="display-lg max-w-[16em]">
            Everything a patient assessment program needs. Nothing it doesn’t.
          </h2>
          <p className="lede max-w-[26em] lg:pb-2">
            One familiar app for the field force. One clear view for the brand team.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:mt-16 sm:grid-cols-3 sm:gap-6">
          {pillars.map(({ word, icon: Icon, line }) => (
            <li
              key={word}
              className="edge-card group relative flex items-start gap-5 overflow-hidden rounded-[1.75rem] p-6 shadow-[0_30px_60px_-40px_rgb(1_21_73/0.45)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_40px_70px_-40px_rgb(1_21_73/0.55)] sm:flex-col sm:gap-8 sm:p-9"
            >
              <span aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgb(0_156_109/0.12),transparent_70%)]" />
              <span className="icon-gem relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl sm:h-[4.25rem] sm:w-[4.25rem]">
                <Icon className="h-7 w-7 text-[#7beac3] sm:h-8 sm:w-8" strokeWidth={1.6} aria-hidden />
              </span>
              <span className="relative">
                <span className="block font-display text-[1.6rem] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[2.2rem]">
                  {word}
                </span>
                <span className="mt-2.5 block text-[1rem] leading-snug sm:mt-3.5 sm:text-[1.05rem]">{line}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
