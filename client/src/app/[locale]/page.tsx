import Component from "@/components/test";
import StartupPath from "@/components/startup-path/StartupPath";
import Hero from "@/components/hero";
import WhyUs from "@/components/why-us/why-us";

export default function Home() {
  return (
    <div className="mb-8 mx-auto">
      <Hero />
      <StartupPath />
      <WhyUs />
      <Component />
    </div>
  );
}
