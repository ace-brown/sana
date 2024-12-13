import { useTranslations } from "next-intl";
import React from "react";

export default function PatentRegistrationPage() {
  const t = useTranslations("PatentRegistrationPage");
  return (
    <div>
      <h1>{t("title")}</h1>
      <h1>{t("content")}</h1>
    </div>
  );
}
