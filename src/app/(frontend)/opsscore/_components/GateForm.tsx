'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { GATE_COPY } from '@/lib/opsscore/copy';
import { normalizePhone } from '@/lib/opsscore/phone';
import { EMPLOYEE_OPTIONS, INDUSTRY_OPTIONS, REVENUE_OPTIONS, type Option } from '@/lib/opsscore/questions';
import { track } from '@/lib/opsscore/track';
import { JUST_GATED_KEY } from './RevealReport';

type Field = 'name' | 'phone' | 'brand' | 'industry' | 'employees' | 'revenue' | 'consent';
type Errors = Partial<Record<Field, keyof typeof GATE_COPY.errors>>;

const inputClass =
  'block w-full h-12 px-3.5 rounded-md border bg-paper-100 text-[15px] text-ink placeholder:text-mist-500 outline-none transition-colors focus:border-electric';

export function GateForm({ sessionId, phase }: { sessionId: string; phase: number }) {
  const router = useRouter();
  const [values, setValues] = useState({ name: '', phone: '', brand: '', industry: '', employees: '', revenue: '' });
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [refreshing, startRefresh] = useTransition();

  const set = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'required';
    if (!values.phone.trim()) next.phone = 'required';
    else if (!normalizePhone(values.phone)) next.phone = 'phone';
    if (!values.brand.trim()) next.brand = 'required';
    if (!values.industry) next.industry = 'required';
    if (!values.employees) next.employees = 'required';
    if (!values.revenue) next.revenue = 'required';
    if (!consent) next.consent = 'consent';
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    const found = validate();
    setErrors(found);
    setFormError(null);
    if (Object.keys(found).length) {
      document.getElementById(`gate-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/opsscore/sessions/${sessionId}/gate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, consent, company_url: honeypot }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        track('assessment_gate_submit', { fase: phase, revenue_band: values.revenue });
        try {
          sessionStorage.setItem(JUST_GATED_KEY, sessionId);
        } catch {}
        startRefresh(() => router.refresh());
        return;
      }
      if (body.code === 'invalid' && body.errors) setErrors(body.errors);
      else setFormError(res.status === 429 ? GATE_COPY.errors.rateLimited : GATE_COPY.errors.server);
    } catch {
      setFormError(GATE_COPY.errors.server);
    }
    setSubmitting(false);
  };

  const busy = submitting || refreshing;

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
      <input
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        aria-hidden
        className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
      />
      <TextField id="name" label={GATE_COPY.fields.name} error={errors.name}>
        <input
          id="gate-name"
          type="text"
          autoComplete="name"
          placeholder={GATE_COPY.placeholders.name}
          value={values.name}
          onChange={set('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'gate-name-error' : undefined}
          className={`${inputClass} ${errors.name ? 'border-error' : 'border-paper-200'}`}
        />
      </TextField>
      <TextField id="phone" label={GATE_COPY.fields.phone} error={errors.phone}>
        <input
          id="gate-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={GATE_COPY.placeholders.phone}
          value={values.phone}
          onChange={set('phone')}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'gate-phone-error' : undefined}
          className={`${inputClass} tabular ${errors.phone ? 'border-error' : 'border-paper-200'}`}
        />
      </TextField>
      <TextField id="brand" label={GATE_COPY.fields.brand} error={errors.brand} wide>
        <input
          id="gate-brand"
          type="text"
          autoComplete="organization"
          placeholder={GATE_COPY.placeholders.brand}
          value={values.brand}
          onChange={set('brand')}
          aria-invalid={Boolean(errors.brand)}
          aria-describedby={errors.brand ? 'gate-brand-error' : undefined}
          className={`${inputClass} ${errors.brand ? 'border-error' : 'border-paper-200'}`}
        />
      </TextField>
      <SelectField id="industry" label={GATE_COPY.fields.industry} options={INDUSTRY_OPTIONS} value={values.industry} onChange={set('industry')} error={errors.industry} wide />
      <SelectField id="employees" label={GATE_COPY.fields.employees} options={EMPLOYEE_OPTIONS} value={values.employees} onChange={set('employees')} error={errors.employees} />
      <SelectField id="revenue" label={GATE_COPY.fields.revenue} options={REVENUE_OPTIONS} value={values.revenue} onChange={set('revenue')} error={errors.revenue} />

      <div className="sm:col-span-2">
        <label htmlFor="gate-consent" className="flex items-start gap-3 cursor-pointer">
          <input
            id="gate-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setErrors((prev) => ({ ...prev, consent: undefined }));
            }}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'gate-consent-error' : undefined}
            className="mt-0.5 w-5 h-5 shrink-0 accent-electric"
          />
          <span className="text-[14px] leading-[1.5] text-ink">{GATE_COPY.consent}</span>
        </label>
        {errors.consent && <FieldError id="gate-consent-error">{GATE_COPY.errors[errors.consent]}</FieldError>}
      </div>

      <div className="sm:col-span-2 flex flex-col gap-3 pt-1">
        <button
          type="submit"
          disabled={busy}
          className="self-start h-[52px] px-[22px] rounded-md bg-electric text-paper text-[15px] font-semibold inline-flex items-center gap-2 hover:bg-[#2562E0] transition-colors disabled:opacity-60 disabled:cursor-wait"
        >
          {busy ? GATE_COPY.submitting : GATE_COPY.submit}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </button>
        {formError && (
          <p role="alert" className="text-[13px] font-medium text-error m-0">
            {formError}
          </p>
        )}
      </div>
    </form>
  );
}

function TextField({
  id,
  label,
  error,
  wide,
  children,
}: {
  id: Field;
  label: string;
  error?: keyof typeof GATE_COPY.errors;
  wide?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={wide ? 'sm:col-span-2' : undefined}>
      <label htmlFor={`gate-${id}`} className="block text-[13px] font-semibold text-ink mb-1.5">
        {label}
      </label>
      {children}
      {error && <FieldError id={`gate-${id}-error`}>{GATE_COPY.errors[error]}</FieldError>}
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  value,
  onChange,
  error,
  wide,
}: {
  id: Field;
  label: string;
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: keyof typeof GATE_COPY.errors;
  wide?: boolean;
}) {
  return (
    <TextField id={id} label={label} error={error} wide={wide}>
      <select
        id={`gate-${id}`}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `gate-${id}-error` : undefined}
        className={`${inputClass} appearance-none pr-10 bg-no-repeat bg-[right_0.9rem_center] bg-[length:14px] ${
          value ? '' : 'text-mist-500'
        } ${error ? 'border-error' : 'border-paper-200'}`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A767C' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="" disabled>
          {GATE_COPY.selectPlaceholder}
        </option>
        {options.map((o) => (
          <option key={o.id} value={o.id} className="text-ink">
            {o.label}
          </option>
        ))}
      </select>
    </TextField>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="mt-1.5 text-[12px] font-medium text-error m-0">
      {children}
    </p>
  );
}
