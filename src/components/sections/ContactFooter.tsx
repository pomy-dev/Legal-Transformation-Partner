import { useInView } from '@/hooks/useInView';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, MessageSquareDotIcon } from 'lucide-react';

const contactEmail = 'legaltransformationpartners@gmail.com';
const contactPhone = '+27 764349385';
const whatsappUrl = 'https://wa.me/27764349385';

export default function ContactFooter() {
  const { ref, inView } = useInView();

  return (
    <footer id="contact" ref={ref as React.RefObject<HTMLElement>} className="relative pt-24 pb-12 px-4">
      <div className="absolute inset-0 bg-card/60 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">
        <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Contact CTA */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/15 text-primary border-primary/30 font-medium tracking-wider text-xs">
              GET IN TOUCH
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Start Your <span className="gold-text">Transformation Journey</span>
            </h2>
            <div className="w-16 gold-divider mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed mb-8">
              Ready to understand your B-BBEE position and develop a practical transformation plan?
              Reach out to discuss how TLP can assist your legal entity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold tracking-wide px-8"
                onClick={() => { window.location.href = `mailto:${contactEmail}`; }}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send Enquiry
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="border border-primary/30 text-primary hover:bg-primary/10 font-semibold px-8"
                onClick={() => { window.location.href = `tel:${contactPhone.replace(/\s/g, '')}`; }}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call Founder
              </Button>
            </div>
          </div>

          {/* Contact info cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-14">
            {[
              { icon: MapPin, label: 'Location', value: 'South Africa' },
              { icon: Mail, label: 'Email', value: contactEmail, href: `mailto:${contactEmail}` },
              { icon: MessageSquareDotIcon, label: 'Founder Director', value: 'Babalo Nombebe', href: `tel:${contactPhone.replace(/\s/g, '')}` },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="gold-card bg-background rounded-xl p-5 text-center flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">{label}</span>
                {label === 'Location' ? (
                  <span className="text-sm font-semibold text-foreground">{value}</span>
                ) : (
                  <a href={label === 'Email' ? `mailto:${contactEmail}` : whatsappUrl} target='_blank' rel='noreferrer' className="text-sm font-semibold text-foreground hover:text-primary">
                    {value}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="gold-divider mb-8" />

          {/* Footer bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo/logo.png"
                alt="Legal Transformation Partners logo"
                className="h-16 w-28 rounded-md bg-white/95 p-1 object-contain shadow-sm"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <div>
                <p className="text-sm font-semibold text-foreground">Babalo Nombebe, Founder Director</p>
                <p className="text-xs text-muted-foreground">Specialist B-BBEE Advisory &amp; Transformation Services</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs font-bold tracking-widest gold-text">ASSESS. ADVISE. PREPARE. TRANSFORM.</p>
            </div>

            <div className="text-right">
              <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="block text-xs text-muted-foreground hover:text-primary">
                {contactPhone}
              </a>
              <p className="text-xs text-muted-foreground mt-0.5">
                © {new Date().getFullYear()} Legal Transformation Partners (Pty) Ltd
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-3xl mx-auto">
              TLP is not a B-BBEE verification agency and does not issue B-BBEE verification certificates.
              TLP does not guarantee a particular B-BBEE level, score or verification outcome.
              Advisory services are provided as described. Independent verification remains the responsibility
              of appropriately authorized independent professionals.
            </p>
          </div>

          <div className="mt-5 text-center text-xs text-muted-foreground">
            <p>
              Powered By:{" "}
              <a
                href="https://indabuko-global.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:underline"
              >
                Indabuko Tech Crafts
              </a>
            </p>
            <p className="mt-1">
              <a href={`tel:${"+268 7695 7019".replace(/\s/g, '')}`} className="hover:text-primary">Call: +27 74 503 2009 / +268 7695 7019</a>
              {' / '}
              <a href={"https://wa.me/+268 7695 7019"} target="_blank" rel="noreferrer" className="hover:text-primary">WhatsApp</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
