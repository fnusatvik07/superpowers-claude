import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Philosophy } from "@/components/sections/philosophy";
import { Install } from "@/components/sections/install";
import { Architecture } from "@/components/sections/architecture";
import { SkillsCatalog } from "@/components/sections/skills-catalog";
import { VanillaVs } from "@/components/sections/vanilla-vs";
import { Comparison } from "@/components/sections/comparison";
import { Datasense } from "@/components/sections/datasense";
import { Resources } from "@/components/sections/resources";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <Problem />
        <HowItWorks />
        <Philosophy />
        <Install />
        <Architecture />
        <SkillsCatalog />
        <VanillaVs />
        <Comparison />
        <Datasense />
        <Resources />
      </main>
      <Footer />
    </>
  );
}
