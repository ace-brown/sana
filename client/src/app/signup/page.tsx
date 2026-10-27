"use client";

import React, { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useHttpClient } from "@/hooks/http-hook";
import { AuthContext } from "@/context/auth-context";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const auth = useContext(AuthContext);
  const router = useRouter();
  const { isLoading, error, sendRequest } = useHttpClient();

  // State to manage form data
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    repeatPassword: "",
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

    // Check if passwords match
    if (formData.password !== formData.repeatPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    try {
      const responseData = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
        "POST",
        JSON.stringify(formData),
        {
          "Content-Type": "application/json",
        },
        "Your account was created successfully"
      );
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
    <>
      <Toaster position="top-center" richColors />
      <div className="flex justify-center py-12 md:py-20">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Create your account</CardTitle>
            <CardDescription className="text-center">
              Start your startup journey with Khayam Sana.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* User Name */}
              <div className="mb-4 space-y-2">
                <Label htmlFor="username">
                  Username <span className="text-destructive">*</span>
                </Label>
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
              <div className="mb-4 space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
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
              <div className="mb-4 space-y-2">
                <Label htmlFor="email">
                  Email<span className="text-destructive">*</span>
                </Label>
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
              <div className="mb-4 relative space-y-2">
                <Label htmlFor="password">
                  Password<span className="text-destructive">*</span>
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password must be at least 6 characters"
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute right-3 top-[30px] cursor-pointer text-muted-foreground"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </span>
              </div>

              {/* Repeat Password */}
              <div className="mb-4 relative space-y-2">
                <Label htmlFor="repeatPassword">
                  Repeat Password<span className="text-destructive">*</span>
                </Label>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="repeatPassword"
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  placeholder="Password must be at least 6 characters"
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute right-3 top-[30px] cursor-pointer text-muted-foreground"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </span>
              </div>
              {passwordError && (
                <p className="text-sm text-destructive">{passwordError}</p>
              )}
              {/* Submit Button */}
              <div className="mt-6">
                <Button type="submit" className="w-full" loading={isLoading}>
                  Sign Up
                </Button>
              </div>
            </form>

            <p className="text-sm text-center mt-6 text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Log In
              </Link>
            </p>
            {error && (
              <p className="mt-4 text-center text-sm text-destructive">{error}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
