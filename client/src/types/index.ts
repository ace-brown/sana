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
  fatherName: string;
  country?: string;
  state?: string;
  city: string;
  career: string;
  maritalStatus?: string;
  gender: string;
  mobileNumber: string;
  age: number;
  branchOfStudy: string;
  branchDetail?: string;
  ideaTitle: string;
  ideaDescription: string;
};

export type UserIdeaType = {
  id: string;
  ownerId: string;
  reportId?: string;
  trackingId: string;
  fatherName: string;
  country?: string;
  state?: string;
  city: string;
  career: string;
  maritalStatus?: string;
  gender: string;
  mobileNumber: string;
  age: number;
  branchOfStudy: string;
  branchDetail?: string;
  ideaTitle: string;
  ideaDescription: string;
  createdAt?: Date;
};
