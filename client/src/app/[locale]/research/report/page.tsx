"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";

import { Input } from "@/components/ui/input";
import PageTitle from "@/components/common/page-title";
import P from "@/components/common/ptag";
import ProgressBar from "@/components/report-bar/ProgressBar";
import SubSection from "@/components/common/subsection";
import ReadContainer from "@/components/common/read-container";
import { Button } from "@/components/ui/button";

export default function ReportPage() {
  const t = useTranslations();
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [error, setError] = useState("");

  function handleTrackingCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTrackingCode(e.target.value);
    setError("");
  }

  function handleProgressBarClick() {
    if (trackingCode.trim() === "") {
      setError(t("report.inputError"));
      return;
    }
    if (trackingCode === "TC-1001") {
      setShowProgressBar(true);
    } else {
      setError(t("report.invalidCode"));
    }
  }

  return (
    <>
      <ReadContainer>
        <PageTitle>{t("report.title")}</PageTitle>
        <P>{t("report.body")}</P>
        <div className="flex items-center gap-8 mt-8">
          <Input
            type="text"
            placeholder={t("report.input")}
            onChange={handleTrackingCodeChange}
            value={trackingCode}
            className="w-[300px]"
          />
          <Button onClick={handleProgressBarClick}>
            {t("report.findBtn")}
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </ReadContainer>
      {showProgressBar && (
        <SubSection>
          <ProgressBar trackingCode={trackingCode} />
        </SubSection>
      )}
    </>
  );
}
