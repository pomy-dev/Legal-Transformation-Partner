import { useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { Scale, FileCheck, Users } from 'lucide-react';

export default function CompanyProfile() {
  const { ref, inView } = useInView();

  return (
    <section id="about" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              COMPANY PROFILE
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Who We <span className="gold-text">Are</span>
            </h2>
            <div className="w-16 gold-divider mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Text content */}
            <div className="space-y-5">
              <p className="text-foreground/80 leading-relaxed text-base">
                <strong className="text-primary">Legal Transformation Partners (Pty) Ltd (TLP)</strong> is a South African
                emerging consultancy providing B-BBEE advisory and transformation support to participants in the legal sector.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Our services are focused on helping legal entities understand and respond to applicable B-BBEE and
                transformation requirements, including the <strong className="text-foreground/90">Legal Sector Code of Good Practice</strong>.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                TLP provides advisory, assessment, preparation and implementation-support services. We are{' '}
                <span className="text-primary font-semibold">not a B-BBEE verification agency</span> and do not issue
                B-BBEE verification certificates.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Our objective is to provide clients with practical information, structured assessments and transformation
                planning that can assist them in preparing for applicable B-BBEE measurement and verification processes.
              </p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-1 gap-4">
              {[
                {
                  icon: Scale,
                  title: 'Legal Sector Specialists',
                  desc: 'Dedicated exclusively to the South African legal sector with deep sector-specific knowledge.',
                },
                {
                  icon: FileCheck,
                  title: 'Advisory & Assessment',
                  desc: 'We assess, advise, prepare and support — but do not issue verification certificates.',
                },
                {
                  icon: Users,
                  title: 'Client-Specific Approach',
                  desc: "Every engagement is tailored to the individual client's structure, category and requirements.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="gold-card bg-card rounded-lg p-5 flex gap-4 items-start">
                  <div className="shrink-0 w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm mb-1">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
