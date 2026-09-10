import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import {
  ClipboardCheck, BookOpen, Map, GraduationCap, Home,
  Users, ShoppingCart, Building2, Heart, FileText,
  FileSignature, ShieldCheck
} from 'lucide-react';

const services = [
  { icon: ClipboardCheck, title: 'B-BBEE Health Checks', desc: 'Assessment of the client\'s current position against applicable requirements.' },
  { icon: BookOpen, title: 'Legal Sector Code Advisory', desc: 'Practical interpretation and application of relevant requirements to the client\'s circumstances.' },
  { icon: Map, title: 'Transformation Planning', desc: 'Development of practical transformation roadmaps tailored to your entity.' },
  { icon: GraduationCap, title: 'Skills Development Advisory', desc: 'Planning and documentation support for qualifying skills-development initiatives.' },
  { icon: Home, title: 'Ownership Advisory', desc: 'Assessment and planning relating to applicable ownership requirements.' },
  { icon: Users, title: 'Management Transformation Advisory', desc: 'Assessment and planning relating to applicable management and practitioner participation.' },
  { icon: ShoppingCart, title: 'Procurement Advisory', desc: 'Assessment and planning relating to procurement transformation.' },
  { icon: Building2, title: 'Enterprise & Supplier Development', desc: 'Planning and documentation support for applicable development initiatives.' },
  { icon: Heart, title: 'Socio-Economic Development Advisory', desc: 'Advisory on applicable qualifying contributions and supporting evidence.' },
  { icon: FileText, title: 'Evidence & Documentation Support', desc: 'Organization and review of information required to support transformation claims.' },
  { icon: FileSignature, title: 'B-BBEE Affidavit Preparation', desc: 'Assistance with preparing information and completing a draft affidavit for client review.' },
  { icon: ShieldCheck, title: 'Verification Readiness', desc: 'Preparation and organization before engagement with an independent verification professional.' },
];

export default function OurServices() {
  const { ref, inView } = useInView();

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              OUR SERVICES
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              What We <span className="gold-text">Offer</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Twelve specialist service categories covering every aspect of B-BBEE advisory
              and transformation support for the South African legal sector.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="gold-card bg-card rounded-xl p-6 flex flex-col gap-4 group"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary/60 tracking-widest">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="font-semibold text-foreground text-sm leading-snug mt-0.5">{title}</h3>
                  </div>
                </div>
                <div className="gold-divider" />
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
