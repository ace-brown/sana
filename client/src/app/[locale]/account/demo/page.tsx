import { useTranslations } from "next-intl";
import React from "react";

export default function DemoPage() {
  const t = useTranslations();
  return (
    <>
      <h1>{t("back")}</h1>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ad aut
        earum dolores blanditiis reiciendis quia accusamus explicabo molestiae
        tempore! Accusantium perferendis, laborum consequuntur quis culpa quos
        veritatis eius quia, corrupti aperiam, eum magnam saepe. Provident quos
        libero, expedita quibusdam fugiat assumenda officiis, fugit id quis
        dolorum praesentium saepe hic. Fugiat praesentium hic magni incidunt.
      </div>
    </>
  );
}
