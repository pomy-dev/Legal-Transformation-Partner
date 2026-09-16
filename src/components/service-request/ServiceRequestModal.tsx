import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, CheckCircle2, Send, User, Mail, Phone, Building2, FileText, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1 – Contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  role: string;
  // Step 2 – Service
  serviceCategory: string;
  entityType: string;
  urgency: string;
  // Step 3 – Details
  currentPosition: string;
  challenges: string;
  additionalInfo: string;
  preferredContact: string;
  referralSource: string;
}

const INITIAL: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  organization: '', role: '', serviceCategory: '',
  entityType: '', urgency: '', currentPosition: '',
  challenges: '', additionalInfo: '',
  preferredContact: '', referralSource: '',
};

// ─── Static data ──────────────────────────────────────────────────────────────

const SERVICES = [
  { value: 'health-check', label: 'B-BBEE Health Check' },
  { value: 'code-advisory', label: 'Legal Sector Code Advisory' },
  { value: 'transformation-planning', label: 'Transformation Planning' },
  { value: 'skills-development', label: 'Skills Development Advisory' },
  { value: 'ownership-advisory', label: 'Ownership Advisory' },
  { value: 'management-advisory', label: 'Management Transformation Advisory' },
  { value: 'procurement-advisory', label: 'Procurement Advisory' },
  { value: 'enterprise-supplier', label: 'Enterprise & Supplier Development' },
  { value: 'socio-economic', label: 'Socio-Economic Development Advisory' },
  { value: 'evidence-documentation', label: 'Evidence & Documentation Support' },
  { value: 'affidavit-preparation', label: 'B-BBEE Affidavit Preparation' },
  { value: 'verification-readiness', label: 'Verification Readiness' },
];

const ENTITY_TYPES = [
  { value: 'sole-attorney', label: 'Sole Practitioner (Attorney)' },
  { value: 'small-practice', label: 'Small Practice' },
  { value: 'boutique-firm', label: 'Boutique Firm' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'incorporated', label: 'Incorporated Legal Practice' },
  { value: 'specialist', label: 'Specialist Practice' },
  { value: 'large-firm', label: 'Larger Law Firm' },
  { value: 'individual-advocate', label: 'Individual Advocate' },
  { value: 'junior-advocate', label: 'Junior Advocate' },
  { value: 'senior-advocate', label: 'Senior Advocate' },
  { value: 'chambers', label: 'Advocate (Chambers)' },
  { value: 'other-legal', label: 'Other Legal-Sector Entity' },
];

const URGENCY = [
  { value: 'exploratory', label: 'Exploratory — No immediate deadline' },
  { value: 'planning', label: 'Planning phase — Within 3–6 months' },
  { value: 'upcoming', label: 'Upcoming measurement — Within 1–3 months' },
  { value: 'urgent', label: 'Urgent — Immediate assistance required' },
];

const CONTACT_PREF = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone call' },
  { value: 'video', label: 'Video consultation' },
  { value: 'in-person', label: 'In-person meeting' },
];

const REFERRAL = [
  { value: 'web-search', label: 'Web search' },
  { value: 'referral', label: 'Professional referral' },
  { value: 'social-media', label: 'Social media' },
  { value: 'legal-body', label: 'Legal association or body' },
  { value: 'colleague', label: 'Colleague / Word of mouth' },
  { value: 'other', label: 'Other' },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STEPS = ['Contact', 'Service', 'Details', 'Review'];
const SERVICE_REQUEST_ENDPOINT = import.meta.env.VITE_SERVICE_REQUEST_ENDPOINT
  ?? 'https://formsubmit.co/ajax/admin@legaltransformationpartners.com';

const formatSubmission = (form: FormData) => ({
  _subject: `New service enquiry: ${form.serviceCategory || 'Advisory services'} - ${form.organization || 'Website enquiry'}`,
  _template: 'table',
  _captcha: 'false',
  _replyto: form.email,
  'First name': form.firstName,
  'Last name': form.lastName,
  'Email address': form.email,
  'Phone number': form.phone || 'Not provided',
  'Organisation / practice': form.organization,
  'Role / title': form.role || 'Not provided',
  'Service required': SERVICES.find(service => service.value === form.serviceCategory)?.label ?? form.serviceCategory,
  'Legal entity type': ENTITY_TYPES.find(entity => entity.value === form.entityType)?.label ?? form.entityType,
  'Timeline / urgency': URGENCY.find(urgency => urgency.value === form.urgency)?.label ?? form.urgency,
  'Current B-BBEE position': form.currentPosition || 'Not provided',
  'Primary challenge or objective': form.challenges,
  'Additional information': form.additionalInfo || 'Not provided',
  'Preferred contact method': CONTACT_PREF.find(contact => contact.value === form.preferredContact)?.label ?? form.preferredContact,
  'Referral source': (REFERRAL.find(referral => referral.value === form.referralSource)?.label ?? form.referralSource) || 'Not provided',
});

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-destructive mt-1">
      <AlertCircle className="h-3 w-3 shrink-0" />{msg}
    </p>
  );
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-6">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300 ${i < current ? 'bg-primary border-primary text-primary-foreground' :
              i === current ? 'bg-primary/20 border-primary text-primary' :
                'bg-muted border-border text-muted-foreground'
              }`}>
              {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`text-[10px] font-medium tracking-wide whitespace-nowrap hidden sm:block transition-colors ${i === current ? 'text-primary' : i < current ? 'text-primary/70' : 'text-muted-foreground'
              }`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`w-8 md:w-12 h-px mx-1 mt-[-10px] sm:mt-[-22px] transition-colors ${i < current ? 'bg-primary/60' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface ServiceRequestModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ServiceRequestModal({ open, onClose }: ServiceRequestModalProps) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission status
  const [submitError, setSubmitError] = useState(false);
  const [submissionReference, setSubmissionReference] = useState('');
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back

  const set = (key: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const setSelect = (key: keyof FormData) => (val: string) => {
    setForm(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  // Validation per step
  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (step === 0) {
      if (!form.firstName.trim()) e.firstName = 'First name is required.';
      if (!form.lastName.trim()) e.lastName = 'Last name is required.';
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'A valid email address is required.';
      if (!form.organization.trim()) e.organization = 'Organisation / practice name is required.';
    }
    if (step === 1) {
      if (!form.serviceCategory) e.serviceCategory = 'Please select a service.';
      if (!form.entityType) e.entityType = 'Please select your entity type.';
      if (!form.urgency) e.urgency = 'Please indicate your timeline.';
    }
    if (step === 2) {
      if (!form.challenges.trim()) e.challenges = 'Please describe your primary challenge or objective.';
      if (!form.preferredContact) e.preferredContact = 'Please select a preferred contact method.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate()) return;
    setDirection(1);
    setStep(s => s + 1);
  };

  const back = () => {
    setDirection(-1);
    setStep(s => s - 1);
  };

  const submit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(false);

    try {
      const response = await fetch(SERVICE_REQUEST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formatSubmission(form)),
      });

      if (response.ok) {
        const result = await response.json().catch(() => null);
        if (result?.success === false) {
          throw new Error(result.message || 'The email relay rejected the enquiry.');
        }
        setSubmissionReference(`TLP-${Date.now().toString(36).toUpperCase()}`);
        setSubmitted(true);
      } else {
        throw new Error(`Email relay responded with ${response.status}.`);
      }
    } catch (error) {
      setSubmitError(true);
      console.error('Service request submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after close animation completes
    setTimeout(() => {
      setStep(0);
      setForm(INITIAL);
      setErrors({});
      setSubmitted(false);
      setSubmissionReference('');
    }, 400);
  };

  // Slide variants
  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -40 : 40, opacity: 0 }),
  };

  const service = SERVICES.find(s => s.value === form.serviceCategory)?.label ?? '—';
  const entity = ENTITY_TYPES.find(e => e.value === form.entityType)?.label ?? '—';
  const urgencyLabel = URGENCY.find(u => u.value === form.urgency)?.label ?? '—';
  const contactLabel = CONTACT_PREF.find(c => c.value === form.preferredContact)?.label ?? '—';

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-[calc(100%-2rem)] md:max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90dvh]">

              {/* Header */}
              <div className="shrink-0 px-6 pt-6 pb-4 border-b border-border bg-gradient-to-r from-card to-muted/30">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-gold-pulse" />
                      <span className="text-xs font-bold tracking-widest text-primary uppercase">Service Request</span>
                    </div>
                    <h2 className="text-lg font-bold text-foreground leading-tight">
                      Request Advisory Services
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Legal Transformation Partners (Pty) Ltd
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {!submitted && <StepIndicator current={step} />}
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col items-center justify-center py-10 text-center gap-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Enquiry Submitted</h3>
                      <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
                        Thank you, <strong className="text-foreground">{form.firstName}</strong>. A member of the TLP team will
                        review your request and be in touch via{' '}
                        <strong className="text-foreground">{contactLabel.toLowerCase()}</strong> within 1–2 business days.
                      </p>
                    </div>
                    <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 px-5 py-4 text-left w-full max-w-sm">
                      <p className="text-xs text-muted-foreground mb-1">Service requested</p>
                      <p className="text-sm font-semibold text-foreground">{service}</p>
                      <p className="text-xs text-muted-foreground mt-2 mb-1">Reference</p>
                      <p className="text-sm font-mono text-primary">{submissionReference}</p>
                    </div>
                    <Button
                      className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="wait" custom={direction}>
                    {step === 0 && (
                      <motion.div key="step0" custom={direction} variants={variants}
                        initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.22, ease: 'easeInOut' }}>
                        <SectionTitle icon={User} title="Contact Information" subtitle="Tell us about yourself and your practice." />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label>First Name <Req /></Label>
                            <Input className="mt-1" placeholder="e.g. Sarah" value={form.firstName} onChange={set('firstName')} />
                            <FieldError msg={errors.firstName} />
                          </div>
                          <div>
                            <Label>Last Name <Req /></Label>
                            <Input className="mt-1" placeholder="e.g. Dlamini" value={form.lastName} onChange={set('lastName')} />
                            <FieldError msg={errors.lastName} />
                          </div>
                          <div>
                            <Label className="flex items-center gap-1"><Mail className="h-3 w-3" /> Email Address <Req /></Label>
                            <Input className="mt-1" type="email" placeholder="you@firm.co.za" value={form.email} onChange={set('email')} />
                            <FieldError msg={errors.email} />
                          </div>
                          <div>
                            <Label className="flex items-center gap-1"><Phone className="h-3 w-3" /> Phone Number</Label>
                            <Input className="mt-1" type="tel" placeholder="+27 00 000 0000" value={form.phone} onChange={set('phone')} />
                          </div>
                          <div className="sm:col-span-2">
                            <Label className="flex items-center gap-1"><Building2 className="h-3 w-3" /> Organisation / Practice Name <Req /></Label>
                            <Input className="mt-1" placeholder="e.g. Dlamini Attorneys Inc." value={form.organization} onChange={set('organization')} />
                            <FieldError msg={errors.organization} />
                          </div>
                          <div className="sm:col-span-2">
                            <Label>Your Role / Title</Label>
                            <Input className="mt-1" placeholder="e.g. Managing Partner, Director" value={form.role} onChange={set('role')} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 1 && (
                      <motion.div key="step1" custom={direction} variants={variants}
                        initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.22, ease: 'easeInOut' }}>
                        <SectionTitle icon={FileText} title="Service Selection" subtitle="Select the service you require and provide context about your practice." />
                        <div className="space-y-4">
                          <div>
                            <Label>Service Required <Req /></Label>
                            <Select value={form.serviceCategory} onValueChange={setSelect('serviceCategory')}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select a service…" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                {SERVICES.map(s => (
                                  <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError msg={errors.serviceCategory} />
                          </div>
                          <div>
                            <Label>Legal Entity Type <Req /></Label>
                            <Select value={form.entityType} onValueChange={setSelect('entityType')}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select entity type…" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                {ENTITY_TYPES.map(e => (
                                  <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError msg={errors.entityType} />
                          </div>
                          <div>
                            <Label>Timeline / Urgency <Req /></Label>
                            <Select value={form.urgency} onValueChange={setSelect('urgency')}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select urgency…" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                {URGENCY.map(u => (
                                  <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError msg={errors.urgency} />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div key="step2" custom={direction} variants={variants}
                        initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.22, ease: 'easeInOut' }}>
                        <SectionTitle icon={MessageSquare} title="Engagement Details" subtitle="Help us understand your situation so we can prepare accordingly." />
                        <div className="space-y-4">
                          <div>
                            <Label>Current B-BBEE Position (if known)</Label>
                            <Input className="mt-1" placeholder="e.g. Level 4, Exempt, Non-compliant, Unsure" value={form.currentPosition} onChange={set('currentPosition')} />
                          </div>
                          <div>
                            <Label>Primary Challenge or Objective <Req /></Label>
                            <Textarea
                              className="mt-1 min-h-[90px] resize-none"
                              placeholder="Describe what you are trying to achieve or the challenge you are facing…"
                              value={form.challenges}
                              onChange={set('challenges')}
                            />
                            <FieldError msg={errors.challenges} />
                          </div>
                          <div>
                            <Label>Additional Information</Label>
                            <Textarea
                              className="mt-1 min-h-[70px] resize-none"
                              placeholder="Any other context, deadlines, or information you wish to share…"
                              value={form.additionalInfo}
                              onChange={set('additionalInfo')}
                            />
                          </div>
                          <div>
                            <Label>Preferred Contact Method <Req /></Label>
                            <Select value={form.preferredContact} onValueChange={setSelect('preferredContact')}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="How would you like to be contacted?" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                {CONTACT_PREF.map(c => (
                                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FieldError msg={errors.preferredContact} />
                          </div>
                          <div>
                            <Label>How did you hear about TLP?</Label>
                            <Select value={form.referralSource} onValueChange={setSelect('referralSource')}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select source…" />
                              </SelectTrigger>
                              <SelectContent className="bg-card border-border">
                                {REFERRAL.map(r => (
                                  <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {step === 3 && (
                      <motion.div key="step3" custom={direction} variants={variants}
                        initial="enter" animate="center" exit="exit"
                        transition={{ duration: 0.22, ease: 'easeInOut' }}>
                        <SectionTitle icon={CheckCircle2} title="Review & Submit" subtitle="Please confirm your details before submitting." />
                        <div className="space-y-3">
                          <ReviewBlock title="Contact">
                            <ReviewRow label="Name" value={`${form.firstName} ${form.lastName}`} />
                            <ReviewRow label="Email" value={form.email} />
                            {form.phone && <ReviewRow label="Phone" value={form.phone} />}
                            <ReviewRow label="Organisation" value={form.organization} />
                            {form.role && <ReviewRow label="Role" value={form.role} />}
                          </ReviewBlock>
                          <ReviewBlock title="Service">
                            <ReviewRow label="Service" value={service} />
                            <ReviewRow label="Entity Type" value={entity} />
                            <ReviewRow label="Timeline" value={urgencyLabel} />
                          </ReviewBlock>
                          <ReviewBlock title="Details">
                            {form.currentPosition && <ReviewRow label="Current Position" value={form.currentPosition} />}
                            <ReviewRow label="Primary Challenge" value={form.challenges} multiline />
                            {form.additionalInfo && <ReviewRow label="Additional Info" value={form.additionalInfo} multiline />}
                            <ReviewRow label="Preferred Contact" value={contactLabel} />
                          </ReviewBlock>
                        </div>
                        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                          By submitting this form you confirm that the information provided is accurate.
                          TLP will use this information solely to assess and respond to your enquiry.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>

              {/* Footer navigation */}
              {!submitted && (
                <div className="relative shrink-0 px-6 py-4 border-t border-border bg-muted/20 flex items-center justify-between gap-3">
                  {submitError && (
                    <p className="absolute bottom-[4.5rem] left-6 right-6 rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                      We could not send your enquiry. Please check your connection and try again.
                    </p>
                  )}
                  {step > 0 ? (
                    <Button variant="ghost" onClick={back} className="text-muted-foreground hover:text-foreground border border-border gap-1">
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                  ) : (
                    <Button variant="ghost" onClick={handleClose} className="text-muted-foreground hover:text-foreground border border-border">
                      Cancel
                    </Button>
                  )}

                  <div className="text-xs text-muted-foreground hidden sm:block">
                    Step {step + 1} of {STEPS.length}
                  </div>

                  {step < STEPS.length - 1 ? (
                    <Button
                      onClick={next}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1"
                    >
                      Continue <ChevronRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      onClick={submit}
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gap-1"
                    >
                      <Send className="h-4 w-4" /> {isSubmitting ? 'Sending…' : 'Submit Enquiry'}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Req() {
  return <span className="text-primary ml-0.5">*</span>;
}

function SectionTitle({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="font-bold text-foreground text-sm">{title}</h3>
      </div>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
      <div className="w-10 h-px bg-primary/40 mt-2" />
    </div>
  );
}

function ReviewBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden">
      <div className="px-4 py-2 bg-muted/30 border-b border-border">
        <span className="text-xs font-bold text-primary tracking-wider uppercase">{title}</span>
      </div>
      <div className="divide-y divide-border/50">{children}</div>
    </div>
  );
}

function ReviewRow({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className={`px-4 py-2.5 flex ${multiline ? 'flex-col gap-0.5' : 'items-center justify-between gap-4'}`}>
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className={`text-xs font-medium text-foreground ${multiline ? '' : 'text-right'}`}>{value || '—'}</span>
    </div>
  );
}
