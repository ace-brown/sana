import { GraduationCap, Lightbulb, Target } from "lucide-react";

import PageHeader from "@/components/common/page-header";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Accompany founders from the moment an idea comes to mind until their startup reaches growth and stability.",
  },
  {
    icon: GraduationCap,
    title: "Our Partners",
    description:
      "We work closely with leading universities, experts and entrepreneurship advisors.",
  },
  {
    icon: Lightbulb,
    title: "Our Belief",
    description:
      "Every idea has the potential to become a successful business and only needs the right support.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <PageHeader
        eyebrow="About Us"
        title="Helping ideas become businesses"
      />
      <div className="mx-auto max-w-3xl space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>
          Khayam Sana was founded to support entrepreneurs, innovators and
          early-stage businesses. Our mission is to build a comprehensive
          platform that accompanies you through every step, from the moment
          your idea comes to mind until your startup reaches growth and
          stability. That includes idea validation, strategic design and
          planning, funding, initial launch and continuous development. We
          believe every idea has the potential to become a successful business
          and only needs the right support.
        </p>
        <p>
          Working closely with leading universities, experts and
          entrepreneurship advisors, we provide tools and resources that help
          you make better-informed decisions and move along your growth path
          faster and more precisely. With years of experience across many areas
          of business, our team ensures you receive strong, expert support at
          every step of the way. We believe in the power of ideas and the
          importance of executing them well, and we do everything we can to
          help you reach your goals.
        </p>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {values.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-2xl border bg-card p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
