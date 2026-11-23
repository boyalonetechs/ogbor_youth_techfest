type SectionKickerProps = {
  index: string;
  label: string;
  right?: string;
};

export default function SectionKicker({
  index,
  label,
  right,
}: SectionKickerProps) {
  return (
    <div className="flex flex-col gap-2 border-0 border-[var(--oytf-line)] pb-4 text-[9px] font-extrabold uppercase tracking-[0.13em] text-[var(--color-brand-ink)]/70 sm:flex-row sm:items-center sm:justify-between">
      <span>
        {index} / {label}
      </span>
      {right ? <span className="sm:text-right">{right}</span> : null}
    </div>
  );
}
