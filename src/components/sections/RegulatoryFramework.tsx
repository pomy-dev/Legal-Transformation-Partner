import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Scale, Flag } from 'lucide-react';

const frameworks = [
  {
    icon: Flag,
    title: 'Constitution of the Republic of South Africa',
    desc: 'The foundational legal framework underpinning all transformation requirements.',
  },
  {
    icon: Scale,
    title: 'B-BBEE Act 53 of 2003',
    desc: 'The Broad-Based Black Economic Empowerment Act, as amended, governing all B-BBEE obligations.',
  },
  {
    icon: BookOpen,
    title: 'B-BBEE Codes of Good Practice',
    desc: 'Applicable Codes issued under the B-BBEE Act, establishing measurement criteria.',
  },
  {
    icon: BookOpen,
    title: 'Legal Sector Code of Good Practice',
    desc: 'Gazetted on 20 September 2024 in terms of section 9(1) of the B-BBEE Act. The primary reference for legal-sector entities.',
  },
  {
    icon: Scale,
    title: 'Applicable Legislation & Regulations',
    desc: 'All relevant legislation and regulations applicable to a client\'s circumstances.',
  },
  {
    icon: BookOpen,
    title: 'Official Guidance',
    desc: 'Relevant guidance or information published by competent authorities.',
  },
];

export default function RegulatoryFramework() {
  const { ref, inView } = useInView();

  return (
    <section id="regulatory" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              REGULATORY FRAMEWORK
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our <span className="gold-text">Reference Framework</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              TLP's advisory work references the following regulatory and policy framework,
              applied as applicable to each client's circumstances.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {frameworks.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="gold-card bg-card rounded-xl p-5 flex gap-4"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                <div className="shrink-0 w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center mt-0.5">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1.5 leading-snug">{title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-primary/15 bg-primary/5 p-5 text-center">
            <p className="text-muted-foreground text-xs leading-relaxed">
              <strong className="text-foreground/80">Note:</strong> TLP does not claim to represent, speak for, act on behalf of, or be affiliated with
              the Legal Sector Charter Council unless separately and expressly authorized to do so.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
