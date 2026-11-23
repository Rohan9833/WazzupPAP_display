import { AlertCircle } from 'lucide-react';

export default function Field({
  id,
  label,
  optional = false,
  error,
  as = 'input',
  className = '',
  hint,
  ...inputProps
}) {
  const Tag = as;
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-[0.85rem] font-semibold text-ink">
        {label}
        {optional && <span className="text-[0.82rem] font-normal text-slate">Optional</span>}
      </label>
      <Tag
        id={id}
        name={id}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={`mt-1.5 block w-full rounded-lg bg-paper px-3 text-[0.92rem] text-ink placeholder:text-slate/60 ring-1 ring-inset transition-[box-shadow,background-color] duration-150 focus:bg-white focus:outline-none focus:ring-2 ${
          as === 'textarea' ? 'min-h-24 resize-y py-2.5' : 'h-11'
        } ${error ? 'ring-[#c0392b] focus:ring-[#c0392b]' : 'ring-mist focus:ring-leaf'}`}
        {...inputProps}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1 text-[0.75rem] text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 flex items-start gap-1.5 text-[0.78rem] font-medium text-[#b03224]">
          <AlertCircle className="mt-[0.15em] h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}
