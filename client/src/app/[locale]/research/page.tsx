import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
import SubSectionTitle from "@/components/common/subsection-title";
import SubSection from "@/components/common/subsection";

export default function ResearchPage() {
  const t = useTranslations();

  return (
    <>
      <ReadContainer>
        <PageTitle>{t("research.title")}</PageTitle>
        <P>{t("research.body")}</P>
      </ReadContainer>
      <SubSection>
        <SubSectionTitle>{t("research.forms.title")}</SubSectionTitle>
        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] pl-16 pr-16">
          <Card>
            <CardHeader>
              <CardTitle>{t("research.forms.report.title")}</CardTitle>
            </CardHeader>
            <CardContent>{t("research.forms.report.body")}</CardContent>
            <CardFooter>
              <Link
                href="#"
                className="text-blue-500 font-medium hover:underline"
              >
                {t("readMore")}
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("research.forms.register.title")}</CardTitle>
            </CardHeader>
            <CardContent>{t("research.forms.register.body")}</CardContent>
            <CardFooter>
              <Link
                href="/research/register-idea-form"
                className="text-blue-500 font-medium hover:underline"
              >
                {t("readMore")}
              </Link>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>{t("research.forms.competitions.title")}</CardTitle>
            </CardHeader>
            <CardContent>{t("research.forms.competitions.body")}</CardContent>
            <CardFooter>
              <a
                href="#"
                rel="noreferrer"
                className="text-blue-500 font-medium hover:underline"
              >
                {t("readMore")}
              </a>
            </CardFooter>
          </Card>
        </div>
      </SubSection>
    </>
  );
}
