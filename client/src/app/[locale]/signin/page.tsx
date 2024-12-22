import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/common/container";

export default function SigninPage() {
  const t = useTranslations();

  return (
    <Container>
      <div className="min-h-[50vh] flex items-start justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {t("signup.login")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              {/* Email */}
              <div className="mb-4">
                <Label htmlFor="email">{t("signup.email")}</Label>
                <Input type="email" id="email" name="email" required />
              </div>

              {/* Password */}
              <div className="mb-4">
                <Label htmlFor="password">{t("signup.password")}</Label>
                <Input type="password" id="password" name="password" required />
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <Button type="submit" className="w-full">
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
