"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export default function EstimateCostForm({
  onSubmit,
}: {
  onSubmit: (formData: any) => void;
}) {
  const [price, setPrice] = useState("");
  const [expert, setExpert] = useState("");
  const [serviceName, setServiceName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceName) {
      alert("لطفاً یک نام خدمات را انتخاب کنید");
      return;
    }

    if (isNaN(Number(price))) {
      alert("لطفاً یک قیمت معتبر وارد کنید");
      return;
    }
    onSubmit({ serviceName, price: Number(price), expert });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <label htmlFor="serviceName" className="block text-sm font-medium mb-2">
          نام خدمات
        </label>
        <Select onValueChange={(value) => setServiceName(value)} required>
          <SelectTrigger>
            <SelectValue placeholder="انتخاب نام خدمات" />
          </SelectTrigger>
          <SelectContent>
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
    </form>
  );
}
