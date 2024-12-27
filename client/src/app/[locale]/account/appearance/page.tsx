import React from "react";
import { useTranslations } from "next-intl";

export default function Appearance() {
  const t = useTranslations();
  return (
    <div>
      <h1>{t("submit")}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam natus
        error laboriosam a delectus adipisci necessitatibus sint sunt eveniet,
        quaerat cum repellat laudantium rem at modi repellendus vel quae animi
        hic beatae porro sit blanditiis. Saepe dolorum repellat eligendi ipsam
        iste, neque nam ipsum maiores in molestiae esse rerum id nihil nostrum,
        beatae ullam?
      </p>
    </div>
  );
}
