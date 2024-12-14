import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";

import heroImg from "@/images/hero.jpg";
import { Button } from "./ui/button";
import Container from "./common/container";

const Hero = () => {
  const t = useTranslations();

  console.log("this is a server component");

  return (
    <section className="text-center w-full max-w-[100vw] lg:text-left lg:grid lg:gap-12 lg:grid-cols-[1fr_1fr] lg:grid-areas-[img_content] lg:mt-20">
      <div className="max-w-full h-auto lg:grid-area-img">
        <Image
          className="rounded-2xl object-cover "
          src={heroImg}
          alt="Hero Image"
        />
      </div>
      <div className="lg:grid-area-content lg:mt-8">
        <h1 className="text-[clamp(2.5rem,8vw+1rem,5rem)] font-bold text-right lg:text-[clamp(2rem,8vw,5.5rem)]">
          {t("hero.title")}
        </h1>
        <p className="font-light text-[#b3b3b3] text-right lg:text-[clamp(1rem,2vw,1.5rem)]">
          {t("hero.body")}
        </p>
        <div className="flex justify-end gap-4 mt-4">
          <Link href="/about">
            <Button>{t("hero.start")}</Button>
          </Link>
          <Link href="/sales">
            <Button>{t("hero.seeFeatures")}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
