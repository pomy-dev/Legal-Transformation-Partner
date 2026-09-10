import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { Wrench, Database, MapPin, UserCheck, Eye, Target } from 'lucide-react';

const pillars = [
  {
    icon: Wrench,
    title: 'Practical',
    desc: 'We focus on actions that can be implemented. Our advisory is grounded in real-world application, not theoretical frameworks.',
  },
  {
    icon: Database,
    title: 'Evidence-Based',
    desc: 'Recommendations are linked to information and documentation. Every advisory position is supported by the relevant framework.',
  },
  {
    icon: MapPin,
    title: 'Sector-Specific',
    desc: 'Our services focus exclusively on the South African legal sector. Deep sector knowledge informs every engagement.',
  },
  {
    icon: UserCheck,
    title: 'Client-Specific',
    desc: 'We do not assume that every legal practice has the same requirements. Each engagement is individually assessed and tailored.',
  },
  {
    icon: Eye,
    title: 'Transparent',
    desc: 'We clearly distinguish between advisory guidance and independent verification. Our boundaries are explicit and consistently maintained.',
  },
  {
    icon: Target,
    title: 'Outcome-Focused',
    desc: 'We focus on the client\'s transformation objectives rather than promising a predetermined B-BBEE result.',
  },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView();

  return (
    <section id="why" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              WHY CHOOSE US
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Client <span className="gold-text">Engagement Approach</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              Six founding principles that define how we work with every client.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="relative gold-card bg-card rounded-xl p-6 group overflow-hidden"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 90}ms, transform 0.5s ease ${i * 90}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(192,148,44,0.06), transparent 70%)' }}
                />
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground text-base mb-2">{title}</h3>
                  <div className="w-8 h-px bg-primary/40 mb-3" />
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
