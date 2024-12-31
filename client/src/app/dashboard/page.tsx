"use client";

import React, { useContext, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";
import { UserType } from "@/types";

export default function AccountPage() {
  const { isLoading, error, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  const [profileData, setProfileData] = useState<UserType>();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update profile handler
  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/users/${userId}`,
        "PATCH",
        JSON.stringify(formData),
        { "Content-Type": "application/json" },
        "پروفایل با موفقیت به‌روزرسانی شد"
      );
      fetchUserProfile();
    } catch (err) {}
  }

  async function fetchUserProfile() {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/users/${userId}`
      );

      setProfileData(responseData.user);
    } catch (err) {}
  }
  useEffect(() => {
    fetchUserProfile();
  }, [sendRequest, userId]);

  console.log("PrifileData", profileData);
  return (
    <div className="w-[500px]">
      <div>
        <form onSubmit={handleUpdateProfile} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="fullName">نام و نام خانوادگی</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder={profileData?.profile.fullName}
              className="w-full"
            />
            <p className="text-[0.8rem] text-muted-foreground">
              نام و نام خانوادگی{" "}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">نام کاربری</Label>
            <Input
              id="username"
              name="username"
              placeholder={profileData?.username}
              className="w-full"
            />
            <p className="text-[0.8rem] text-muted-foreground">
              این نام نمایش عمومی شماست
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              name="email"
              placeholder={profileData?.email}
              className="w-full"
            />
            <p className="text-[0.8rem] text-muted-foreground">
              تنظیمات ایمیل خود را در تنظیمات حساب خود مدیریت کنید
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">بیوگرافی</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder={profileData?.profile.bio}
              className="w-full"
            />
            <p className="text-[0.8rem] text-muted-foreground">
              این بیوگرافی درباره شما است
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">رمز عبور</Label>
            <Input
              id="password"
              name="password"
              value={profileData?.password}
              className="w-full"
            />
            <p className="text-[0.8rem] text-muted-foreground">
              این رمز عبور شما برای ورود به حساب کاربری‌تان است
            </p>
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <Button type="submit" className="w-full mt-4">
            به روز رسانی پروفایل ها
          </Button>
        </form>
      </div>
    </div>
  );
}
