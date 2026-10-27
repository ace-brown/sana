import React from "react";
import Link from "next/link";

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
  const cardData = [
    {
      id: 1,
      title: "Guided Validation",
      bulletPoints: [
        "Specialized tools for researching your market and customers",
        "Collect real user feedback to test your ideas",
        "Analyses and reports that help you make better decisions",
      ],
      link: "#",
    },
    {
      id: 2,
      title: "First blog post title",
      bulletPoints: [
        "Specialized tools for researching your market and customers",
        "Collect real user feedback to test your ideas",
        "Analyses and reports that help you make better decisions",
      ],
      link: "#",
    },
    {
      id: 3,
      title: "Second blog post title",
      bulletPoints: [
        "Specialized tools for researching your market and customers",
        "Collect real user feedback to test your ideas",
        "Analyses and reports that help you make better decisions",
      ],
      link: "#",
    },
    {
      id: 4,
      title: "Third blog post title",
      bulletPoints: [
        "Specialized tools for researching your market and customers",
        "Collect real user feedback to test your ideas",
        "Analyses and reports that help you make better decisions",
      ],
      link: "#",
    },
    {
      id: 5,
      title: "Fourth blog post title",
      bulletPoints: [
        "Specialized tools for researching your market and customers",
        "Collect real user feedback to test your ideas",
        "Analyses and reports that help you make better decisions",
      ],
      link: "#",
    },
    {
      id: 6,
      title: "Fourth blog post title",
      bulletPoints: [
        "Specialized tools for researching your market and customers",
        "Collect real user feedback to test your ideas",
        "Analyses and reports that help you make better decisions",
      ],
      link: "#",
    },
  ];

  return (
    <Section>
      <SectionTitle>Why Khayam Sana?</SectionTitle>
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
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  {item.bulletPoints.map((bulletPoint, index) => (
                    <li key={index}>{bulletPoint}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-4 justify-center">
                <Link
                  href={item.link}
                  className="text-blue-500 font-medium hover:underline"
                >
                  Read more
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
