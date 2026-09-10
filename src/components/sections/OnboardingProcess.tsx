import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';

const steps = [
  {
    num: '01',
    title: 'Initial Consultation',
    desc: 'TLP obtains an understanding of the legal entity, professional structure, services, revenue category, ownership, workforce, current B-BBEE position, previous documentation, transformation objectives, and immediate business requirements.',
  },
  {
    num: '02',
    title: 'Confidentiality',
    desc: 'Where appropriate, TLP may enter into a confidentiality or non-disclosure agreement with the client before receiving confidential business information.',
  },
  {
    num: '03',
    title: 'Information Request',
    desc: 'TLP provides the client with a tailored information and document checklist.',
  },
  {
    num: '04',
    title: 'Threshold Assessment',
    desc: 'TLP assesses which category and requirements are applicable based on the information provided.',
  },
  {
    num: '05',
    title: 'Document Review',
    desc: 'Relevant information and supporting documents are reviewed in detail.',
  },
  {
    num: '06',
    title: 'B-BBEE Health Check',
    desc: 'TLP assesses the client\'s current position against the applicable framework.',
  },
  {
    num: '07',
    title: 'Gap Analysis',
    desc: 'Potential gaps, missing evidence and transformation opportunities are identified.',
  },
  {
    num: '08',
    title: 'Transformation Roadmap',
    desc: 'TLP prepares a practical roadmap: Current Position → Gap → Required Action → Responsibility → Evidence → Timeframe.',
  },
  {
    num: '09',
    title: 'Implementation Support',
    desc: 'Where included in the engagement, TLP assists the client with implementing agreed actions.',
  },
  {
    num: '10',
    title: 'Monitoring',
    desc: 'Progress and supporting evidence can be reviewed periodically to track transformation advancement.',
  },
  {
    num: '11',
    title: 'Verification Readiness',
    desc: 'Where an independent verification process is applicable, TLP can assist the client in organising and preparing its information and supporting documentation.',
  },
];

export default function OnboardingProcess() {
  const { ref, inView } = useInView(0.05);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="process" ref={ref as React.RefObject<HTMLElement>} className="relative py-24 px-4">
      <div className="absolute inset-0 bg-muted/20 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              CLIENT ONBOARDING
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our <span className="gold-text">11-Step Process</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
              A structured, transparent onboarding journey from initial consultation through to verification readiness.
            </p>
          </div>

          {/* Desktop timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />

              <div className="space-y-3">
                {steps.map((step, i) => (
                  <div
                    key={step.num}
                    className={`relative flex gap-6 cursor-pointer group`}
                    style={{
                      opacity: inView ? 1 : 0,
                      transform: inView ? 'translateX(0)' : 'translateX(-16px)',
                      transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms`,
                    }}
                    onClick={() => setActiveStep(activeStep === i ? null : i)}
                  >
                    {/* Step dot */}
                    <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold z-10 transition-all duration-300 border ${
                      activeStep === i
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-card border-border text-muted-foreground group-hover:border-primary/50 group-hover:text-primary'
                    }`}>
                      {step.num}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 bg-card rounded-lg border transition-all duration-300 overflow-hidden ${
                      activeStep === i ? 'border-primary/40' : 'border-border group-hover:border-primary/20'
                    }`}>
                      <div className="px-5 py-3 flex items-center justify-between">
                        <h3 className={`font-semibold text-sm transition-colors ${activeStep === i ? 'text-primary' : 'text-foreground group-hover:text-primary'}`}>
                          {step.title}
                        </h3>
                        <span className={`text-xs transition-transform duration-300 ${activeStep === i ? 'rotate-180 text-primary' : 'text-muted-foreground'}`}>▼</span>
                      </div>
                      {activeStep === i && (
                        <div className="px-5 pb-4 border-t border-border/50">
                          <p className="text-muted-foreground text-xs leading-relaxed pt-3">{step.desc}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile grid */}
          <div className="md:hidden grid grid-cols-1 gap-3">
            {steps.map((step, i) => (
              <div
                key={step.num}
                className="gold-card bg-card rounded-lg p-4 cursor-pointer"
                style={{
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${i * 50}ms`,
                }}
                onClick={() => setActiveStep(activeStep === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary shrink-0">{step.num}</span>
                  <h3 className="font-semibold text-foreground text-sm flex-1">{step.title}</h3>
                  <span className={`text-xs text-muted-foreground transition-transform duration-300 ${activeStep === i ? 'rotate-180' : ''}`}>▼</span>
                </div>
                {activeStep === i && (
                  <p className="text-muted-foreground text-xs leading-relaxed mt-3 pl-6">{step.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
