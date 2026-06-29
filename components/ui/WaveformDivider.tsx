export function WaveformDivider() {
  return (
    <div className="w-full px-0 py-8" aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-10 w-full"
        fill="none"
      >
        <path
          d="M0,20 C50,5 100,35 150,20 C200,5 250,35 300,18 C350,2 400,38 450,20 C500,8 550,32 600,20 C650,10 700,30 750,18 C800,6 850,34 900,22 C950,12 1000,28 1050,20 C1100,14 1150,26 1200,20"
          stroke="var(--ridge)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,22 C80,38 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,14 960,28 C1040,42 1120,16 1200,24"
          stroke="var(--ridge)"
          strokeWidth="0.75"
          opacity="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
