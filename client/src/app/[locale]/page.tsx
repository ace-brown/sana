import { TimelineLayout } from "@/components/timeline/timeline-layout";
import Component from "@/components/test";
import StartupPath from "@/components/startup-path/StartupPath";
import StartUpCard from "@/components/cards/startup-card";
import Hero from "@/components/hero";
import Container from "@/components/common/container";

export default function Home() {
  return (
    <div className="mb-8 mx-auto">
      <Hero />
      <Container>
        <StartupPath />
      </Container>
      <Component />
    </div>
  );
}
