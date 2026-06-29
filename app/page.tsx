
import { Navbar } from "@/components/nav/Navbar";
import { GreetingOverlay } from "@/components/hero/GreetingOverlay";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Research } from "@/components/sections/Research";
import { Beyond } from "@/components/sections/Beyond";
import { Contact } from "@/components/sections/Contact";
import { CursorTrail } from "@/components/ui/CursorTrail";
import { NoiseOverlay } from "@/components/shared/NoiseOverlay";
import { Preloader } from "@/components/shared/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <CursorTrail />
      <NoiseOverlay />
      <Navbar />

      <main className="bg-bg-primary text-text-primary">
        <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
          <GreetingOverlay />
        </section>

        <div className="max-w-7xl mx-auto px-6 pb-32 space-y-32">
          <About />
          <Projects />
          <Skills />
          <Research />
          <Beyond />
        </div>
        
        <Contact />
      </main>
    </>
  );
}
