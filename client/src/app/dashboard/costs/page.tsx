"use client";

import { useContext, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FileUpload from "@/components/common/FileUpload";
import { AuthContext } from "@/context/auth-context";

export default function CostsPage() {
  const calculatedPrices = [
    { service: "تحقیق بازار", price: 3000000, expert: "محمد رضایی" },
    { service: "توسعه MVP", price: 2000000, expert: "علی احمدی" },
    { service: "طراحی برند", price: 500000, expert: "زهرا کریمی" },
    { service: "طراحی وب‌سایت", price: 800000, expert: "علی رضایی" },
    { service: "تدوین ویدیو", price: 600000, expert: "مریم حسینی" },
    {
      service: "مدیریت شبکه‌های اجتماعی",
      price: 700000,
      expert: "سینا مرادی",
    },
  ];
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const auth = useContext(AuthContext);

  // Calculate total price
  const totalPrice = selectedServices.reduce(
    (total, index) => total + calculatedPrices[index].price,
    0
  );

  const handleCheckboxChange = (index: number) => {
    setSelectedServices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <p className="text-lg text-gray-600">
          ما ایده شما را بررسی کرده و این خدمات را برای کمک به دستیابی به اهداف
          شما تنظیم کرده‌ایم.
        </p>
      </div>

      {/*********************************************************************
       *Refactor 2: This card is used here and on the [id]/estimate cost page
       **********************************************************************/}
      {/* Costs Table */}
      <Card>
        <CardHeader>
          <CardTitle>خدمات پیشنهادی</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">انتخاب</TableHead>
                <TableHead className="text-right">خدمت</TableHead>
                <TableHead className="text-right">قیمت (تومان)</TableHead>
                <TableHead className="text-right">کارشناس مربوطه</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calculatedPrices.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <input
                      type="checkbox"
                      onChange={() => handleCheckboxChange(index)}
                      checked={selectedServices.includes(index)}
                    />
                  </TableCell>
                  <TableCell>{item.service}</TableCell>
                  <TableCell>{item.price.toLocaleString("fa-IR")}</TableCell>
                  <TableCell>{item.expert}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 text-right text-lg font-bold">
            جمع کل: {totalPrice.toLocaleString("fa-IR")} تومان
          </div>
        </CardContent>
      </Card>

      {/* New Feature Section */}
      <div className="text-center mt-8">
        <p className="text-lg text-gray-600 mb-4">
          لطفاً مبلغ کل را به حساب بانکی زیر واریز کرده و سپس رسید پرداخت خود را
          بارگذاری کنید.
        </p>

        {/* Grid for Bank Info and Upload Component */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col flex-1 h-full">
            <label className="text-right font-semibold mb-2">
              اطلاعات بانکی:
            </label>
            <div className="border p-4 text-right">
              <p>بانک: ملی ایران</p>
              <p>شماره حساب: 123-456-7890</p>
              <p>کد شبا: IR123456789012345678901234</p>
            </div>
          </div>

          <div className="flex flex-col flex-1 h-full">
            <label className="text-right font-semibold mb-2">
              بارگذاری رسید پرداخت
            </label>
            <div className="border p-4">
              <p className="mb-2 text-center">
                لطفاً رسید پرداخت خود را بارگذاری کنید
              </p>
              <FileUpload />
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="text-center mt-8">
        <p className="text-lg text-gray-600 mb-4">
          با استفاده از شناسه گزارش زیر میتوانید گزارش مربوط به ایده ی خود را
          مشاهده کنید.
        </p>
        <p>شناسه گزارش: {auth.reportId}</p>
        <Button className="px-8 py-4 text-lg">برو به گزارش ها</Button>
      </div>

      {/* Additional Information */}
      <div className="space-y-8">
        {/* How It Works */}
        <div>
          <h2 className="text-2xl font-bold">
            چگونه برنامه شما را محاسبه می‌کنیم
          </h2>
          <p className="text-gray-600 mt-2">
            تیم ما ایده شما، اهداف تجاری و نیازهای شما را به دقت بررسی می‌کند.
            بر اساس این ارزیابی، ما یک برنامه شخصی‌سازی‌شده با خدمات ضروری برای
            موفقیت ایده شما ایجاد می‌کنیم.
          </p>
        </div>

        {/* Contact/Support */}
        <div>
          <h2 className="text-2xl font-bold">نیاز به کمک دارید؟</h2>
          <p className="text-gray-600 mt-2">
            سوالی درباره برنامه خود دارید یا به اطلاعات بیشتری نیاز دارید؟ لطفاً{" "}
            <Link href="/contact" className="text-blue-500 underline">
              با ما تماس بگیرید
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
