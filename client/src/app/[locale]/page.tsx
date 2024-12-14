import { TimelineLayout } from "@/components/timeline/timeline-layout";
import Component from "@/components/test";
import StartupPath from "@/components/startup-path/StartupPath";
import StartUpCard from "@/components/cards/startup-card";

export default function Home() {
  return (
    <div className="mb-8">
      <Component />
      <StartupPath />
    </div>
  );
}
