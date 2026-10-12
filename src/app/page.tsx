import { AskDemo } from "@/components/AskDemo";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Forecast } from "@/components/Forecast";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { Principles } from "@/components/Principles";
import { Waitlist } from "@/components/Waitlist";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <HowItWorks />
        <AskDemo />
        <Forecast />
        <Principles />
        <Faq />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
