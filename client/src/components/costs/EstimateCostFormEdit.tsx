"use client";

import React, { useContext, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ServiceType } from "@/types";

const predefinedServices = [
  { serviceName: "جلسه ایده پردازی", price: 0, expert: "" },
  { serviceName: "تحقیق بازار", price: 0, expert: "" },
  { serviceName: "تحلیل رقبا", price: 0, expert: "" },
  { serviceName: "مطالعه امکان‌سنجی", price: 0, expert: "" },
  { serviceName: "طراحی اولیه", price: 0, expert: "" },
  { serviceName: "ساخت MVP", price: 0, expert: "" },
  { serviceName: "آزمایش نمونه اولیه", price: 0, expert: "" },
  { serviceName: "آزمایش واحد", price: 0, expert: "" },
  { serviceName: "آزمایش یکپارچه‌سازی", price: 0, expert: "" },
  { serviceName: "بازخورد کاربران", price: 0, expert: "" },
  { serviceName: "راه اندازی وبسایت و هاست", price: 0, expert: "" },
  { serviceName: "پیکربندی تولید", price: 0, expert: "" },
  { serviceName: "عرضه محصول", price: 0, expert: "" },
];

export default function EstimateCostFormEdit({
  reportId,
  userId,
  fetchCosts,
  selectedService,
  costId,
}: {
  reportId: string | null;
  userId: string | null;
  fetchCosts: () => void;
  selectedService: ServiceType;
  costId: string | undefined;
}) {
  const [price, setPrice] = useState("");
  const [expert, setExpert] = useState("");
  const [serviceName, setServiceName] = useState("");
  const { error, isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);

  // Initialize state with selectedService values
  useEffect(() => {
    setPrice(String(selectedService.price));
    setExpert(selectedService.expert || "");
    setServiceName(selectedService.serviceName || "");
  }, [selectedService]);

  // Submit the estimate cost form
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!serviceName) {
      alert("لطفاً یک نام خدمات را انتخاب کنید");
      return;
    }

    if (isNaN(Number(price))) {
      alert("لطفاً یک قیمت معتبر وارد کنید");
      return;
    }

    try {
      await sendRequest(
        `http://localhost:5000/api/costs/${costId}`,
        "PATCH",
        JSON.stringify({
          userId,
          reportId,
          selectedServices: [
            {
              serviceName: selectedService.serviceName,
              price: selectedService.price,
              expert: selectedService.expert,
            },
          ],
        }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
        "تخمین هزینه با موفقیت ویرایش شد"
      );
      fetchCosts();
    } catch (err) {}
  }

  return (
    <>
      <Toaster position="top-center" richColors />

      <form onSubmit={handleSubmit} className="space-y-4">
        {isLoading && (
          <div className="center">
            <LoadingSpinner asOverlay />
          </div>
        )}
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-2">
            قیمت
          </label>
          <Input
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="قیمت را وارد کنید"
            required
          />
        </div>

        <div>
          <label htmlFor="expert" className="block text-sm font-medium mb-2">
            متخصص
          </label>
          <Input
            id="expert"
            value={expert}
            onChange={(e) => setExpert(e.target.value)}
            placeholder="نام متخصص را وارد کنید"
            required
          />
        </div>

        <div>
          <label
            htmlFor="serviceName"
            className="block text-sm font-medium mb-2"
          >
            نام خدمات
          </label>
          <Select
            onValueChange={(value) => setServiceName(value)}
            value={serviceName}
            required
          >
            <SelectTrigger style={{ direction: "rtl" }}>
              <SelectValue placeholder="انتخاب نام خدمات" />
            </SelectTrigger>
            <SelectContent style={{ direction: "rtl" }}>
              {predefinedServices.map((service, index) => (
                <SelectItem key={index} value={service.serviceName}>
                  {service.serviceName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="mt-4">
          ارسال
        </Button>
        {error && <p className="text-center text-red-500 mb-8">{error}</p>}
      </form>
    </>
  );
}
