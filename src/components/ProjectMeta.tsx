interface ProjectMetaProps {
  type?: string;
  role?: string;
  year?: string;
}

export default function ProjectMeta({ type, role, year }: ProjectMetaProps) {
  const rows = [
    { label: "Type", value: type },
    { label: "Role", value: role },
    { label: "Year", value: year },
  ].filter((row) => row.value);

  return (
    <dl>
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="grid grid-cols-[72px_1fr] items-baseline gap-4 border-t border-border py-2.5 last:border-b lg:grid-cols-[96px_1fr] lg:py-3"
        >
          <dt className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted lg:text-[11px]">{label}</dt>
          <dd className="text-sm font-medium lg:text-[15px]">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
