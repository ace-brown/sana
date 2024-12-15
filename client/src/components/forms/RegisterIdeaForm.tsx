"use client";

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

const branchesOptions = {
  "literal studies": ["Literature", "Linguistics", "Philosophy"],
  art: ["Painting", "Sculpture", "Performing Arts"],
  "experimental science": ["Physics", "Chemistry", "Biology"],
  engineering: [
    "Computer Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
  ],
  physical: ["Fitness", "Sports", "Physiotherapy"],
  others: ["Business", "Law", "Other Fields"],
};

type BranchKey = keyof typeof branchesOptions;

const RegisterIdeaForm = () => {
  const [step, setStep] = useState(1);
  const [subOptions, setSubOptions] = useState<string[]>([]);
  const { register, handleSubmit, watch, setValue } = useForm();
  const selectedBranch = watch("branchOfStudy");

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
    <div className="max-w-md mx-auto p-6">
      {step === 1 && (
        <form onSubmit={handleSubmit(() => setStep(2))} className="space-y-4">
          <h1 className="text-2xl font-bold mb-4">Step 1: Basic Information</h1>

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <Input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
            />
          </div>

          {/* Branch of Study */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Branch of Study
            </label>
            <Select
              onValueChange={(value) => handleBranchChange(value as BranchKey)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select branch of study" />
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
          {selectedBranch && (
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

          <Button type="submit" className="w-full">
            Next
          </Button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
  );
};

export default RegisterIdeaForm;
