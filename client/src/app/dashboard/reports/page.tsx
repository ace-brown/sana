"use client";

import React, { useContext, useState } from "react";
import { Toaster } from "sonner";

import { Input } from "@/components/ui/input";
import P from "@/components/common/ptag";
import ProgressBar from "@/components/reports/ProgressBar";
import { Button } from "@/components/ui/button";
import { useHttpClient } from "@/hooks/http-hook";
import { Report } from "@/types";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { AuthContext } from "@/context/auth-context";
import ProtectedRoute from "../ProtectedRoute";

export default function ReportPage() {
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [reportId, setReportId] = useState("");
  const { isLoading, error, sendRequest } = useHttpClient();
  const [report, setReport] = useState<Report | undefined>();
  const auth = useContext(AuthContext);

  function handleReportIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReportId(e.target.value);
  }

  async function handleProgressBarClick() {
    try {
      const responseData = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/reports/${reportId}`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        "Report found successfully"
      );
      setReport(responseData.report);
      setShowProgressBar(true);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
  }

  return (
    <ProtectedRoute allowedRoles={["admin", "user"]}>
      <Toaster position="top-center" richColors />
      {isLoading && <LoadingSpinner asOverlay />}
      <div>
        <P>
          In this section you can follow the progress of the idea you submitted
          to us. We aim to keep you informed about the development of your idea
          at every stage, so you always know where your project stands. Just
          enter your report ID to see full details of the completed steps and
          upcoming plans. Our goal is to support you on the path to realizing
          your idea with full transparency and the most up-to-date
          information.
        </P>
        <div className="flex items-center gap-8 mt-8">
          <Input
            type="text"
            placeholder="Enter your report ID"
            onChange={handleReportIdChange}
            value={reportId}
            className="w-[300px]"
          />
          <Button onClick={handleProgressBarClick}>
            Find Progress Timeline
          </Button>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      {showProgressBar && (
        <div>
          <div className="mt-8">
            <ProgressBar foundReport={report} />
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
}
