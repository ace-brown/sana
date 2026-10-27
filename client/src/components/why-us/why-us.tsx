import React from "react";
import { Compass, LineChart, Receipt, Users } from "lucide-react";

import SectionTitle from "../common/section-title";
import Section from "../common/section";

const features = [
  {
    icon: Compass,
    title: "Guided Validation",
    description:
      "Research your market and customers with specialized tools, and test your idea with real user feedback.",
  },
  {
    icon: LineChart,
    title: "Progress Reports",
    description:
      "Follow your idea through every stage and task, from brainstorming to product launch, in one timeline.",
  },
  {
    icon: Receipt,
    title: "Transparent Costs",
    description:
      "Get a clear estimate for each service your idea needs, with the expert assigned and its payment status.",
  },
  {
    icon: Users,
    title: "Expert Network",
    description:
      "Work with universities, specialists and entrepreneurship advisors who help you make better decisions.",
  },
];

export default function WhyUs() {
  return (
    <Section>
      <SectionTitle
        eyebrow="Why Khayam Sana"
        description="Everything you need to turn an idea into a business, in one place."
      >
        Support built around your idea
      </SectionTitle>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded-2xl border bg-card p-6 transition-shadow hover:shadow-md"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
