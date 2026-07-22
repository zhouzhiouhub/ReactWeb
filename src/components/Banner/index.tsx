interface BannerProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function Banner({ eyebrow, title, description }: BannerProps) {
  return (
    <section className="relative overflow-hidden bg-brand-ink py-24 text-white">
      <div className="page-shell">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-teal-200">{eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl leading-8 text-slate-200">{description}</p>
        </div>
      </div>
    </section>
  );
}
