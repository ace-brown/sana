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
  const [maritalStatus, gender, branchDetail, branchOfStudy] = watch([
    "maritalStatus",
    "gender",
    "branchDetail",
    "branchOfStudy",
  ]);
  const t = useTranslations();
  const locale = useLocale();
  const rtl = locale === "fa";

  // Translations
  const basicInfoTxt = t("registerIdeaForm.firstStep.title");
  const nameTxt = t("registerIdeaForm.firstStep.fullName");
  const fatherNameTxt = t("registerIdeaForm.firstStep.fatherName");
  const countryTxt = t("registerIdeaForm.firstStep.country");
  const cityTxt = t("registerIdeaForm.firstStep.city");
  const careerTxt = t("registerIdeaForm.firstStep.career");
  const genderTxt = t("registerIdeaForm.firstStep.gender");
  const mobileNumberTxt = t("registerIdeaForm.firstStep.mobileNumber");
  const ageTxt = t("registerIdeaForm.firstStep.age");
  const maritalStatusTxt = t("registerIdeaForm.firstStep.maritalStatus");
  const idNumberTxt = t("registerIdeaForm.firstStep.idNumber");
  const stateTxt = t("registerIdeaForm.firstStep.state");
  const emailTxt = t("registerIdeaForm.firstStep.email");
  const branchOfStudyTxt = t("registerIdeaForm.firstStep.branch.title");
  const SelectBranchOfStudyTxt = t("registerIdeaForm.firstStep.branch.select");
  const spesificFieldTxt = t("registerIdeaForm.firstStep.subBranch.title");
  const selectSpesificFieldTxt = t(
    "registerIdeaForm.firstStep.subBranch.select"
  );
  const LiteratureTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Literature"
  );
  const LinguisticsTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Linguistics"
  );
  const PhilosophyTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Philosophy"
  );
  const GeographyTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Geography"
  );
  const HistoryTxt = t("registerIdeaForm.firstStep.subBranch.literal.History");
  const ReligionTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Religion"
  );
  const PsychologyTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Psychology"
  );
  const SociologyTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Sociology"
  );
  const MarketingTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Marketing"
  );
  const FinanceTxt = t("registerIdeaForm.firstStep.subBranch.literal.Finance");
  const EconomicsTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Economics"
  );
  const MBATxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.BusinessAdministration"
  );
  const TourismTxt = t("registerIdeaForm.firstStep.subBranch.literal.Tourism");
  const AccountingTxt = t(
    "registerIdeaForm.firstStep.subBranch.literal.Accounting"
  );
  const lawTxt = t("registerIdeaForm.firstStep.subBranch.literal.law");
  const PaintingTxt = t("registerIdeaForm.firstStep.subBranch.art.Painting");
  const SculptureTxt = t("registerIdeaForm.firstStep.subBranch.art.Sculpture");
  const PhotographyTxt = t(
    "registerIdeaForm.firstStep.subBranch.art.Photography"
  );
  const PerformingArtsTxt = t(
    "registerIdeaForm.firstStep.subBranch.art.PerformingArts"
  );
  const ClothDesignTxt = t(
    "registerIdeaForm.firstStep.subBranch.art.ClothDesign"
  );
  const fashionDesignTxt = t(
    "registerIdeaForm.firstStep.subBranch.art.fashionDesign"
  );
  const sewingDesignTxt = t(
    "registerIdeaForm.firstStep.subBranch.art.sewingDesign"
  );
  const textileDesignTxt = t(
    "registerIdeaForm.firstStep.subBranch.art.textileDesign"
  );
  const calliIlluminationTxt = t(
    "registerIdeaForm.firstStep.subBranch.art.calliIllumination"
  );
  const MusicTxt = t("registerIdeaForm.firstStep.subBranch.art.Music");
  const industrialDesignTxt = t(
    "registerIdeaForm.firstStep.subBranch.art.industrialDesign"
  );
  const carpetTxt = t("registerIdeaForm.firstStep.subBranch.art.carpet");
  const jewleryTxt = t("registerIdeaForm.firstStep.subBranch.art.jewlery");
  const graphicsTxt = t("registerIdeaForm.firstStep.subBranch.art.graphics");
  const ElectricalEnginTxt = t(
    "registerIdeaForm.firstStep.subBranch.engin.ElectricalEngin"
  );
  const MechanicalEnginTxt = t(
    "registerIdeaForm.firstStep.subBranch.engin.MechanicalEngin"
  );
  const ComputerSciTxt = t(
    "registerIdeaForm.firstStep.subBranch.engin.ComputerSci"
  );
  const architecTxt = t("registerIdeaForm.firstStep.subBranch.engin.architec");
  const compEnginTxt = t(
    "registerIdeaForm.firstStep.subBranch.engin.compEngin"
  );
  const envEnginTxt = t("registerIdeaForm.firstStep.subBranch.engin.envEngin");
  const BiotechTxt = t("registerIdeaForm.firstStep.subBranch.expSci.Biotech");
  const MedicineTxt = t("registerIdeaForm.firstStep.subBranch.expSci.Medicine");
  const BioEnginTxt = t("registerIdeaForm.firstStep.subBranch.expSci.BioEngin");
  const GeologyTxt = t("registerIdeaForm.firstStep.subBranch.expSci.Geology");
  const backToFormsTxt = t("registerIdeaForm.backToForms");
  const nextTxt = t("next");
  const submitTxt = t("submit");
  const backTxt = t("back");
  const SecSteptitleTxt = t("registerIdeaForm.secondStep.title");
  const ideaTitleTxt = t("ideaTitle");
  const SecStepDescribeIdeaTxt = t("registerIdeaForm.secondStep.describeIdea");

  const branchesOptions = {
    "registerIdeaForm.firstStep.branch.options.literal": [
      LiteratureTxt,
      LinguisticsTxt,
      PhilosophyTxt,
      GeographyTxt,
      HistoryTxt,
      ReligionTxt,
      PsychologyTxt,
      SociologyTxt,
      MarketingTxt,
      FinanceTxt,
      EconomicsTxt,
      MBATxt,
      TourismTxt,
      AccountingTxt,
      lawTxt,
    ],
    "registerIdeaForm.firstStep.branch.options.art": [
      PaintingTxt,
      SculptureTxt,
      PhotographyTxt,
      PerformingArtsTxt,
      industrialDesignTxt,
      ClothDesignTxt,
      carpetTxt,
      jewleryTxt,
      graphicsTxt,
      fashionDesignTxt,
      sewingDesignTxt,
      textileDesignTxt,
      calliIlluminationTxt,
      MusicTxt,
    ],
    "registerIdeaForm.firstStep.branch.options.expSci": [
      BiotechTxt,
      MedicineTxt,
      BioEnginTxt,
      GeologyTxt,
    ],
    "registerIdeaForm.firstStep.branch.options.engin": [
      ElectricalEnginTxt,
      MechanicalEnginTxt,
      ComputerSciTxt,
      architecTxt,
      compEnginTxt,
      envEnginTxt,
    ],
    "registerIdeaForm.firstStep.branch.options.physical": [],
    "registerIdeaForm.firstStep.branch.options.others": [],
  };

  type BranchKey = keyof typeof branchesOptions;

  const handleBranchChange = (value: BranchKey) => {
    setValue("branchOfStudy", t(value));
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

  return (
    <Container>
      <div
        className="max-w-md mx-auto p-6"
        style={{ direction: rtl ? "rtl" : "ltr" }}
      >
        {step === 1 && (
          <form
            onSubmit={handleSubmit(handleNextStep)}
            className="space-y-4 p-6 shadow-2xl rounded-lg border-sm"
          >
            <h1 className="text-2xl font-bold mb-4">{basicInfoTxt}</h1>

            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {nameTxt}
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
                {fatherNameTxt}
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
              <label className="block text-sm font-medium mb-2">
                {countryTxt}
              </label>
              <Input type="text" {...register("country")} />
            </div>

            {/* State and City Fields */}
            <div className="flex gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {stateTxt}
                </label>
                <Input type="text" {...register("state")} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  {cityTxt}
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
                {careerTxt}
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
                  {maritalStatusTxt}
                </label>
                <Select
                  onValueChange={(value) => setValue("maritalStatus", value)}
                  value={maritalStatus}
                >
                  <SelectTrigger style={{ direction: rtl ? "rtl" : "ltr" }}>
                    <SelectValue placeholder="Select Marital Status" />
                  </SelectTrigger>
                  <SelectContent style={{ direction: rtl ? "rtl" : "ltr" }}>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" {...register("maritalStatus")} />
              </div>
              {/* Gender Select */}
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  {genderTxt}
                  <span className="text-red-500"> *</span>
                </label>
                <Select
                  onValueChange={(value) => setValue("gender", value)}
                  value={gender}
                >
                  <SelectTrigger style={{ direction: rtl ? "rtl" : "ltr" }}>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent style={{ direction: rtl ? "rtl" : "ltr" }}>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
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
                  {mobileNumberTxt}
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
                  {ageTxt}
                  <span className="text-red-500"> *</span>
                </label>
                <Input
                  type="number"
                  {...register("age", { required: "Age is required" })}
                />
              </div>
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

            {/* Identification Number Field */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {idNumberTxt}
                <span className="text-red-500"> *</span>
              </label>
              <Input
                type="text"
                {...register("identificationNumber", {
                  required: "Identification Number is required",
                })}
              />
            </div>

            <div className="flex justify-between">
              <Link href="/research" className="w-1/3">
                <Button type="button" variant="outline">
                  {backToFormsTxt}
                </Button>
              </Link>
              <Button type="submit" className="w-1/3">
                {nextTxt}
              </Button>
            </div>
          </form>
        )}
        {step === 2 && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-6 shadow-lg rounded-lg"
          >
            <h1 className="text-2xl font-bold mb-4">{SecSteptitleTxt}</h1>

            {/* Branch of Study */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {branchOfStudyTxt}
                <span className="text-red-500"> *</span>
              </label>
              <Select
                onValueChange={(value) =>
                  handleBranchChange(value as BranchKey)
                }
                // value={branchOfStudy}
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
                  {spesificFieldTxt}
                  <span className="text-red-500"> *</span>
                </label>
                <Select
                  onValueChange={(value) => setValue("branchDetail", value)}
                  value={branchDetail}
                >
                  <SelectTrigger style={{ direction: rtl ? "rtl" : "ltr" }}>
                    <SelectValue placeholder={selectSpesificFieldTxt} />
                  </SelectTrigger>
                  <SelectContent style={{ direction: rtl ? "rtl" : "ltr" }}>
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
                {ideaTitleTxt}
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
                {SecStepDescribeIdeaTxt}
                <span className="text-red-500"> *</span>
              </label>
              <Textarea
                className="min-h-[10rem]"
                {...register("ideaDescription", {
                  required: "Please describe your idea",
                })}
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
                {backTxt}
              </Button>
              <Button type="submit" className="w-1/3">
                {submitTxt}
              </Button>
            </div>
          </form>
        )}
      </div>
    </Container>
  );
}
