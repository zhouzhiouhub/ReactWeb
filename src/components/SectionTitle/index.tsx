interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionTitle({ eyebrow, title, description, align = 'left' }: SectionTitleProps) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-sm font-semibold text-brand-teal dark:text-teal-200">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-brand-ink dark:text-white md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">{description}</p> : null}
    </div>
  );
}
