"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Toaster } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/common/container";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";

export default function SignupPage() {
  const t = useTranslations();
  const auth = useContext(AuthContext);
  const router = useRouter();
  const { isLoading, error, sendRequest } = useHttpClient();

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
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        JSON.stringify(formData),
        {
          "Content-Type": "application/json",
        },
        "Account created successfully"
      );
      auth.login();
      router.push("/research");
    } catch (err) {}
  }

  return (
    <Container>
      {isLoading && <LoadingSpinner asOverlay />}
      <Toaster position="top-center" richColors />
      <div className="min-h-[50vh] flex items-start justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {t("signup.signup")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* User Name */}
              <div className="mb-4">
                <Label htmlFor="username">{t("signup.userName")}</Label>
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
                <Label htmlFor="fullName">{t("signup.fullName")}</Label>
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
                <Label htmlFor="email">{t("signup.email")}</Label>
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
                <Label htmlFor="password">{t("signup.password")}</Label>
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
                  {t("signup.signup")}
                </Button>
              </div>
            </form>

            {error && (
              <p className="text-sm text-red-500 text-center mt-4">{error}</p>
            )}

            <p className="text-sm text-center mt-4 text-gray-600">
              {t("signup.alreadyAccount")}{" "}
              <Link
                href="/login"
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                {t("signup.login")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
