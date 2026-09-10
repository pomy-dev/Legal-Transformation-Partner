import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import {
  Gavel, TrendingUp, DollarSign, BookOpen, Home, Users,
  ShoppingCart, Building2, Heart, FileText
} from 'lucide-react';

const focusAreas = [
  { icon: Gavel, label: 'B-BBEE' },
  { icon: TrendingUp, label: 'Legal-Sector Transformation' },
  { icon: DollarSign, label: 'Economic Inclusion' },
  { icon: BookOpen, label: 'Skills Development' },
  { icon: Home, label: 'Ownership' },
  { icon: Users, label: 'Management Participation' },
  { icon: ShoppingCart, label: 'Procurement' },
  { icon: Building2, label: 'Enterprise & Supplier Development' },
  { icon: Heart, label: 'Socio-Economic Development' },
  { icon: FileText, label: 'Transformation Evidence & Documentation' },
];

export default function OurFocus() {
  const { ref, inView } = useInView();

  return (
    <section id="focus" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      {/* Subtle background tint */}
      <div className="absolute inset-0 bg-muted/30 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              OUR FOCUS
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              The <span className="gold-text">Intersection</span> We Navigate
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              TLP focuses specifically on the intersection of B-BBEE and legal-sector transformation,
              designed around the requirements of the Legal Sector Code.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {focusAreas.map(({ icon: Icon, label }, i) => (
              <div
                key={label}
                className="gold-card bg-card rounded-lg p-5 flex flex-col items-center text-center gap-3 cursor-default"
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs font-medium text-foreground/80 leading-snug">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
