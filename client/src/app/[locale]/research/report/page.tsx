import React from "react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import PageTitle from "@/components/common/page-title";
import P from "@/components/common/ptag";
import ProgressBar from "@/components/report-bar/ProgressBar";
import SubSection from "@/components/common/subsection";
import ReadContainer from "@/components/common/read-container";

export default function ReportPage() {
  const t = useTranslations();

  return (
    <>
      <ReadContainer>
        <PageTitle>{t("report.title")}</PageTitle>
        <P>{t("report.body")}</P>
        <Input
          type="text"
          placeholder={t("report.input")}
          className="mt-8 w-1/2"
        />
      </ReadContainer>
      <SubSection>
        <ProgressBar />
      </SubSection>
    </>
  );
}
