import Image from "next/image";
import Link from "next/link";

import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroImg from "@/images/hero.jpg";
import launchImg from "@/images/launch.jpg";
import planImg from "@/images/planning.jpg";

export default function CompetitionsPage() {
  const competitions = [
    {
      title: "International Mathematical Olympiad",
      description: "A worldwide mathematics competition for high school students",
      link: "https://www.imo-official.org/",
      image: heroImg,
    },
    {
      title: "Science Fair",
      description: "Present your scientific research at the international science fair",
      link: "https://www.societyforscience.org/isef/",
      image: launchImg,
    },
    {
      title: "Writing Contest",
      description:
        "Submit an essay for a chance to win a scholarship",
      link: "https://www.writingcontest.org/",
      image: planImg,
    },
    {
      title: "International Mathematical Olympiad",
      description: "A worldwide mathematics competition for high school students",
      link: "https://www.imo-official.org/",
      image: heroImg,
    },
    {
      title: "Science Fair",
      description: "Present your scientific research at the international science fair",
      link: "https://www.societyforscience.org/isef/",
      image: launchImg,
    },
    {
      title: "Writing Contest",
      description:
        "Submit an essay for a chance to win a scholarship",
      link: "https://www.writingcontest.org/",
      image: planImg,
    },
  ];

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto px-4">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Scientific Competitions</h1>
          <p className="text-lg text-gray-600 mt-2">
            Research and take part in scientific competitions across many fields
          </p>
        </header>

        {/* Competition List Section */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))]">
          {competitions.map((comp, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-center text-xl font-semibold">
                  {comp.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Image
                  src={comp.image}
                  alt={comp.title}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
                <p className="text-gray-700 mb-4">{comp.description}</p>
                <a href={comp.link} target="_blank" rel="noreferrer">
                  <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    Visit Website
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="flex gap-8 justify-around w-fit mt-10 mx-auto">
          <Link href="/research">
            <Button type="button" variant="outline">
              Back to All Forms
            </Button>
          </Link>
          <Link href="#">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md">
              Sign Up for Updates
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
}
