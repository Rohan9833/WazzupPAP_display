import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, Loader2, AlertTriangle, Presentation, Layers, LayoutDashboard } from 'lucide-react';
import Field from '../ui/Field.jsx';
import Button from '../ui/Button.jsx';
import { EMPTY_FORM, LIMITS, validateField, validateForm } from '../../lib/validation.js';
import { submitDemoRequest } from '../../lib/api.js';

const FIELD_ORDER = ['fullName', 'company', 'designation', 'email', 'phone', 'message'];

export default function DemoRequest() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('');
  const formRef = useRef(null);
  const successRef = useRef(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
    if (status === 'error') setStatus('idle');
  };

  const onBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: validateField(name, value) }));
  };

  const focusFirstError = (errs) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (first) formRef.current?.querySelector(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'submitting') return;

    const errs = validateForm(values);
    setErrors(errs);
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
    if (Object.keys(errs).length) {
      setStatus('error');
      setServerMessage('Some details need attention. Check the highlighted fields.');
      focusFirstError(errs);
      return;
    }

    setStatus('submitting');
    setServerMessage('');
    try {
      const res = await submitDemoRequest(values);
      setStatus('success');
      setServerMessage(res.message);
      setValues(EMPTY_FORM);
      setTouched({});
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (err) {
      setStatus('error');
      setServerMessage(err.message);
      if (err.errors && Object.keys(err.errors).length) {
        setErrors(err.errors);
        focusFirstError(err.errors);
      }
    }
  };

  const fieldProps = (name) => ({
    id: name,
    value: values[name],
    onChange,
    onBlur,
    error: touched[name] ? errors[name] : undefined,
  });

  return (
    <section id="demo" className="surface-night grain relative overflow-hidden py-24 text-haze sm:py-32" aria-labelledby="demo-title">
      <div aria-hidden className="grid-wash-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_15%_30%,black,transparent)]" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:pt-4">
          <h2 id="demo-title" className="display-lg text-sheen pb-1">
            See WazzupPAP in a private demonstration
          </h2>
          <p className="lede mt-6 max-w-[30em]">
            We’ll walk your team through the application experience, the branded reports and the Head Office portal,
            in the context of your therapy area.
          </p>
          <ul className="mt-10 space-y-6">
            {[
              { icon: Presentation, t: 'The full flow on WhatsApp, from sign-in to branded report' },
              { icon: Layers, t: 'An assessment tailored to your therapy area and brand' },
              { icon: LayoutDashboard, t: 'The real-time dashboard, plus month-to-month pricing' },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/[0.07] text-[#5fe0b4] ring-1 ring-inset ring-white/10">
                  <Icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.8} aria-hidden />
                </span>
                <span className="pt-2 text-white/85">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-[2rem] bg-white p-6 text-slate shadow-[0_50px_100px_-30px_rgb(0_0_0/0.7),0_0_0_1px_rgb(255_255_255/0.1)] sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[460px] flex-col items-start justify-center"
                role="status"
              >
                <CheckCircle2 className="h-12 w-12 text-leaf" strokeWidth={1.6} aria-hidden />
                <h3 ref={successRef} tabIndex={-1} className="mt-6 font-display text-[1.9rem] font-semibold leading-tight tracking-[-0.02em] focus:outline-none">
                  Demo request received
                </h3>
                <p className="mt-3 max-w-[28em]">
                  {serverMessage || 'Thank you. Your demo request has been received.'} The digiLATERAL team will contact you
                  on your work email to arrange a convenient time.
                </p>
                <Button as="button" type="button" variant="ghost" className="mt-8" onClick={() => setStatus('idle')}>
                  Send another request
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                onSubmit={onSubmit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                aria-describedby="form-status"
              >
                <h3 className="font-display text-[1.5rem] font-semibold tracking-[-0.015em]">Request a private demo</h3>
                <p className="mt-1 text-[0.95rem]">All fields are required unless marked optional.</p>

                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  <Field {...fieldProps('fullName')} label="Full name" autoComplete="name" maxLength={LIMITS.fullName} />
                  <Field {...fieldProps('company')} label="Pharmaceutical company" autoComplete="organization" maxLength={LIMITS.company} />
                  <Field {...fieldProps('designation')} label="Designation" autoComplete="organization-title" maxLength={LIMITS.designation} placeholder="e.g. Brand Manager" />
                  <Field {...fieldProps('email')} label="Work email" type="email" autoComplete="email" inputMode="email" maxLength={LIMITS.email} placeholder="name@company.com" />
                  <Field {...fieldProps('phone')} label="Contact number" type="tel" autoComplete="tel" inputMode="tel" maxLength={24} placeholder="+91 98XXX XXXXX" className="sm:col-span-2" />
                  <Field
                    {...fieldProps('message')}
                    as="textarea"
                    label="Message"
                    optional
                    rows={4}
                    maxLength={LIMITS.message}
                    placeholder="Therapy area, number of territories, or anything you’d like us to cover"
                    className="sm:col-span-2"
                    hint={`${values.message.length}/${LIMITS.message} characters`}
                  />
                  {/* Honeypot: hidden from people and assistive tech */}
                  <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={onChange} />
                  </div>
                </div>

                <div id="form-status" aria-live="polite" className="min-h-0">
                  {status === 'error' && serverMessage && (
                    <p className="mt-6 flex items-start gap-2 rounded-xl bg-[#fdecea] px-4 py-3 text-[0.92rem] font-medium text-[#8f2a1e]">
                      <AlertTriangle className="mt-[0.15em] h-4 w-4 shrink-0" aria-hidden />
                      {serverMessage}
                    </p>
                  )}
                </div>

                <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.82rem] leading-snug text-slate sm:max-w-[22em]">
                    We use these details only to arrange your demo. We don’t share them.
                  </p>
                  <Button as="button" type="submit" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending request
                      </>
                    ) : (
                      'Request a demo'
                    )}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
