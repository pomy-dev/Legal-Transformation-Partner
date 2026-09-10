import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';

const commitmentSteps = [
  'Understand the requirements.',
  'Assess the current position.',
  'Identify the gaps.',
  'Plan the transformation.',
  'Document the evidence.',
  'Support implementation.',
];

export default function OurCommitment() {
  const { ref, inView } = useInView();

  return (
    <section id="commitment" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(192,148,44,0.04) 0%, transparent 70%)' }}
      />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
            OUR COMMITMENT
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            A Simple <span className="gold-text">Founding Principle</span>
          </h2>
          <div className="w-16 gold-divider mx-auto mb-8" />

          <p className="text-foreground/80 text-base leading-relaxed mb-10 max-w-2xl mx-auto">
            Legal Transformation Partners is committed to providing responsible, practical and transparent
            B-BBEE advisory services to the South African legal sector.
          </p>

          {/* Commitment chain */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
            {commitmentSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <span
                  className="px-4 py-2 rounded-full border border-primary/30 text-primary text-sm font-medium bg-primary/5"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(8px)',
                    transition: `opacity 0.5s ease ${i * 100}ms, transform 0.5s ease ${i * 100}ms`,
                  }}
                >
                  {step}
                </span>
                {i < commitmentSteps.length - 1 && (
                  <span className="text-primary/30 text-sm hidden sm:inline">→</span>
                )}
              </div>
            ))}
          </div>

          <blockquote className="rounded-xl border border-primary/20 bg-card p-6 md:p-8">
            <p className="text-foreground/90 text-base md:text-lg font-medium leading-relaxed italic">
              "TLP's role is to help legal entities navigate their transformation journey
              with greater <span className="gold-text font-semibold">clarity</span> and{' '}
              <span className="gold-text font-semibold">structure</span>."
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
