"use client";

import React, { useState, useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";
import EstimateCostForm from "@/components/costs/EstimateCostForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CostType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function EstimateCostPage() {
  const [estimatedCosts, setEstimatedCosts] = useState<CostType[]>([]);
  const { error, isLoading, sendRequest } = useHttpClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useContext(AuthContext);
  const userId = searchParams.get("userId");
  const reportId = searchParams.get("reportId");

  // Get the costs when component mounted
  async function fetchCosts() {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/costs/user/${userId}`,
        "GET",
        null,
        { Authorization: "Bearer " + auth.token }
      );
      setEstimatedCosts(responseData.costsForUser);
    } catch (err) {}
  }

  useEffect(() => {
    fetchCosts();
  }, []);

  // console.log("Estimated", JSON.stringify(estimatedCosts, null, 2));
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">تخمین هزینه</h1>

      {/*********************************************************************
       *Refactor 2: This card is used here and on the [id]/estimate cost page
       **********************************************************************/}
      {/* Form Component */}
      <EstimateCostForm reportId={reportId} userId={userId} />

      {/* Display cost estimate result */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>خدمات پیشنهادی</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            {/* Table header always displayed */}
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">خدمت</TableHead>
                <TableHead className="text-right">قیمت (تومان)</TableHead>
                <TableHead className="text-right">کارشناس مربوطه</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <div className="center">
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </div>
              ) : estimatedCosts.length > 0 ? (
                estimatedCosts.map((item, index) =>
                  item.selectedServices && item.selectedServices.length > 0 ? (
                    item.selectedServices.map((service, serviceIndex) => (
                      <TableRow key={`${index}-${serviceIndex}`}>
                        <TableCell>{service.serviceName}</TableCell>
                        <TableCell>
                          {service.price.toLocaleString("fa-IR")}
                        </TableCell>
                        <TableCell>{service.expert || "N/A"}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow key={index}>
                      <TableCell colSpan={3} style={{ textAlign: "center" }}>
                        هیچ هزینه‌ای برای نمایش وجود ندارد.
                      </TableCell>
                    </TableRow>
                  )
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={3} style={{ textAlign: "center" }}>
                    هیچ هزینه‌ای برای نمایش وجود ندارد.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {error && <p className="text-center text-red-500 mb-8">{error}</p>}
        </CardContent>
      </Card>

      {/* Return button */}
      <Button
        className="mt-4"
        variant="outline"
        onClick={() => router.push(`/dashboard/users/${userId}`)}
      >
        بازگشت به صفحه کاربر
      </Button>
    </div>
  );
}
