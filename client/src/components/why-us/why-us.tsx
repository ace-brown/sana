import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SectionTitle from "../common/section-title";
import Section from "../common/section";

export default function WhyUs() {
  const t = useTranslations();

  const locale = useLocale();

  const isRightToLeft = locale === "fa";

  const cardData = [
    {
      id: 1,
      title: t("whyUs.card1.title"),
      bulletPoints: [
        t("whyUs.card1.bulletPoints.point1"),
        t("whyUs.card1.bulletPoints.point2"),
        t("whyUs.card1.bulletPoints.point3"),
      ],
      link: "#",
    },
    {
      id: 2,
      title: t("whyUs.card1.title"),
      bulletPoints: [
        t("whyUs.card1.bulletPoints.point1"),
        t("whyUs.card1.bulletPoints.point2"),
        t("whyUs.card1.bulletPoints.point3"),
      ],
      link: "#",
    },
    {
      id: 3,
      title: t("whyUs.card1.title"),
      bulletPoints: [
        t("whyUs.card1.bulletPoints.point1"),
        t("whyUs.card1.bulletPoints.point2"),
        t("whyUs.card1.bulletPoints.point3"),
      ],
      link: "#",
    },
    {
      id: 4,
      title: t("whyUs.card1.title"),
      bulletPoints: [
        t("whyUs.card1.bulletPoints.point1"),
        t("whyUs.card1.bulletPoints.point2"),
        t("whyUs.card1.bulletPoints.point3"),
      ],
      link: "#",
    },
    {
      id: 5,
      title: t("whyUs.card1.title"),
      bulletPoints: [
        t("whyUs.card1.bulletPoints.point1"),
        t("whyUs.card1.bulletPoints.point2"),
        t("whyUs.card1.bulletPoints.point3"),
      ],
      link: "#",
    },
    {
      id: 6,
      title: t("whyUs.card1.title"),
      bulletPoints: [
        t("whyUs.card1.bulletPoints.point1"),
        t("whyUs.card1.bulletPoints.point2"),
        t("whyUs.card1.bulletPoints.point3"),
      ],
      link: "#",
    },
  ];

  return (
    <Section>
      <SectionTitle>{t("whyUs.title")}</SectionTitle>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {cardData.map((item) => {
          return (
            <Card
              key={item.id}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul
                  className="list-disc list-inside text-gray-600 space-y-2"
                  style={{ direction: isRightToLeft ? "rtl" : "ltr" }}
                >
                  {item.bulletPoints.map((bulletPoint, index) => (
                    <li key={index}>{bulletPoint}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className={`mt-4 ${isRightToLeft && "justify-end"}`}>
                <Link
                  href={item.link}
                  className="text-blue-500 font-medium hover:underline"
                >
                  {t("readMore")}
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
