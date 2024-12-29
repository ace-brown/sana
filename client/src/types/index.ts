import { StaticImageData } from "next/image";

export type TimelineItemType = {
  id: number;
  title: string;
  description: string;
  time: string;
};

export type SatrtUpCardDataType = {
  id: number;
  title: string;
  description: string;
  imgSrc: StaticImageData;
  link: string;
};

export type RegisterIdeaType = {
  name: string;
  fatherName: string;
  country?: string;
  state?: string;
  city: string;
  career: string;
  maritalStatus?: string;
  gender: string;
  mobileNumber: string;
  age: string;
  branchOfStudy: string;
  branchDetail?: string;
  ideaTitle: string;
  ideaDescription: string;
  trackingCode?: string;
  createdAt?: string;
};
