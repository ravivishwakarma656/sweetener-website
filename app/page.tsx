import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee, Stats, Product, Process, Uses, FAQ, Contact } from "@/components/Sections";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <Product />
      <Process />
      <Uses />
      <FAQ />
      <Contact />
    </main>
  );
}
