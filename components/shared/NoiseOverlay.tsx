export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5]"
      style={{ opacity: 0.04 }}
      aria-hidden="true"
    >
      <svg className="h-full w-full">
        <filter id="noise-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise-filter)" />
      </svg>
    </div>
  );
}
