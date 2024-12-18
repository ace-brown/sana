"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
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

export default function RegisterIdeaForm() {
  const [step, setStep] = useState(1);
  const [subOptions, setSubOptions] = useState<string[]>([]);
  const { register, handleSubmit, watch, setValue } = useForm();
  const selectedBranch = watch("branchOfStudy");
  const t = useTranslations();
  const locale = useLocale();
  const rtl = locale === "fa";

  // Translations
  const basicInfoTxt = t("registerIdeaForm.firstStep.title");
  const nameTxt = t("registerIdeaForm.firstStep.name");
  const emailTxt = t("registerIdeaForm.firstStep.email");
  const branchOfStudyTxt = t("registerIdeaForm.firstStep.branch.title");
  const SelectBranchOfStudyTxt = t("registerIdeaForm.firstStep.branch.select");
  const othersTxt = t("registerIdeaForm.firstStep.branch.options.others");

  const branchesOptions = {
    "registerIdeaForm.firstStep.branch.options.literal": [
      "Literature",
      "Linguistics",
      "Philosophy",
    ],
    "registerIdeaForm.firstStep.branch.options.art": [
      "Painting",
      "Sculpture",
      "Performing Arts",
    ],
    "registerIdeaForm.firstStep.branch.options.expSci": [
      "Physics",
      "Chemistry",
      "Biology",
    ],
    "registerIdeaForm.firstStep.branch.options.engin": [
      "Computer Engineering",
      "Mechanical Engineering",
      "Electrical Engineering",
    ],
    "registerIdeaForm.firstStep.branch.options.physical": [],
    "registerIdeaForm.firstStep.branch.options.others": [],
  };

  type BranchKey = keyof typeof branchesOptions;

  const handleBranchChange = (value: BranchKey) => {
    setValue("branchOfStudy", value);
    setSubOptions(branchesOptions[value]);
    setValue("branchDetail", ""); // Reset the sub-category field
  };

  const onSubmit = (data: any) => {
    console.log("Final Form Data:", data);
    alert("Form submitted successfully!");
  };

  return (
    <Container>
      <div className="max-w-md mx-auto p-6">
        {step === 1 && (
          <form
            onSubmit={handleSubmit(() => setStep(2))}
            className="space-y-4 p-6 shadow-lg rounded-lg"
          >
            <h1 className="text-2xl font-bold mb-4">{basicInfoTxt}</h1>

            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {nameTxt}
              </label>
              <Input
                type="text"
                {...register("name", { required: "Name is required" })}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {emailTxt}
              </label>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            {/* Branch of Study */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {branchOfStudyTxt}
              </label>
              <Select
                onValueChange={(value) =>
                  handleBranchChange(value as BranchKey)
                }
              >
                <SelectTrigger style={{ direction: rtl ? "rtl" : "ltr" }}>
                  <SelectValue placeholder={SelectBranchOfStudyTxt} />
                </SelectTrigger>
                <SelectContent style={{ direction: rtl ? "rtl" : "ltr" }}>
                  {Object.keys(branchesOptions).map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {t(branch)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" {...register("branchOfStudy")} />
            </div>

            {/* Sub-options based on branch */}
            {selectedBranch && subOptions.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Specific Field
                </label>
                <Select
                  onValueChange={(value) => setValue("branchDetail", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select specific field" />
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

            <div
              className="flex justify-between"
              style={{ direction: rtl ? "rtl" : "ltr" }}
            >
              <Link href="/research" className="w-1/3">
                <Button type="button" variant="outline">
                  Back to all forms
                </Button>
              </Link>
              <Button type="submit" className="w-1/3">
                Next
              </Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-6 shadow-lg rounded-lg"
          >
            <h1 className="text-2xl font-bold mb-4">Step 2: Your Idea</h1>

            {/* Idea Details */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Describe Your Idea
              </label>
              <Textarea
                {...register("ideaDescription", {
                  required: "Please describe your idea",
                })}
                placeholder="Write about your idea..."
              />
            </div>

            {/* Back and Submit Buttons */}
            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => setStep(1)}
                variant="outline"
                className="w-1/3"
              >
                Back
              </Button>
              <Button type="submit" className="w-1/3">
                Submit
              </Button>
            </div>
          </form>
        )}
      </div>
    </Container>
  );
}
