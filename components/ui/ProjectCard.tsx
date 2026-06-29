"use client";

import { useCallback, useRef } from "react";

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
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt effect
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate rotation (-5 to 5 degrees)
    const rotateY = -1 * ((x / rect.width) * 10 - 5);
    const rotateX = (y / rect.height) * 10 - 5;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(167,139,250,0.1)";
    
    // Update gradient border position
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    cardRef.current.style.boxShadow = "none";
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="project-card group relative w-full overflow-hidden rounded-xl bg-terrain p-8 transition-all duration-400 ease-out"
      style={{ 
        transformStyle: "preserve-3d",
      }}
    >
      {/* Gradient border glow that follows mouse (using CSS mask) */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-xl border border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(167,139,250,0.4), transparent 40%) border-box",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
        aria-hidden="true"
      />
      
      {/* Default border */}
      <div className="pointer-events-none absolute inset-0 rounded-xl border border-ridge transition-colors duration-300 group-hover:border-transparent" aria-hidden="true" />

      <div style={{ transform: "translateZ(30px)" }}>
        <p className="font-mono text-xs text-fog">{index}</p>
        <h3 className="mt-2 font-display text-2xl font-bold text-salt">{name}</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-fog">
          {descriptor}
        </p>
      </div>

      {/* CSS Grid technique for smooth auto-height animation */}
      <div 
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:grid-rows-[1fr]"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="overflow-hidden opacity-0 transition-opacity duration-500 delay-100 ease-out group-hover:opacity-100">
          <p className="mt-4 border-l-2 border-cyan/30 pl-3 font-body text-sm leading-relaxed text-salt/90">
            {overview}
          </p>
        </div>
      </div>

      <div className="my-5 h-px w-full bg-ridge" style={{ transform: "translateZ(10px)" }} />
      
      <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(40px)" }}>
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-ridge bg-terrain px-2.5 py-1.5 font-mono text-[11px] text-cyan transition-all duration-300 group-hover:border-cyan/30 group-hover:bg-cyan/5 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.1)]"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <p 
        className="mt-6 font-display text-[32px] font-bold text-accent transition-transform duration-300 group-hover:scale-[1.02] origin-left"
        style={{ transform: "translateZ(50px)" }}
      >
        {metric}
      </p>
      
      <a
        href={`https://${github}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block font-mono text-sm text-cyan transition-colors duration-300 hover:text-salt hover:underline underline-offset-4"
        style={{ transform: "translateZ(30px)" }}
      >
        → GitHub
      </a>
    </article>
  );
}
