import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import PageTitle from "@/components/common/page-title";
import P from "@/components/common/ptag";
import ReadContainer from "@/components/common/read-container";
import Section from "@/components/common/section";
import SubSectionTitle from "@/components/common/subsection-title";
import Link from "next/link";

export default function ResearchPage() {
  return (
    <>
      <ReadContainer>
        <PageTitle>Register your idea</PageTitle>
        <P>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet fugiat
          ullam optio libero beatae fugit eos, autem nulla voluptates quasi,
          consequuntur ratione. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Amet fugiat ullam optio libero beatae fugit eos,
          autem nulla voluptates quasi, consequuntur ratione.
        </P>
      </ReadContainer>
      <Section>
        <SubSectionTitle>All the forms you need</SubSectionTitle>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] pl-16 pr-16">
          <Card>
            <CardHeader>
              <CardTitle>Report</CardTitle>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              consectetur lacus non lectus vulputate, vel tincidunt urna
              pellentesque. Sed vitae felis vel enim facilisis commodo. Sed
              sollicitudin, dui vel pharetra vestibulum, ipsum ex fermentum
              velit, in fermentum arcu nunc id eros.
            </CardContent>
            <CardFooter>
              <Link
                href="#"
                className="text-blue-500 font-medium hover:underline"
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Register Your Idea</CardTitle>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              consectetur lacus non lectus vulputate, vel tincidunt urna
              pellentesque. Sed vitae felis vel enim facilisis commodo. Sed
              sollicitudin, dui vel pharetra vestibulum, ipsum ex fermentum
              velit, in fermentum arcu nunc id eros.
            </CardContent>
            <CardFooter>
              <Link
                href="/research/register-idea-form"
                className="text-blue-500 font-medium hover:underline"
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Academic competitions</CardTitle>
            </CardHeader>
            <CardContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              consectetur lacus non lectus vulputate, vel tincidunt urna
              pellentesque. Sed vitae felis vel enim facilisis commodo. Sed
              sollicitudin, dui vel pharetra vestibulum, ipsum ex fermentum
              velit, in fermentum arcu nunc id eros.
            </CardContent>
            <CardFooter>
              <a
                href="#"
                rel="noreferrer"
                className="text-blue-500 font-medium hover:underline"
              >
                Read More
              </a>
            </CardFooter>
          </Card>
        </div>
      </Section>
    </>
  );
}
