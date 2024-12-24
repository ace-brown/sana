"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/common/container";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function LoginPage() {
  const t = useTranslations();

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to login");
      }

      // const responseData = await response.json();
      // console.log(responseData);

      // Redirect to dashboard or home page after successful login
      // router.push("/dashboard");

      toast.success("Logged in successfully");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {loading && <LoadingSpinner asOverlay />}
      <Toaster position="top-center" richColors />
      <div className="min-h-[50vh] flex items-start justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {t("signup.login")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              {/* Email */}
              <div className="mb-4">
                <Label htmlFor="email">{t("signup.email")}</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button type="submit" className="w-full" disabled={loading}>
                  {t("signup.login")}
                </Button>
              </div>
            </form>

            <p className="text-sm text-center mt-4 text-gray-600">
              {t("signup.noAccount")}{" "}
              <Link
                href="/signup"
                className="text-indigo-600 hover:underline focus:outline-none"
              >
                {t("signup.signup")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
