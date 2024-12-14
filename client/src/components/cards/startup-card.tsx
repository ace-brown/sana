import React from "react";

import Image from "next/image";
import { SatrtUpCardDataType } from "@/types";

export default function StartUpCard({ item }: { item: SatrtUpCardDataType }) {
  return (
    <div
      key={item.id}
      className="w-[450px] grid gap-4 grid-cols-[6fr_4fr] bg-gray-200 shadow-lg rounded-[1rem]"
    >
      <div className="h-[250px]">
        <Image
          src={item.imgSrc}
          alt="image"
          className="h-full object-cover rounded-tl-[1rem] rounded-tr-[0] rounded-br-[0] rounded-bl-[1rem]"
        />
      </div>
      <div className="pl-0 p-4 h-[250px]">
        <h2 className="text-3xl">{item.title}</h2>
        <p className="mb-2 mt-2 text-[12px]">{item.description}</p>
        <a href="#">{item.link}</a>
      </div>
    </div>
  );
}
