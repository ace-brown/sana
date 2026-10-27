import Link from "next/link";
import { ArrowRight } from "lucide-react";

import StartupPath from "@/components/startup-path/StartupPath";
import Hero from "@/components/hero";
import WhyUs from "@/components/why-us/why-us";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Hero />
      <WhyUs />
      <StartupPath />
      <section className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-12 md:py-20">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl"
        />
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to bring your idea to life?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
          Create an account, register your idea and we&apos;ll put together a
          plan to help you reach your goals.
        </p>
        <Button size="lg" variant="secondary" className="mt-8" asChild>
          <Link href="/signup">
            Register Your Idea <ArrowRight />
          </Link>
        </Button>
      </section>
    </>
  );
}
