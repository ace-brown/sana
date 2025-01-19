"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/common/container";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";

export default function SignupPage() {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const { isLoading, error } = useHttpClient();

  // State to manage form data
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle form submission
  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();

  //   try {
  //     const responseData = await sendRequest(
  //       `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
  //       "POST",
  //       JSON.stringify(formData),
  //       {
  //         "Content-Type": "application/json",
  //       },
  //       "حساب کاربری شما با موفقیت ایجاد شد "
  //     );
  //     auth.login(
  //       responseData.userId,
  //       responseData.fullName,
  //       responseData.username,
  //       responseData.role,
  //       responseData.token
  //     );
  //     router.push("/dashboard");
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   } catch (err) {}
  // }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
        formData, // Axios automatically stringifies JSON data
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = response.data;

      auth.login(
        responseData.userId,
        responseData.fullName,
        responseData.username,
        responseData.role,
        responseData.token
      );

      router.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {}
  }

  return (
    <Container>
      {isLoading && <LoadingSpinner asOverlay />}
      <Toaster position="top-center" richColors />
      <div className="min-h-[50vh] flex items-start justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">ثبت‌ نام</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* User Name */}
              <div className="mb-4">
                <Label htmlFor="username">نام کاربری</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Full Name */}
              <div className="mb-4">
                <Label htmlFor="fullName">نام و نام خانوادگی</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <Label htmlFor="password">رمز عبور</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  ثبت‌ نام
                </Button>
              </div>
            </form>

            <p className="text-sm text-center mt-4 text-gray-600">
              آیا قبلاً حساب کاربری دارید؟
              <Link
                href="/login"
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                ورود
              </Link>
            </p>
            {error && <p className="text-center text-red-500 mb-8">{error}</p>}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
