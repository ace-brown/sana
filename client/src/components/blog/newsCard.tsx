import React from "react";
import Image from "next/image";

import news1 from "@/images/growth.jpg";
import news2 from "@/images/launch.jpg";
import news3 from "@/images/planning.jpg";
import classes from "./newsCard.module.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NewsCard1 = () => {
  return (
    <article className={classes.card}>
      <div className={classes["card-img"]}>
        <Image src={news1} alt="news1" />
      </div>
      <div className={classes["card-content"]}>
        <h1>First blog post title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link href="./about">
          <Button className="mt-4">Read more</Button>
        </Link>
      </div>
    </article>
  );
};

export const NewsCard2 = () => {
  return (
    <article className={classes.card}>
      <div className={classes["card-img"]}>
        <Image src={news2} alt="news 2" />
      </div>
      <div className={classes["card-content"]}>
        <h1>Second blog post title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link href="./about">
          <Button className="mt-4">Read more</Button>
        </Link>
      </div>
    </article>
  );
};

export const NewsCard3 = () => {
  return (
    <article className={classes.card}>
      <div className={classes["card-img"]}>
        <Image src={news3} alt="news 3" />
      </div>
      <div className={classes["card-content"]}>
        <h1>Third blog post title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link href="./about">
          <Button className="mt-4">Read more</Button>
        </Link>
      </div>
    </article>
  );
};
export const NewsCard4 = () => {
  return (
    <article className={classes.card}>
      <div className={classes["card-img"]}>
        <Image src={news3} alt="news 3" />
      </div>
      <div className={classes["card-content"]}>
        <h1>Fourth blog post title</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Link href="./about">
          <Button className="mt-4">Read more</Button>
        </Link>
      </div>
    </article>
  );
};
