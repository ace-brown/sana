"use client";

import React, { useContext, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";
import { UserType } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export default function UserDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [user, setUser] = useState<UserType | null>(null);
  const { isLoading, error, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/users/${params.id}`,
          "GET",
          null,
          { Authorization: "Bearer " + auth.token }
        );
        setUser(responseData.user);
      } catch (err) {}
    }

    fetchUserDetails();
  }, [params.id, sendRequest, auth.token]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="center">
        <div>
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
          <Skeleton className="h-8 w-full mb-2" />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <p className="text-red-500">خطا: {error}</p>;
  }

  // No user found state
  if (!user) {
    return <p>هیچ اطلاعاتی برای این کاربر یافت نشد</p>;
  }

  // User details display
  return (
    <Card className="p-8 mt-8 shadow">
      <h1 className="text-2xl font-bold mb-4">جزئیات کاربر</h1>
      <p>
        <strong>شناسه کاربر:</strong> {user.id || "اطلاعات موجود نیست"}
      </p>
      <p>
        <strong>نام کاربری:</strong> {user.username || "اطلاعات موجود نیست"}
      </p>
      <p>
        <strong>نام کامل:</strong>{" "}
        {user.profile.fullName || "اطلاعات موجود نیست"}
      </p>
      <p>
        <strong>ایمیل:</strong> {user.email || "اطلاعات موجود نیست"}
      </p>
      <p>
        <strong>نقش:</strong> {user.role === "admin" ? "مدیر" : "کاربر"}
      </p>
      <p>
        <strong>بیوگرافی:</strong> {user.profile.bio || "اطلاعات موجود نیست"}
      </p>
      <p>
        <strong>زبان:</strong>{" "}
        {user.settings?.language === "fa"
          ? "فارسی"
          : user.settings?.language === "en"
          ? "انگلیسی"
          : "اطلاعات موجود نیست"}
      </p>
      <p>
        <strong>اعلان‌ها:</strong>{" "}
        {user.settings?.notifications !== undefined
          ? user.settings.notifications
            ? "فعال"
            : "غیرفعال"
          : "اطلاعات موجود نیست"}
      </p>
      <p>
        <strong>آواتار:</strong>{" "}
        {user.profile.avatar ? (
          <img
            src={user.profile.avatar}
            alt={`آواتار ${user.username}`}
            className="w-32 h-32 rounded-full mt-4"
          />
        ) : (
          "تصویر موجود نیست"
        )}
      </p>
      <p>
        <strong>گزارش‌ها:</strong>{" "}
        {user.reports && user.reports?.length > 0
          ? user.reports.join(", ")
          : "اطلاعات موجود نیست"}
      </p>
      <p>
        <strong>ایده‌ها:</strong>{" "}
        {user.ideas && user.ideas?.length > 0
          ? user.ideas.join(", ")
          : "اطلاعات موجود نیست"}
      </p>

      {/* Return Button */}
      <Button
        className="mt-4"
        variant="outline"
        onClick={() => router.push("/dashboard/users")}
      >
        بازگشت به صفحه کاربران
      </Button>
    </Card>
  );
}
