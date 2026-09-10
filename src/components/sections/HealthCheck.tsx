import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { Building, Home, Users, GraduationCap, ShoppingCart, Building2, Heart, FileText } from 'lucide-react';

const healthCheckAreas = [
  {
    icon: Building,
    title: 'Entity',
    items: ['Entity type', 'Annual revenue', 'Applicable threshold', 'Professional structure', 'Ownership', 'Practitioner composition'],
  },
  {
    icon: Home,
    title: 'Ownership',
    items: ['Ownership information', 'Black ownership', "Black women's ownership", 'Voting rights', 'Economic interest', 'Supporting documentation'],
  },
  {
    icon: Users,
    title: 'Management',
    items: ['Management structure', 'Relevant representation', 'Practitioner participation', 'Supporting records'],
  },
  {
    icon: GraduationCap,
    title: 'Skills Development',
    items: ['Training expenditure', 'Training programs', 'Candidate development', 'Professional development', 'Qualifying beneficiaries', 'Supporting evidence'],
  },
  {
    icon: ShoppingCart,
    title: 'Procurement',
    items: ['Supplier expenditure', 'Supplier classifications', 'Black-owned suppliers', 'Black women-owned suppliers', 'Supporting documentation'],
  },
  {
    icon: Building2,
    title: 'Enterprise & Supplier Development',
    items: ['Existing initiatives', 'Beneficiaries', 'Qualifying contributions', 'Financial support', 'Non-financial support', 'Supporting documentation'],
  },
  {
    icon: Heart,
    title: 'Socio-Economic Development',
    items: ['Contributions', 'Beneficiaries', 'Qualifying documentation', 'Evidence'],
  },
  {
    icon: FileText,
    title: 'Evidence',
    items: ['Ownership records', 'Financial records', 'Payroll', 'Invoices', 'Training records', 'Supplier records', 'Policies', 'Contracts', 'Beneficiary documentation', 'Affidavits'],
  },
];

export default function HealthCheck() {
  const { ref, inView } = useInView();

  return (
    <section id="healthcheck" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              HEALTH CHECK
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              TLP Legal Sector <span className="gold-text">B-BBEE Health Check</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
              A structured assessment of the client's current position, covering all key elements
              of the Legal Sector Code. Designed to identify gaps, risks and opportunities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {healthCheckAreas.map(({ icon: Icon, title, items }, i) => (
              <div
                key={title}
                className="gold-card bg-card rounded-xl p-5 flex flex-col"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 70}ms, transform 0.5s ease ${i * 70}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm">{title}</h3>
                </div>
                <div className="gold-divider mb-3" />
                <ul className="space-y-1.5">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
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
