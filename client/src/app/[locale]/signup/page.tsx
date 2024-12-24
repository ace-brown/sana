"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Toaster, toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/common/container";

export default function SignupPage() {
  const t = useTranslations();

  // State to manage form data
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
  });

  // State for handling errors, loading, and success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<string | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // setSuccess(null);

    try {
      // Make an API call to the backend
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create an account.");
      }

      // Success message
      // setSuccess("Account created successfully! Please log in.");
      toast("My first toast");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Toaster />
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {t("signup.signup")}
                </Button>
              </div>
            </form>

            {error && (
              <p className="text-sm text-red-500 text-center mt-4">{error}</p>
            )}
            {/* {success && (
              <p className="text-sm text-green-500 text-center mt-4">
                
              </p>
            )} */}

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
