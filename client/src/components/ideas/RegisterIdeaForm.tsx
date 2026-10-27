import { useEffect, useState } from "react";
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
import { RenderError } from "@/lib/FormUtils";

type RegisterIdeaFormProps = {
  onSubmit: (data: RegisterIdeaType) => void;
  defaultValues?: RegisterIdeaType;
};

export default function RegisterIdeaForm({
  onSubmit,
  defaultValues,
}: RegisterIdeaFormProps) {
  const [subOptions, setSubOptions] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegisterIdeaType>({ defaultValues });
  const [maritalStatus, gender, branchDetail, branchOfStudy] = watch([
    "maritalStatus",
    "gender",
    "branchDetail",
    "branchOfStudy",
  ]);

  // Reset form with the default values
  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const branchesOptions = {
    Humanities: [
      "Literature",
      "Linguistics",
      "Philosophy",
      "Geography",
      "History",
      "Religion",
      "Psychology",
      "Sociology",
      "Marketing",
      "Finance",
      "Economics",
      "Business Administration",
      "Tourism",
      "Accounting",
      "Law",
    ],
    Arts: [
      "Painting",
      "Sculpture",
      "Photography",
      "Performing Arts",
      "Costume Design",
      "Fashion Design",
      "Tailoring Design",
      "Textile Design",
      "Calligraphy and Miniature Painting",
      "Music",
      "Industrial Design",
      "Carpet Weaving",
      "Gold and Jewelry",
      "Graphic Design",
    ],
    "Natural Sciences": ["Biotechnology", "Medicine", "Biomedical Engineering", "Geology"],
    Engineering: [
      "Electrical Engineering",
      "Mechanical Engineering",
      "Computer Science",
      "Architecture",
      "Computational Engineering",
      "Environmental Engineering",
    ],
    "Physical Education": [],
    Other: [],
  };

  type BranchKey = keyof typeof branchesOptions;

  function handleBranchChange(value: BranchKey) {
    setValue("branchOfStudy", value, { shouldValidate: true });
    setSubOptions(branchesOptions[value]);
    // setValue("branchDetail", ""); // Reset the sub-category field
  }

  function handleFormSubmit(data: RegisterIdeaType) {
    onSubmit(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="grid grid-cols-2 gap-8">
          {/* First Column */}
          <div className="space-y-2">
            {/* Father's and accociate Name Field */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Father&apos;s Name
                  <span className="text-red-500"> *</span>
                </label>
                <Input
                  type="text"
                  {...register("fatherName", {
                    required: "Father's name is required",
                  })}
                />
                {RenderError(errors, "fatherName")}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Partners&apos; Names
                </label>
                <Input type="text" {...register("associate")} />
              </div>
            </div>
            {/* Country Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <Input type="text" {...register("country")} />
            </div>

            {/* State and City Fields */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">State / Province</label>
                <Input type="text" {...register("state")} />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  City
                  <span className="text-red-500"> *</span>
                </label>
                <Input
                  type="text"
                  {...register("city", { required: "City is required" })}
                />
                {RenderError(errors, "city")}
              </div>
            </div>

            {/* Career Fields */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Occupation
                <span className="text-red-500"> *</span>
              </label>
              <Input
                type="text"
                {...register("career", { required: "Occupation is required" })}
              />
              {RenderError(errors, "career")}
            </div>

            {/* Marital Status and Gender Field */}
            <div className="flex gap-4">
              {/* Marital Status Select */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Marital Status
                </label>
                <Select
                  onValueChange={(value) => setValue("maritalStatus", value)}
                  value={maritalStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("maritalStatus")} />
              </div>
              {/* Gender Select */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Gender
                  <span className="text-red-500"> *</span>
                </label>
                <Select
                  onValueChange={(value) => {
                    setValue("gender", value, { shouldValidate: true });
                  }}
                  value={gender}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                <input
                  type="hidden"
                  {...register("gender", { required: "Gender is required" })}
                />
                {RenderError(errors, "gender")}
              </div>
            </div>

            {/* Mobile Number and age Field */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Mobile Number
                  <span className="text-red-500"> *</span>
                </label>
                <Input
                  type="text"
                  {...register("mobileNumber", {
                    required: "Mobile number is required",
                  })}
                />
                {RenderError(errors, "mobileNumber")}
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Age
                  <span className="text-red-500"> *</span>
                </label>
                <Input
                  type="number"
                  {...register("age", { required: "Age is required" })}
                />
                {RenderError(errors, "age")}
              </div>
            </div>
          </div>

          {/* Second Column */}
          <div className="space-y-2">
            {/* Branch of Study */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Field of Study
                <span className="text-red-500"> *</span>
              </label>
              <Select
                onValueChange={(value) =>
                  handleBranchChange(value as BranchKey)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your field of study" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(branchesOptions).map((branch) => (
                    <SelectItem key={branch} value={branch}>
                      {branch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("branchOfStudy", {
                  required: "Field of study is required",
                })}
              />
              {RenderError(errors, "branchOfStudy")}
            </div>

            {/* Sub-options based on branch */}
            {branchOfStudy && subOptions.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2">
                  Specialization
                </label>
                <Select
                  onValueChange={(value) =>
                    setValue("branchDetail", value, { shouldValidate: true })
                  }
                  value={branchDetail}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your specialization" />
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
                Idea Title
                <span className="text-red-500"> *</span>
              </label>
              <Input
                type="text"
                {...register("ideaTitle", {
                  required: "Idea title is required",
                })}
              />
              {RenderError(errors, "ideaTitle")}
            </div>

            {/* Idea Details Field*/}
            <div>
              <label className="block text-sm font-medium mb-2">
                Describe Your Idea
                <span className="text-red-500"> *</span>
              </label>
              <Textarea
                className="min-h-[10rem]"
                {...register("ideaDescription", {
                  required: "Idea description is required",
                })}
              />
              {RenderError(errors, "ideaDescription")}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
