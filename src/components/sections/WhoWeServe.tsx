import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Scale, Building } from 'lucide-react';

const clientGroups = [
  {
    icon: Briefcase,
    title: 'Attorneys',
    items: [
      'Sole practitioners',
      'Small practices',
      'Boutique firms',
      'Partnerships',
      'Incorporated legal practices',
      'Specialist practices',
      'Larger law firms',
    ],
  },
  {
    icon: Scale,
    title: 'Advocates',
    items: [
      'Individual advocates',
      'Junior advocates',
      'Senior advocates',
      'Advocates operating through chambers',
      'Other applicable advocate practices',
    ],
  },
  {
    icon: Building,
    title: 'Other Legal-Sector Entities',
    items: [
      'Any legal-sector entity where relevant B-BBEE or transformation requirements apply',
      'Applicability determined on a client-by-client basis',
    ],
  },
];

export default function WhoWeServe() {
  const { ref, inView } = useInView();

  return (
    <section id="serve" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              WHO WE SERVE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our <span className="gold-text">Clients</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              TLP's services are available to legal-sector participants whose circumstances require
              B-BBEE or transformation advisory support.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {clientGroups.map(({ icon: Icon, title, items }, i) => (
              <div
                key={title}
                className="gold-card bg-card rounded-xl p-6 flex flex-col"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-md bg-primary/15 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-base">{title}</h3>
                </div>
                <div className="gold-divider mb-4" />
                <ul className="space-y-2 flex-1">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
