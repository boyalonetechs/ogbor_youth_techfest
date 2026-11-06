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
    <div className="oytf-kicker">
      <span>
        {index} / {label}
      </span>
      {right ? <span>{right}</span> : null}
    </div>
  );
}
