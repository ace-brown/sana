import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroImg from "@/images/hero.jpg";

const highlights = [
  "Expert guidance at every stage",
  "Transparent progress reports",
  "Service plans tailored to your idea",
];

const Hero = () => {
  return (
    <section className="relative grid items-center gap-12 pb-8 pt-12 md:pt-20 lg:grid-cols-2">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl lg:left-1/4"
      />
      <div>
        <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          Startup incubator
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Build, launch and grow with{" "}
          <span className="text-primary">Khayam Sana</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          From validation to execution, we give you the tools, guidance and
          community you need to build, launch and grow your business.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" asChild>
            <Link href="/signup">
              Get Started <ArrowRight />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
        <ul className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <Image
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-border"
          src={heroImg}
          alt="A team discussing ideas around a whiteboard"
          priority
        />
        <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-lg sm:left-[-1.5rem]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">Track every stage</p>
            <p className="text-xs text-muted-foreground">
              From idea to product launch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
