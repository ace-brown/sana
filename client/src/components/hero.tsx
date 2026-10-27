import React from "react";
import Image from "next/image";

import heroImg from "@/images/hero.jpg";

const Hero = () => {
  return (
    <section className="text-center w-full max-w-[100vw] lg:text-left lg:grid lg:gap-12 lg:grid-cols-[1fr_1fr] lg:mt-20">
      <div className="lg:mt-8 mb-4 md:mb-0">
        <h1 className="text-[clamp(2.5rem,8vw+1rem,5rem)] font-bold text-left lg:text-[clamp(2rem,8vw,5.5rem)] mt-6 md:mt-0">
          Khayam Sana
        </h1>
        <p className="font-light text-[#b3b3b3] text-left lg:text-[clamp(1rem,2vw,1.5rem)]">
          From validation to execution, we give you the tools, guidance and
          community you need to build, launch and grow your business.
        </p>

        {/* <div className="flex justify-start gap-4 mt-4">
          <Link href="/about">
            <Button>Get Started</Button>
          </Link>
          <Link href="/sales">
            <Button>See Features</Button>
          </Link>
        </div> */}
      </div>
      <div className="max-w-full h-auto">
        <Image
          className="rounded-2xl object-cover "
          src={heroImg}
          alt="Hero Image"
        />
      </div>
    </section>
  );
};

export default Hero;
