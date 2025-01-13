"use client";

import React, { useState, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";
import EstimateCostForm from "@/components/costs/EstimateCostForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Table } from "lucide-react";

export default function EstimateCostPage() {
  const [estimatedCosts, setEstimatedCosts] = useState<any[]>();
  const { sendRequest } = useHttpClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const auth = useContext(AuthContext);
  const userId = searchParams.get("userId");
  const reportId = searchParams.get("reportId");

  const handleFormSubmit = async (formData: any) => {
    try {
      const response = await sendRequest(
        "http://localhost:5000/api/costs",
        "POST",
        JSON.stringify({
          userId,
          reportId,
          selectedServices: [
            {
              service: formData.serviceName,
              price: formData.price,
              expert: formData.expert,
            },
          ],
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      setEstimatedCosts(response.cost);
    } catch (err) {
      console.error("Error estimating cost:", err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">تخمین هزینه</h1>

      {/* Form Component */}
      <EstimateCostForm onSubmit={handleFormSubmit} />

      {/*********************************************************************
       *Refactor 2: This card is used here and on the [id]/estimate cost page
       **********************************************************************/}
      {/* Display cost estimate result */}

      {estimatedCosts && (
        <Card>
          <CardHeader>
            <CardTitle>خدمات پیشنهادی</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-right">خدمت</TableHead>
                  <TableHead className="text-right">قیمت (تومان)</TableHead>
                  <TableHead className="text-right">کارشناس مربوطه</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estimatedCosts.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>{item.price.toLocaleString("fa-IR")}</TableCell>
                    <TableCell>{item.expert}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

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
