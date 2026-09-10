import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

const tagline = 'B-BBEE Advisory & Transformation Services for the South African Legal Sector';
const mottoWords = ['Assess.', 'Advise.', 'Prepare.', 'Transform.'];

export default function HeroSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [mottoVisible, setMottoVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setTitleVisible(true), 200);
    const t2 = setTimeout(() => setTaglineVisible(true), 600);
    const t3 = setTimeout(() => setMottoVisible(true), 1000);
    const t4 = setTimeout(() => setCtaVisible(true), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden dotted-bg">
      {/* Radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(192,148,44,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Logo */}
        <div
          className={`mb-8 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <img
            src="/images/logo/logo.png"
            alt="Legal Transformation Partners"
            className="h-28 md:h-36 w-auto object-contain mx-auto radius-lg drop-shadow-2xl"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>

        {/* Company name */}
        <h1
          className={`text-3xl md:text-5xl font-bold tracking-tight text-balance mb-4 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <span className="text-foreground">Legal </span>
          <span className="gold-text">Transformation</span>
          <span className="text-foreground"> Partners</span>
        </h1>
        <p className={`text-xs md:text-sm text-muted-foreground tracking-widest uppercase mb-6 font-medium transition-all duration-700 ${titleVisible ? 'opacity-100' : 'opacity-0'}`}>
          (Pty) Ltd
        </p>

        {/* Gold divider */}
        <div className={`w-32 gold-divider mb-6 transition-all duration-700 delay-300 ${titleVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} />

        {/* Tagline */}
        <p
          className={`text-base md:text-lg text-foreground/75 text-balance max-w-2xl leading-relaxed mb-8 font-light transition-all duration-700 ${taglineVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {tagline}
        </p>

        {/* Motto */}
        <div
          className={`flex flex-wrap justify-center gap-2 md:gap-4 mb-10 transition-all duration-700 ${mottoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {mottoWords.map((word, i) => (
            <span
              key={word}
              className="text-lg md:text-2xl font-bold gold-text"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {word}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide px-8 py-3 text-sm"
          >
            Enquire Now
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={scrollToAbout}
            className="border border-primary/40 text-primary hover:bg-primary/10 font-semibold tracking-wide px-8 py-3 text-sm"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-primary/50 hover:text-primary transition-all duration-700 animate-float ${ctaVisible ? 'opacity-100' : 'opacity-0'}`}
        aria-label="Scroll down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
