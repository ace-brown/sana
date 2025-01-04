"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import P from "@/components/common/ptag";
import ProgressBar from "@/components/reports/ProgressBar";
import SubSection from "@/components/common/subsection";
import { Button } from "@/components/ui/button";
import { useHttpClient } from "@/hooks/http-hook";
import { Report } from "@/types";

export default function ReportPage() {
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [reportId, setReportId] = useState("");
  const [report, setReport] = useState<Report | undefined>();
  const { isLoading, error, sendRequest } = useHttpClient();

  function handleReportIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReportId(e.target.value);
  }

  async function handleProgressBarClick() {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/reports/${reportId}`,
        "GET",
        null,
        { "Content-Type": "application/json" },
        "گزارش با موفقیت پیدا شد"
      );

      setReport(responseData.report);
      setShowProgressBar(true);
    } catch (err) {}
  }

  return (
    <>
      <div>
        <P>
          در این بخش می‌توانید روند پیشرفت ایده خود را که برای ما ارسال
          کرده‌اید، مشاهده کنید. ما تلاش می‌کنیم که در هر مرحله، شما را در جریان
          وضعیت توسعه ایده‌تان قرار دهیم و اطمینان حاصل کنیم که همیشه از وضعیت
          پروژه خود مطلع هستید. کافیست شناسه گزارش خود را وارد کنید تا اطلاعات
          کامل مراحل انجام شده و برنامه‌های آتی نمایش داده شود. هدف ما این است
          که با شفافیت کامل و به‌روزترین اطلاعات، شما را در مسیر تحقق ایده‌تان
          همراهی کنیم"
        </P>
        <div className="flex items-center gap-8 mt-8">
          <Input
            type="text"
            placeholder="شناسه گزارش خود را وارد کنید"
            onChange={handleReportIdChange}
            value={reportId}
            className="w-[300px]"
          />
          <Button onClick={handleProgressBarClick}>
            نوار پیشرفت را پیدا کن
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      {showProgressBar && (
        <SubSection>
          <ProgressBar foundReport={report} />
        </SubSection>
      )}
    </>
  );
}
