import React from "react";
import Image from "next/image";

import news1 from "@/images/growth.jpg";
import news2 from "@/images/launch.jpg";
import news3 from "@/images/planning.jpg";
import classes from "./newsCard.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export const NewsCard1 = () => {
  const t = useTranslations();
  return (
    <article className={classes.card}>
      <div className={classes["card-img"]}>
        <Image src={news1} alt="news1" />
      </div>
      <div className={classes["card-content"]}>
        <h1>{t("blogs.blog1.title")}</h1>
        <p>{t("blogs.blog1.body")}</p>
        <Link href="./about">
          <Button className="mt-4">{t("readMore")}</Button>
        </Link>
      </div>
    </article>
  );
};

export const NewsCard2 = () => {
  const t = useTranslations();
  return (
    <article className={classes.card}>
      <div className={classes["card-img"]}>
        <Image src={news2} alt="news 2" />
      </div>
      <div className={classes["card-content"]}>
        <h1>{t("blogs.blog2.title")}</h1>
        <p>{t("blogs.blog2.body")}</p>
        <Link href="./about">
          <Button className="mt-4">{t("readMore")}</Button>
        </Link>
      </div>
    </article>
  );
};

export const NewsCard3 = () => {
  const t = useTranslations();
  return (
    <article className={classes.card}>
      <div className={classes["card-img"]}>
        <Image src={news3} alt="news 3" />
      </div>
      <div className={classes["card-content"]}>
        <h1>{t("blogs.blog3.title")}</h1>
        <p>{t("blogs.blog3.body")}</p>
        <Link href="./about">
          <Button className="mt-4">{t("readMore")}</Button>
        </Link>
      </div>
    </article>
  );
};
export const NewsCard4 = () => {
  const t = useTranslations();
  return (
    <article className={classes.card}>
      <div className={classes["card-img"]}>
        <Image src={news3} alt="news 3" />
      </div>
      <div className={classes["card-content"]}>
        <h1>{t("blogs.blog4.title")}</h1>
        <p>{t("blogs.blog4.body")}</p>
        <Link href="./about">
          <Button className="mt-4">{t("readMore")}</Button>
        </Link>
      </div>
    </article>
  );
};
