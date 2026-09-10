import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { Search, AlertCircle, Map, Zap, FileText, Activity, Shield, RotateCcw } from 'lucide-react';

const cycleSteps = [
  { icon: Search, label: 'Assess', desc: 'Understand the client\'s current position.' },
  { icon: AlertCircle, label: 'Identify', desc: 'Find gaps, risks and opportunities.' },
  { icon: Map, label: 'Plan', desc: 'Develop practical actions.' },
  { icon: Zap, label: 'Implement', desc: 'Execute agreed initiatives.' },
  { icon: FileText, label: 'Document', desc: 'Maintain appropriate evidence.' },
  { icon: Activity, label: 'Monitor', desc: 'Track progress.' },
  { icon: Shield, label: 'Prepare', desc: 'Prepare for applicable independent measurement or verification.' },
  { icon: RotateCcw, label: 'Review', desc: 'Use the outcome of each cycle to inform future planning.' },
];

export default function OurApproach() {
  const { ref, inView } = useInView();

  return (
    <section id="approach" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              OUR APPROACH
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Transformation as a <span className="gold-text">Business Process</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              TLP encourages clients to treat transformation as an ongoing process
              rather than an annual document exercise. Our cyclic approach ensures
              continuous improvement and sustainable progress.
            </p>
          </div>

          {/* Cycle grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {cycleSteps.map(({ icon: Icon, label, desc }, i) => (
              <div
                key={label}
                className="gold-card bg-card rounded-xl p-5 text-center group"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms, border-color 0.3s ease, box-shadow 0.3s ease`,
                }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary/50 tracking-widest mb-1">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-bold text-foreground text-sm mb-2">{label}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Flow line */}
          <div className="hidden md:flex items-center justify-center gap-2 flex-wrap">
            {cycleSteps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary">{s.label}</span>
                {i < cycleSteps.length - 1 && (
                  <span className="text-primary/30 text-xs">→</span>
                )}
              </div>
            ))}
            <span className="text-primary/30 text-xs ml-1">↺</span>
          </div>
        </div>
      </div>
    </section>
  );
}
