import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { HelpCircle } from 'lucide-react';

const questions = [
  { q: 'Where are we now?', desc: 'Current B-BBEE position and standing.' },
  { q: 'What applies to our legal entity?', desc: 'Applicable requirements under the Legal Sector Code.' },
  { q: 'Where are the gaps?', desc: 'Identification of transformation shortfalls.' },
  { q: 'What evidence do we have?', desc: 'Review of existing documentation and records.' },
  { q: 'What evidence is missing?', desc: 'Gap analysis of supporting documentation.' },
  { q: 'What can we improve?', desc: 'Practical improvement opportunities.' },
  { q: 'What should we prioritize?', desc: 'Strategic prioritization of transformation actions.' },
  { q: 'What should we implement during the measurement period?', desc: 'Time-bound implementation planning.' },
  { q: 'How do we prepare for the applicable B-BBEE process?', desc: 'Structured readiness for verification or recognition.' },
];

export default function ValueProposition() {
  const { ref, inView } = useInView();

  return (
    <section id="value" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              VALUE PROPOSITION
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Questions We Help You <span className="gold-text">Answer</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              TLP provides legal-sector clients with a structured point of support between
              understanding the requirements and implementing a practical transformation response.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {questions.map(({ q, desc }, i) => (
              <div
                key={q}
                className="gold-card bg-card rounded-xl p-6 group"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <h3 className="font-bold text-foreground text-sm leading-snug">{q}</h3>
                </div>
                <div className="gold-divider mb-3" />
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Summary banner */}
          <div className="mt-10 rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8 text-center">
            <p className="text-foreground/90 text-base md:text-lg font-medium leading-relaxed">
              TLP provides a structured point of support between{' '}
              <span className="gold-text font-semibold">understanding the requirements</span>
              {' '}and implementing a{' '}
              <span className="gold-text font-semibold">practical transformation response</span>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
