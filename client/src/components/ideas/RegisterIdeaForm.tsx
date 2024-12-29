import { useState } from "react";
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
import { RegisterIdeaType } from "@/types";

type RegisterIdeaFormProps = {
  onSubmit: (data: RegisterIdeaType) => void;
};
export default function RegisterIdeaForm({ onSubmit }: RegisterIdeaFormProps) {
  const [subOptions, setSubOptions] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterIdeaType>();
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

  function handleBranchChange(value: BranchKey) {
    setValue("branchOfStudy", value);
    setSubOptions(branchesOptions[value]);
    // setValue("branchDetail", ""); // Reset the sub-category field
  }

  function handleFormSubmit(data: RegisterIdeaType) {
    onSubmit(data);
  }

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
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-2 gap-8">
          {/* First Column */}
          <div className="space-y-2">
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
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">استان</label>
                <Input type="text" {...register("state")} />
              </div>
              <div className="flex-1">
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
                  <SelectTrigger style={{ direction: "rtl" }}>
                    <SelectValue placeholder="انتخاب وضعیت تاهل" />
                  </SelectTrigger>
                  <SelectContent style={{ direction: "rtl" }}>
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
                  <SelectTrigger style={{ direction: "rtl" }}>
                    <SelectValue placeholder="انتخاب جنسیت" />
                  </SelectTrigger>
                  <SelectContent style={{ direction: "rtl" }}>
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
              <div className="flex-1">
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
              <div className="flex-1">
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
          </div>

          {/* Second Column */}
          <div className="space-y-2">
            {/* Branch of Study */}
            <div>
              <label className="block text-sm font-medium mb-2">
                رشته ی تحصیلی
                <span className="text-red-500"> *</span>
              </label>
              <Select
                onValueChange={(value) =>
                  handleBranchChange(value as BranchKey)
                }
              >
                <SelectTrigger style={{ direction: "rtl" }}>
                  <SelectValue placeholder="زمینه تخصصی را انتخاب کنید" />
                </SelectTrigger>
                <SelectContent style={{ direction: "rtl" }}>
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
                  <SelectTrigger style={{ direction: "rtl" }}>
                    <SelectValue placeholder="زمینه تخصصی را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent style={{ direction: "rtl" }}>
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
                className="min-h-[13rem]"
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

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              ارسال
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
