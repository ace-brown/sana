"use client";

import React from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SubSectionTitle from "@/components/common/subsection-title";
import SubSection from "@/components/common/subsection";
import FileDownload from "@/components/common/FileDownload";

export default function ResearchPage() {
  return (
    <>
      {/* <ReadContainer>
        <PageTitle>Idea Registration</PageTitle>
        <P>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </P>
      </ReadContainer> */}
      <SubSection>
        <SubSectionTitle textAlign="center">
          All Required Forms
        </SubSectionTitle>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] pl-16 pr-16">
          {/* <Card>
            <CardHeader>
              <CardTitle>Scientific Competitions</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <Link
                href="/research/competitions"
                className="text-blue-500 font-medium hover:underline"
              >
                Read more
              </Link>
            </CardFooter>
          </Card> */}
          <Card>
            <CardHeader>
              <CardTitle>Introduction to Taxation Form</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <FileDownload
                fileUrl={`${process.env.NEXT_PUBLIC_API_URL}/download/tax_introduction.pdf`}
                fileName="Introduction to Taxation in Iran"
              />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Patent Registration Guide Form</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <FileDownload
                fileUrl={`${process.env.NEXT_PUBLIC_API_URL}/download/invention_register.pdf`}
                fileName="Patent Registration Guide"
              />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Technology Unit Admission Request Form</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <FileDownload
                fileUrl={`${process.env.NEXT_PUBLIC_API_URL}/download/Incubator_start_form.pdf`}
                fileName="Technology Unit Admission Request"
              />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Khwarizmi Youth Festival Executive Guidelines Form</CardTitle>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter>
              <FileDownload
                fileUrl={`${process.env.NEXT_PUBLIC_API_URL}/download/kharazmi_approach.pdf`}
                fileName="Khwarizmi Youth Festival Executive Guidelines"
              />
            </CardFooter>
          </Card>
        </div>
      </SubSection>
    </>
  );
}
