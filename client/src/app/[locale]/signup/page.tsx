import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/common/container";

export default function SignupPage() {
  const t = useTranslations();

  return (
    <Container>
      <div className="min-h-[50vh] flex items-start justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              {t("signup.signup")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              {/* First Name */}
              <div className="mb-4">
                <Label htmlFor="firstName">{t("signup.fName")}</Label>
                <Input type="text" id="firstName" name="firstName" required />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <Label htmlFor="lastName">{t("signup.lName")}</Label>
                <Input type="text" id="lastName" name="lastName" required />
              </div>

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
                  {t("signup.signup")}
                </Button>
              </div>
            </form>

            <p className="text-sm text-center mt-4 text-gray-600">
              {t("signup.alreadyAccount")}{" "}
              <Link
                href="/signin"
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
