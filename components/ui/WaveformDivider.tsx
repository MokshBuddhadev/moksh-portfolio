export function WaveformDivider() {
  return (
    <div className="w-full overflow-hidden px-0 py-8" aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="h-10 w-[200%] max-w-none animate-waveform-drift"
        fill="none"
      >
        <path
          d="M0,20 C50,5 100,35 150,20 C200,5 250,35 300,18 C350,2 400,38 450,20 C500,8 550,32 600,20 C650,10 700,30 750,18 C800,6 850,34 900,22 C950,12 1000,28 1050,20 C1100,14 1150,26 1200,20 C1250,5 1300,35 1350,20 C1400,5 1450,35 1500,18 C1550,2 1600,38 1650,20 C1700,8 1750,32 1800,20 C1850,10 1900,30 1950,18 C2000,6 2050,34 2100,22 C2150,12 2200,28 2250,20 C2300,14 2350,26 2400,20"
          stroke="var(--ridge)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0,22 C80,38 160,8 240,22 C320,36 400,10 480,24 C560,38 640,12 720,26 C800,40 880,14 960,28 C1040,42 1120,16 1200,24 C1280,38 1360,8 1440,22 C1520,36 1600,10 1680,24 C1760,38 1840,12 1920,26 C2000,40 2080,14 2160,28 C2240,42 2320,16 2400,24"
          stroke="var(--accent)"
          strokeWidth="0.75"
          opacity="0.3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
