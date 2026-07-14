import Navbar from "@/components/layout/Navbar";
import About from "@/components/Section/About";
import Banner from "@/components/Section/Banner";

import Hero from "@/components/Section/Hero";

import TechMarquee from "@/components/Section/TechMarquee";

import WorkflowDiagram from "@/components/Section/WorkflowDiagram";
import Work from "@/components/Section/Work";
import Details from "@/components/Section/Details";
import Process from "@/components/Section/Process";
import Stack from "@/components/Section/Stack";
import Faq from "@/components/Section/Faq";
import Contact from "@/components/Section/Contact";
import Footer from "@/components/Section/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />

      <Hero />
      <WorkflowDiagram />
      <TechMarquee />
      <Banner />
      <About />
      <Work />
      <Details />
      <Process />
      <Stack />
      <Faq />
      <Contact />
      <Footer />
    </main>
  );
}
