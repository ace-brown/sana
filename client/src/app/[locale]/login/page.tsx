"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/common/container";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";

export default function LoginPage() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/users/login",
        "POST",
        JSON.stringify({ email, password }),
        {
          "Content-Type": "application/json",
        },
        "Logged in successfully"
      );
      auth.login();
      router.push("/research");
    } catch (err) {}
  };

  return (
    <Container>
      {isLoading && <LoadingSpinner asOverlay />}
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
                <Button type="submit" className="w-full" disabled={isLoading}>
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
