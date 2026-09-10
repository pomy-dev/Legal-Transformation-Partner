import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { XCircle } from 'lucide-react';

const boundaries = [
  'Issue B-BBEE verification certificates',
  'Represent itself as an independent verification agency',
  'Guarantee a B-BBEE level',
  'Guarantee a specific score',
  'Guarantee a verification outcome',
  'Act as the independent verifier of its own advisory work',
  'Claim to represent the Legal Sector Charter Council',
  'Claim endorsement, accreditation, appointment or approval by the Legal Sector Charter Council without documented authority',
];

export default function ProfessionalBoundaries() {
  const { ref, inView } = useInView();

  return (
    <section id="boundaries" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              PROFESSIONAL BOUNDARIES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What TLP <span className="gold-text">Does Not Do</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Transparency is one of our core principles. We clearly define our scope to ensure
              clients understand the distinction between advisory support and independent verification.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-muted/30">
              <p className="text-sm font-semibold text-foreground">TLP provides advisory and preparation services. TLP does not:</p>
            </div>
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
              <div className="divide-y divide-border/50">
                {boundaries.slice(0, 4).map((item, i) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 px-6 py-4"
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.5s ease ${i * 80}ms`,
                    }}
                  >
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-border/50">
                {boundaries.slice(4).map((item, i) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 px-6 py-4"
                    style={{
                      opacity: inView ? 1 : 0,
                      transition: `opacity 0.5s ease ${(i + 4) * 80}ms`,
                    }}
                  >
                    <XCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-primary/15 bg-primary/5 p-5">
            <p className="text-muted-foreground text-xs text-center leading-relaxed">
              Where independent verification or commissioning is required, the appropriate independent professional
              or authorized party remains responsible for that function.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
