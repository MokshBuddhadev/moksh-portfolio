import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Navbar } from "@/components/nav/Navbar";
import { GreetingOverlay } from "@/components/hero/GreetingOverlay";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Research } from "@/components/sections/Research";
import { Beyond } from "@/components/sections/Beyond";
import { Contact } from "@/components/sections/Contact";
import { WaveformDivider } from "@/components/ui/WaveformDivider";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";
import { Preloader } from "@/components/shared/Preloader";

const HeroCanvas = dynamic(() => import("@/components/hero/HeroCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 z-0 bg-deep-water" style={{ height: "100vh" }} />
  ),
});

export default function Home() {
  return (
    <>
      <Preloader />
      <CursorTrail />
      <NoiseOverlay />
      <Navbar />

      <section className="relative h-screen overflow-hidden bg-ink">
        <Suspense
          fallback={
            <div className="absolute inset-0 z-0 bg-deep-water" />
          }
        >
          <HeroCanvas />
        </Suspense>
        <GreetingOverlay />
      </section>

      <WaveformDivider />
      <About />
      <WaveformDivider />
      <Projects />
      <WaveformDivider />
      <Skills />
      <WaveformDivider />
      <Research />
      <WaveformDivider />
      <Beyond />
      <WaveformDivider />
      <Contact />
    </>
  );
}
