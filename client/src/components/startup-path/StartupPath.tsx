import React from "react";
import { useTranslations } from "next-intl";

import StartUpCard from "./startup-card";
import validateImg from "@/images/vallidate-idea.jpg";
import growthImg from "@/images/growth.jpg";
import launchImg from "@/images/launch.jpg";
import planingImg from "@/images/planning.jpg";
import SectionTitle from "@/components/common/section-title";
import Section from "../common/section";

export default function StartupPath() {
  const t = useTranslations("startupPath");

  const cardData = [
    {
      id: 1,
      title: t("validate.title"),
      description: t("validate.description"),
      imgSrc: validateImg,
      link: "#",
    },
    {
      id: 2,
      title: t("plan.title"),
      description: t("plan.description"),
      imgSrc: planingImg,
      link: "#",
    },
    {
      id: 3,
      title: t("launch.title"),
      description: t("launch.description"),
      imgSrc: launchImg,
      link: "#",
    },
    {
      id: 4,
      title: t("growth.title"),
      description: t("growth.description"),
      imgSrc: growthImg,
      link: "#",
    },
  ];
  return (
    <Section>
      <SectionTitle>{t("header")}</SectionTitle>
      {cardData.map((item, _) => {
        return (
          <div key={item.id} className="grid">
            <div className="mb-4 grid gap-4 lg:grid-cols-[2fr_5px_2fr] lg:m-0">
              {/* The left side of the axis */}
              <div className="lg:grid justify-items-end lg:mx-0">
                {item.id % 2 !== 0 && <StartUpCard item={item} />}
              </div>
              {/* The axis itself */}
              <div className="bg-gray-500 lg:grid lg:content-center lg:items-center">
                <div className="bg-red-500 transform lg:translate-x-[-35%] lg:h-4 lg:w-4 lg:rounded-full"></div>
              </div>
              {/* The left side of the axis */}
              <div className="lg:grid lg:mx-0">
                {item.id % 2 === 0 && <StartUpCard item={item} />}
              </div>
            </div>
          </div>
        );
      })}
    </Section>
  );
}
