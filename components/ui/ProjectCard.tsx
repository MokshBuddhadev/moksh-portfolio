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
    <article
      className="project-card group relative w-full overflow-hidden rounded-xl border border-ridge bg-terrain p-8 transition-all duration-300 hover:-translate-y-1 hover:border-l-[3px] hover:border-l-dusk-amber hover:shadow-[4px_0_24px_rgba(232,135,58,0.15)]"
      style={{ willChange: "transform" }}
    >
      <p className="font-mono text-xs text-fog">{index}</p>
      <h3 className="mt-2 font-display text-2xl font-bold text-salt">{name}</h3>
      <p className="mt-2 font-body text-sm leading-relaxed text-fog">
        {descriptor}
      </p>

      {/* CSS Grid technique for smooth auto-height animation */}
      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
        <div className="overflow-hidden opacity-0 transition-opacity duration-300 delay-100 ease-out group-hover:opacity-100">
          <p className="mt-3 border-l-2 border-shoreline/50 pl-3 font-body text-sm leading-relaxed text-salt/90">
            {overview}
          </p>
        </div>
      </div>

      <div className="my-5 h-px w-full bg-ridge" />
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-ridge bg-terrain px-2.5 py-1.5 font-mono text-[11px] text-shoreline transition-colors duration-300 group-hover:border-shoreline/30 group-hover:bg-shoreline/5"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-5 font-display text-[32px] font-bold text-dusk-amber transition-transform duration-300 group-hover:scale-[1.02] origin-left">
        {metric}
      </p>
      <a
        href={`https://${github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block font-mono text-sm text-shoreline transition-colors duration-300 hover:text-salt"
      >
        → GitHub
      </a>
    </article>
  );
}
