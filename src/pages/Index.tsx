import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Startups } from "@/components/sections/Startups";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Credentials } from "@/components/sections/Credentials";
import { CursorGlow } from "@/components/ui/CursorGlow";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Dynamic cursor-reactive background */}
      <CursorGlow />
      
      <Header />
      <main className="relative z-10">
        <Hero />
        <About />
        <Startups />
        <Projects />
        <Achievements />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
