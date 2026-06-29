"use client";

interface ProjectCardProps {
  index: string;
  name: string;
  descriptor: string;
  overview: string;
  metric: string;
  tags: string[];
  github: string;
}

export function ProjectCard({
  index,
  name,
  descriptor,
  overview,
  metric,
  tags,
  github,
}: ProjectCardProps) {
  return (
    <article className="bento-card group flex flex-col justify-between p-8">
      <div>
        <p className="font-mono text-xs text-text-secondary">{index}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-text-primary">{name}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
          {descriptor}
        </p>

        <div className="mt-6 font-body text-sm leading-relaxed text-text-primary/90 opacity-80">
          {overview}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border-light bg-bg-primary px-2.5 py-1.5 font-mono text-[11px] text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <p className="font-display text-3xl font-bold text-text-primary">
          {metric}
        </p>
        
        <a
          href={`https://${github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-mono text-sm text-text-secondary hover:text-text-primary transition-colors hover:underline underline-offset-4"
        >
          → GitHub
        </a>
      </div>
    </article>
  );
}
