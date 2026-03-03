interface PageHeroProps {
  title: string;
  subtitle?: string;
  compact?: boolean;
}

export default function PageHero({ title, subtitle, compact }: PageHeroProps) {
  return (
    <section className={`marble-bg ${compact ? "py-10 md:py-14" : "py-14 md:py-20"}`}>
      <div className="container-tight text-center">
        <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">{subtitle}</p>
        )}
        <div className="gold-line max-w-24 mx-auto mt-4" />
      </div>
    </section>
  );
}
