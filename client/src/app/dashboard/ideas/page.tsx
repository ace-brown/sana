"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Container from "@/components/common/container";

export default function IdeasPage() {
  const [step, setStep] = useState(1);
  const [subOptions, setSubOptions] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const [maritalStatus, gender, branchDetail, branchOfStudy] = watch([
    "maritalStatus",
    "gender",
    "branchDetail",
    "branchOfStudy",
  ]);

  const branchesOptions = {
    "علوم انسانی": [
      "ادبیات",
      "زبان‌شناسی",
      "فلسفه",
      "جغرافیا",
      "تاریخ",
      "دین",
      "روان‌شناسی",
      "جامعه‌شناسی",
      "بازاریابی",
      "امور مالی",
      "اقتصاد",
      "مدیریت بازرگانی",
      "گردشگری",
      "حسابداری",
      "حقوق",
    ],
    هنر: [
      "نقاشی",
      "مجسمه‌سازی",
      "عکاسی",
      "هنرهای نمایشی",
      "طراحی لباس",
      "طراحی مد",
      "طراحی دوخت",
      "طراحی پارچه",
      "کتابت و نگارگری",
      "موسیقی",
      "طراحی صنعتی",
      "فرش",
      "طلا و جواهر",
      "گرافیک",
    ],
    "علوم تجربی": ["زیست‌ فناوری", "پزشکی", "مهندسی پزشکی", "زمین‌ شناسی"],
    مهندسی: [
      "مهندسی برق",
      "مهندسی مکانیک",
      "علوم کامپیوتر",
      "معماری",
      "مهندسی محاسباتی",
      "مهندسی زیست‌ محیطی",
    ],
    "تربیت بدنی": [],
    سایر: [],
  };

  type BranchKey = keyof typeof branchesOptions;

  const handleBranchChange = (value: BranchKey) => {
    setValue("branchOfStudy", value);
    setSubOptions(branchesOptions[value]);
    // setValue("branchDetail", ""); // Reset the sub-category field
  };

  const handleNextStep = () => {
    setStep(2);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const onSubmit = (data: any) => {
    console.log("Final Form Data:", data);
    alert("Form submitted successfully!");
  };

  const mockUser = {
    username: "johndoe",
    email: "johndoe@example.com",
    role: "user",
    createdAt: "2024-01-01T00:00:00Z",
    profile: {
      fullName: "John Doe",
      bio: "Passionate developer.",
      avatar: null,
    },
    settings: {
      language: "en",
      notifications: true,
    },
    reports: ["Report 1", "Report 2"],
    ideas: ["Idea 1", "Idea 2"],
  };

  return (
    <Container>
      <div className="max-w-md mx-auto p-6">
        {step === 1 && (
          <form
            onSubmit={handleSubmit(handleNextStep)}
            className="space-y-4 p-6 shadow-2xl rounded-lg border-sm"
          >
            <h1 className="text-2xl font-bold mb-4">مرحله ۱: اطلاعات پایه</h1>

            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                نام و نام خانوادگی
                <span className="text-red-500"> *</span>
              </label>
              <Input
                type="text"
                {...register("name", { required: "Name is required" })}
              />
            </div>

            {/* Father's Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                نام پدر
                <span className="text-red-500"> *</span>
              </label>
              <Input
                type="text"
                {...register("fatherName", {
                  required: "Father Name is required",
                })}
              />
            </div>

            {/* Country Field */}
            <div>
              <label className="block text-sm font-medium mb-2">کشور</label>
              <Input type="text" {...register("country")} />
            </div>

            {/* State and City Fields */}
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">استان</label>
                <Input type="text" {...register("state")} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  شهر
                  <span className="text-red-500"> *</span>
                </label>
                <Input
                  type="text"
                  {...register("city", { required: "City is required" })}
                />
              </div>
            </div>

            {/* Career Fields */}
            <div>
              <label className="block text-sm font-medium mb-2">
                شغل
                <span className="text-red-500"> *</span>
              </label>
              <Input
                type="text"
                {...register("career", { required: "Career is required" })}
              />
            </div>

            {/* Marital Status and Gender Field */}
            <div className="flex gap-4">
              {/* Marital Status Select */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  وضعیت تاهل
                </label>
                <Select
                  onValueChange={(value) => setValue("maritalStatus", value)}
                  value={maritalStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب وضعیت تاهل" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">مجرد</SelectItem>
                    <SelectItem value="married">متاهل</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("maritalStatus")} />
              </div>
              {/* Gender Select */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  جنسیت
                  <span className="text-red-500"> *</span>
                </label>
                <Select
                  onValueChange={(value) => setValue("gender", value)}
                  value={gender}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="انتخاب جنسیت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">مرد</SelectItem>
                    <SelectItem value="female">زن</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("gender", { required: "Gender is required" })}
                />
              </div>
            </div>

            {/* Mobile Number and age Field */}
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  شماره تماس (موبایل)
                  <span className="text-red-500"> *</span>
                </label>
                <Input
                  type="text"
                  {...register("mobileNumber", {
                    required: "Mobile Number is required",
                  })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  سن
                  <span className="text-red-500"> *</span>
                </label>
                <Input
                  type="number"
                  {...register("age", { required: "Age is required" })}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <Link href="#" className="w-1/3">
                <Button type="button" variant="outline">
                  بازگشت به همه فرم‌ها
                </Button>
              </Link>
              <Button type="submit" className="w-1/3">
                بعدی
              </Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-6 shadow-lg rounded-lg"
          >
            <h1 className="text-2xl font-bold mb-4">زمینه تخصصی</h1>

            {/* Branch of Study */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {branchOfStudy}
                <span className="text-red-500"> *</span>
              </label>
              <Select
                onValueChange={(value) =>
                  handleBranchChange(value as BranchKey)
                }
                // value={branchOfStudy}
              >
                <SelectTrigger>
                  <SelectValue placeholder="زمینه تخصصی را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(branchesOptions).map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" {...register("branchOfStudy")} />
            </div>

            {/* Sub-options based on branch */}
            {branchOfStudy && subOptions.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  زمینه تخصصی
                  <span className="text-red-500"> *</span>
                </label>
                <Select
                  onValueChange={(value) => setValue("branchDetail", value)}
                  value={branchDetail}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="زمینه تخصصی را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent>
                    {subOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("branchDetail")} />
              </div>
            )}

            {/* Idea Title Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                عنوان ایده
                <span className="text-red-500"> *</span>
              </label>
              <Input
                type="text"
                {...register("ideaTitle", {
                  required: "Idea Title is required",
                })}
              />
            </div>

            {/* Idea Details Field*/}
            <div>
              <label className="block text-sm font-medium mb-2">
                ایده خود را توصیف کنید
                <span className="text-red-500"> *</span>
              </label>
              <Textarea
                className="min-h-[10rem]"
                {...register("ideaDescription", {
                  required: "Please describe your idea",
                  validate: (value) =>
                    value.trim() !== "" || "Description cannot be empty",
                })}
              />
              {/* Show error message */}
              {errors.ideaDescription &&
                typeof errors.ideaDescription.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ideaDescription.message}
                  </p>
                )}
            </div>

            {/* Back and Submit Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => setStep(1)}
                variant="outline"
                className="w-1/3"
              >
                بازگشت
              </Button>
              <Button type="submit" className="w-1/3">
                ارسال
              </Button>
            </div>
          </form>
        )}
        <Link href="/dashboard">
          <Button>Account</Button>
        </Link>
      </div>
    </Container>
  );
}
