"use client";

import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import PageTitle from "@/components/common/page-title";
import P from "@/components/common/ptag";
import ProgressBar from "@/components/report-bar/ProgressBar";
import SubSection from "@/components/common/subsection";
import ReadContainer from "@/components/common/read-container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ReportPage() {
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const [error, setError] = useState("");

  function handleTrackingCodeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTrackingCode(e.target.value);
    setError("");
  }

  function handleProgressBarClick() {
    if (trackingCode.trim() === "") {
      setError("لطفا کد پیگیری خود را وارد کنید");
      return;
    }
    if (trackingCode === "TC-1001") {
      setShowProgressBar(true);
    } else {
      setError("کد پیگیری نامعتبر است");
    }
  }

  return (
    <>
      <ReadContainer>
        <PageTitle>پیگیری روند پیشرفت ایده</PageTitle>
        <P>
          .در این بخش می‌توانید روند پیشرفت ایده خود را که برای ما ارسال
          کرده‌اید، مشاهده کنید. ما تلاش می‌کنیم که در هر مرحله، شما را در جریان
          وضعیت توسعه ایده‌تان قرار دهیم و اطمینان حاصل کنیم که همیشه از وضعیت
          پروژه خود مطلع هستید. کافیست کد پیگیری اختصاصی خود را وارد کنید تا
          اطلاعات کامل مراحل انجام شده و برنامه‌های آتی نمایش داده شود. هدف ما
          این است که با شفافیت کامل و به‌روزترین اطلاعات، شما را در مسیر تحقق
          ایده‌تان همراهی کنیم"
        </P>
        <div className="flex items-center gap-8 mt-8">
          <Input
            type="text"
            placeholder="کد پیگیری خود را وارد کنید"
            onChange={handleTrackingCodeChange}
            value={trackingCode}
            className="w-[300px]"
          />
          <Button onClick={handleProgressBarClick}>
            نوار پیشرفت را پیدا کن
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </ReadContainer>
      {showProgressBar && (
        <SubSection>
          <ProgressBar trackingCode={trackingCode} />
        </SubSection>
      )}
      <div className="text-center mt-12">
        <Link href="#">
          <Button variant="outline" type="button">
            بازگشت به همه فرم‌ها
          </Button>
        </Link>
      </div>
    </>
  );
}
