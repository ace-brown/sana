import React from "react";
import Image from "next/image";

import validateImg from "@/images/vallidate-idea.jpg";
import growthImg from "@/images/growth.jpg";
import launchImg from "@/images/launch.jpg";
import planingImg from "@/images/planning.jpg";
import SectionTitle from "@/components/common/section-title";
import Section from "../common/section";

const steps = [
  {
    title: "Idea Validation",
    description: "Test your concept with real users and gain valuable insights",
    imgSrc: validateImg,
  },
  {
    title: "Planning & Prototyping",
    description: "Design a roadmap and build the first version of your product",
    imgSrc: planingImg,
  },
  {
    title: "Launch & Execution",
    description:
      "Launch your business with confidence using professional tools",
    imgSrc: launchImg,
  },
  {
    title: "Growth & Expansion",
    description: "Increase user acquisition and scale your startup",
    imgSrc: growthImg,
  },
];

export default function StartupPath() {
  return (
    <Section>
      <SectionTitle
        eyebrow="How it works"
        description="Four clear stages take you from a first idea to a growing business."
      >
        Your Startup Journey, Simplified
      </SectionTitle>
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="group overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={step.imgSrc}
                alt=""
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-sm font-bold text-primary shadow">
                {index + 1}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
